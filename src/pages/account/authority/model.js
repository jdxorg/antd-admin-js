import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from '@/models/pageModel'

const {
  queryUserList,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
} = api // 使用user数据
// 公用pageModel和定义的数据
export default modelExtend(pageModel, {
  namespace: 'authority',
  state: {},
  subscriptions: {
    //调用 query 的方法
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/account/authority', location.pathname)) {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    *query({ payload = {} }, { call, put, select }) {
      const pagination = yield select(state => state.authority.pagination)
      const filter = {
        pagination,
        ...payload,
      }
      const data = yield call(queryUserList, filter)
      console.log(data, 2333)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            page: pagination,
          },
        })
      }
    },
  },
})
