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

export default modelExtend(pageModel, {
  namespace: 'authority',
  state: {},
  subscriptions: {
    //调用 query 的方法
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/account/authority', location.pathname)) {
          alert(2333)
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    *query() {
      alert(11111)
    },
  },
})
