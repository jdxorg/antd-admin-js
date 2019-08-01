/* global window */

import { stringify } from 'qs';
import store from 'store';
import { router,queryLayout, pathMatchRegexp } from 'utils';
import api from 'api';
import {layouts} from 'config';
import { CANCEL_REQUEST_MESSAGE } from '../constant/message';
import { ACCESS_TOKEN } from '../constant';

const { logoutUser, queryUserInfo } = api;

export default {
  namespace: 'app',
  state: {
    user: {},
    routeList: [],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        });
      });
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window;

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE);
            cancelRequest.delete(key);
          }
        });
      });
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' });
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { locationPathname } = yield select(_ => _.app);
      const token = localStorage.getItem(ACCESS_TOKEN);
      if(!token){
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        });
        return;
      }
      //获取当前登录用户信息
      const { success, data } = yield call(queryUserInfo);
      if (success && data) {
        //获取用户菜单
        // const result = yield call(queryRouteList);
        const { menus } = data;
        delete data.menus;
        yield put({
          type: 'updateState',
          payload: {
            user:data,
            routeList:menus,
          },
        });
        if (pathMatchRegexp(['/', '/login'], window.location.pathname)) {
          router.push({
            pathname: '/dashboard',
          });
        }
      } else if (queryLayout(layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        });
      }
    },

    *signOut({payload}, { call, put }) {
      const data = yield call(logoutUser);
      if (data.success) {
        localStorage.removeItem(ACCESS_TOKEN);
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            ...payload,
          },
        });
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload);
      state.theme = payload;
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload);
      state.collapsed = payload;
    },

    allNotificationsRead(state) {
      state.notifications = [];
    },
  },
};
