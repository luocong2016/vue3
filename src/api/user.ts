import { request } from '@/utils';

export function login(data: { account: string; password: string }) {
  return request({
    url: `/login`,
    method: 'POST',
    data,
  });
}

export function userInfo(params: any) {
  return request({
    url: `/user/info`,
    params,
  });
}
