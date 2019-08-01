import axios from 'axios';
import { cloneDeep } from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { CANCEL_REQUEST_MESSAGE } from '@/constant/message';
import { ACCESS_TOKEN } from '@/constant';

// const { CancelToken } = axios;
window.cancelRequest = new Map();
axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use(config=> {
  const AUTH_TOKEN = localStorage.getItem(ACCESS_TOKEN);
  if(AUTH_TOKEN){
    config.headers.Authorization = `bearer ${AUTH_TOKEN}`;
  }
  return config;
}, error=> {
  return Promise.reject(error);
});

axios.interceptors.response.use(response=> {
  return response;
}, error=> {
  return Promise.reject(error);
});

export default function request(options) {
  const { data, method = 'get'} = options;
  let { url } = options;
  const cloneData = cloneDeep(data);
  
  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      ;[domain] = urlMatch;
      url = url.slice(domain.length);
    }

    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    options.url = domain + url;
  } catch (e) {
    message.error(e.message);
  }

  // options.cancelToken = new CancelToken(cancel => {
  //   window.cancelRequest.set(Symbol(Date.now()), {
  //     pathname: window.location.pathname,
  //     cancel,
  //   });
  // });
  if( method.toLocaleLowerCase() === 'get' ){
    options.params = cloneData;
  }else{
    options.data = data;
  }
  return axios(options)
    .then(response => {
      const { statusText, status, data } = response;

      let result = {};
      if (typeof data === 'object') {
        result = data;
        if (Array.isArray(data)) {
          result.list = data;
        }
      } else {
        result.data = data;
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      });
    })
    .catch(error => {
      const { response, message } = error;

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        };
      }

      let msg;
      let statusCode;

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      })
    })
}
