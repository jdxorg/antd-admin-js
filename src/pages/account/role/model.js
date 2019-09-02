/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-23 15:20:33
 * @LastEditTime: 2019-08-29 16:45:10
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from '@/models/pageModel'

const {
  queryRolePage,
  queryRole,
  queryRoleRelations,
  queryUserList,
  saveUserRole,
  createRole,
  removeRole,
  updateRole,
  removeRoleList,
} = api

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
          dispatch({ type: 'query' })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put, select }) {
      const pagination = yield select(state => state.role.pagination)
      const { current, pageSize } = pagination
      const filter = { ...{ current, pageSize }, ...payload }
      const data = yield call(queryRolePage, filter)
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
      return yield call(removeRole, { id: payload })
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeRoleList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call }) {
      return yield call(createRole, payload)
    },

    *update({ payload }, { call }) {
      return yield call(updateRole, payload)
    },
    *saveUserRole({ payload }, { call }) {
      return yield call(saveUserRole, payload)
    },
    *showModal({ payload }, { call, put }) {
      const { currentItem } = payload
      yield put({ type: 'modal/showModal', payload: { type: 'edit' } })
      if (currentItem) {
        const result = yield call(queryRole, { id: currentItem.id })
        const { success, data } = result
        if (success) {
          yield put({ type: 'modal/setItem', payload: { item: data } })
        }
      }
    },
    *showSettingModal({ payload }, { call, put }) {
      const { currentItem } = payload
      yield put({ type: 'modal/showModal', payload: { type: 'setting' } })
      const resultUser = yield call(queryUserList)
      const resultRole = yield call(queryRoleRelations, { id: currentItem.id })
      const users = resultUser.data.map(_ => {
        return { key: _.id, title: _.userName }
      })
      let ret = { users, ...currentItem }
      if (resultRole.success && resultRole.data) {
        ret = { ...ret, relations: resultRole.data }
      }
      yield put({ type: 'modal/setItem', payload: { item: ret } })
    },
  },
})
