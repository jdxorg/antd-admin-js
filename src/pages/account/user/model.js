import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from '@/models/pageModel'

const {
  queryUserPage,
  queryUser,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
  updatePermission,
  queryRouteList,
} = api

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    selectedRowKeys: [],
    roles: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/account/user', location.pathname)) {
          dispatch({ type: 'query' })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put, select }) {
      const { pagination, roles } = yield select(state => {
        return {
          pagination: state.user.pagination,
          roles: state.app.user.roles,
        }
      })

      yield put({ type: 'updateState', payload: { roles } })
      const { current, pageSize } = pagination
      const filter = { ...{ current, pageSize }, ...payload }
      const data = yield call(queryUserPage, filter)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: { ...filter, ...{ total: data.total } },
          },
        })
      }
    },
    *delete({ payload }, { call }) {
      return yield call(removeUser, { id: payload })
    },

    *multiDelete({ payload }, { call }) {
      return yield call(removeUserList, payload)
    },

    *create({ payload }, { call }) {
      return yield call(createUser, payload)
    },

    *update({ payload }, { call }) {
      return yield call(updateUser, payload)
    },
    *updatePermission({ payload }, { call }) {
      return yield call(updatePermission, payload)
    },
    *showModal({ payload }, { call, put }) {
      const { currentItem } = payload
      yield put({ type: 'modal/showModal', payload: { type: 'modal' } })
      if (currentItem) {
        const result = yield call(queryUser, { id: currentItem.id })
        const { success, data } = result
        if (success) {
          yield put({ type: 'modal/setItem', payload: { item: data } })
        }
      }
    },
    *showSettingModal({ payload }, { call, put }) {
      const { currentItem } = payload
      yield put({ type: 'modal/showModal', payload: { type: 'setting' } })
      const resultUser = yield call(queryUser, { id: currentItem.id })
      const resultMenus = yield call(queryRouteList)
      const { success, data } = resultUser
      if (success) {
        const item = { user: data, routeList: resultMenus.data }
        yield put({ type: 'modal/setItem', payload: { item } })
      }
    },
  },
})
