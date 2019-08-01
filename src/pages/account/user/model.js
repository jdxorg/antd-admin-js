import modelExtend from 'dva-model-extend';
import {message} from 'antd';
import { pathMatchRegexp } from 'utils';
import api from 'api';
import { pageModel } from '@/models/pageModel';

const {
  queryUserPage,
  queryUser,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
  updatePermission,
  queryRouteList,
} = api;

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    selectedRowKeys: [],
    roles:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/account/user', location.pathname)) {
          dispatch({ type: 'query' });
        }
      });
    },
  },

  effects: {
    *query({ payload = {} }, { call, put,select }) {
      const {pagination,roles} = yield select(state=> {
        return {pagination:state.user.pagination,roles:state.app.user.roles};
      } );

      yield put({type:'updateState',payload:{roles} });
      const { current,pageSize } = pagination;
      const filter = {...{current,pageSize}, ...payload };
      const data = yield call(queryUserPage, filter);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list:data.data,
            pagination:{...filter,...{total:data.total}},
          },
        });
      }
    },
    *delete({ payload }, { call, put }) {
      const result = yield call(removeUser, { id: payload });
      const {success,msg} = result;
      if (success) {
        yield put({
          type: 'query',
        });
      } else {
        message.error(msg);
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const result = yield call(removeUserList, payload);
      const {success,msg} = result;
      if (success) {
        yield put({ type: 'query' });
      } else {
        message.error(msg);
      }
    },

    *create({ payload }, { call, put }) {
      const result = yield call(createUser, payload);
      const { success,data,msg} = result;
      if (success && data) {
        yield put({ type: 'query' });
        yield put({ type: 'modal/hideModal' });
      } else {
        message.error(msg);
      }
    },

    *update({ payload }, { call, put }) {
      const result = yield call(updateUser, payload);
      const { success,data,msg} = result;
      if (success&&data) {
        yield put({ type: 'query' });
        yield put({ type: 'modal/hideModal' });
      } else {
        message.error(msg);
      }
    },
    *updatePermission({payload}, {call,put}) {
      const result = yield call(updatePermission,payload);
      const {success,data,msg} = result;
      if(success&&data){
        yield put({type:'query'});
        yield put({type:'modal/hideModal'});
      }else{
        message.error(msg);
      }
    },
    *showModal({payload}, { call,put }) {
      const { currentItem } = payload;
      yield put({ type:'modal/showModal',payload:{type:'modal'}});
      if( currentItem ){
        const result = yield call(queryUser,{id:currentItem.id});
        const {success,data} = result;
        if(success){
          yield put({ type:'modal/setItem',payload:{ item:data }});
        }
      }
    },
    *showSettingModal({payload}, {call,put}) {
      const {currentItem} = payload;
      yield put({type:'modal/showModal',payload:{type:'setting'}});
      const resultUser = yield call(queryUser,{id:currentItem.id});
      const resultMenus = yield call(queryRouteList);
      const {success,data} = resultUser;
      if(success){
        const item = {user:data,routeList:resultMenus.data};
        yield put({ type:'modal/setItem',payload:{item} });
      }
    },
  },
});
