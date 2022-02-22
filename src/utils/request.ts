import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/*
// https://github.com/axios/axios
{
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'content-type': 'application/json;charset:utf-8',
    'content-type': 'multipart/form-data',
    'content-type': 'application/xml',
    'content-type': 'text/xml'
  },

  responseType: 'json',
  responseType: 'arraybuffer',
  responseType: 'document',
  responseType: 'text',
  responseType: 'stream',
  responseType: 'blob', // browser only
}
*/

const baseURL =
  process.env.VUE_APP_ISMOCK === 'true'
    ? process.env.VUE_APP_MOCK_BASE_URL
    : process.env.VUE_APP_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // 是否跨站点请求 Access-Control
  timeout: 5000,
});

instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    const { config, data } = response;
    const { responseType = 'json' } = config;
    switch (responseType) {
      case 'text':
        return data;
      case 'json':
        return Number(data.code) === 200 ? data.data : Promise.reject({ ...data });
      default:
        return response;
    }
  },
  function (error: AxiosError) {
    switch (error.response?.status) {
      case 400:
        error.message = '请求错误(400)';
        break;
      case 401:
        error.message = '未授权(401)';
        break;
      case 403:
        error.message = '拒绝访问(403)';
        break;
      case 404:
        error.message = '请求出错(404)';
        break;
      case 408:
        error.message = '请求超时(408)';
        break;
      case 500:
        error.message = '服务器错误(500)';
        break;
      case 501:
        error.message = '服务未实现(501)';
        break;
      case 502:
        error.message = '网络错误(502)';
        break;
      case 503:
        error.message = '服务不可用(503)';
        break;
      case 504:
        error.message = '网络超时(504)';
        break;
      case 505:
        error.message = 'HTTP版本不受支持(505)';
        break;
      default:
        error.message = `连接出错(${error.response?.status})!`;
    }

    return Promise.reject(error);
  }
);

export const CancelToken = axios.CancelToken;
export const all = axios.all;
export const spread = axios.spread;
export const request = instance;

export default instance;

/*
//--- `CancelToken`取消案例 ---//
import request, { CancelToken } from '@/utils/request';

export let cancel;

export function userInfo(params) {
  return request({
    url: '/userInfo',
    params,
    cancelToken: new CancelToken(c => {
      cacel = c;
    })
  })
}

userInfo();
cancel && cancel();
*/

/*
//--- `AbortController`取消案例 ---//
import request from '@/utils/request';

export const controller = new AbortController();

export function userInfo(params) {
  return request({
    url: '/userInfo',
    params,
    signal: controller.signal
  })
}

userInfo();
controller.abort()
*/

/*
//--- qs ---//
import request from '@/utils/request';
import qs from 'qs';

export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}
*/

/*
//--- axios.all & axios.spread ---/
import request, { all, spread } from '@/utils/request';

export function getUserAccount() {
  return request({
    url: '/user/lutz'
  })
}

export function getUserPermissions() {
  return request({
    url: '/user/lutz/permissions'
  })
}

export function getUserInfo() {
  return all([getUserAccount(), getUserPermissions()]).then(
    spread(account, permissions) => {
      // ...
    }
  )
}
*/
