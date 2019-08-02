import api from 'api';
import { message } from 'antd';
import { ACCESS_TOKEN } from '../../constant';

const { loginUser } = api;

export default {
  namespace: 'login',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        
      });
    },
  },

  effects: {
    *login({ payload }, { put, call }) {
      try {
        const result = yield call(loginUser, payload);
        const { success,data,msg } = result;
        if (success && data) {
          const token = result.data;//得到token
          sessionStorage.setItem(ACCESS_TOKEN,token);
          yield put({ type: 'app/query'});
        } else {
          message.error(msg);
        }
      } catch (error) {
        console.log('error',error);
      }
    },
  },
};
