import modelExtend from 'dva-model-extend';
import { pathMatchRegexp } from 'utils';
import api from 'api';
import { pageModel } from '@/models/pageModel';

const {
  queryRoleList,
  createRole,
  removeRole,
  updateRole,
  removeRoleList,
} = api;

export default modelExtend(pageModel, {
  namespace: 'role',

  state: {
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/account/role', location.pathname)) {
          dispatch({ type: 'query' });
        }
      });
    },
  },

  effects: {
    *query({ payload = {} }, { call, put,select }) {
      const pagination = yield select(state=>state.role.pagination );
      const { current,pageSize } = pagination;
      const filter = {...{current,pageSize}, ...payload };
      const data = yield call(queryRoleList, filter);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {...filter,...{total:data.total}},
          },
        });
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeRole, { id: payload });
      const { selectedRowKeys } = yield select(_ => _.user);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        });
      } else {
        throw data;
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeRoleList, payload);
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } });
      } else {
        throw data;
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createRole, payload);
      if (data.success) {
        yield put({ type: 'modal/hideModal' });
      } else {
        throw data;
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id);
      const newData = { ...payload, id };
      const data = yield call(updateRole, newData);
      if (data.success) {
        yield put({ type: 'modal/hideModal' });
      } else {
        throw data;
      }
    },
    *showModal({payload}, { put }) {
      const { currentItem } = payload;
      yield put({ type:'modal/showModal'});
      if( currentItem ){
        yield put({ type:'modal/setItem',payload:{ item:currentItem }});
      }
    },
  },
});
