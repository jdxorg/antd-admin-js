import { request,config } from 'utils';

import api from './api';

const { apiPrefix } = config;
const gen = params => {
  let url = params;
  let method = 'GET';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    method = paramsArray[0];
    url = paramsArray[1];
  }

  return data=> {
    return request({
      url,
      data,
      method,
    });
  };
};

const APIFunction = {};
for (const key in api) {
  APIFunction[key] = gen(api[key]);
}

APIFunction.queryWeather = params => {
  params.key = 'i7sau1babuzwhycn';
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params,
  });
};

export default APIFunction;
