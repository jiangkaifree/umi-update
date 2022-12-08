import request from '../utils/request';
import qs from 'qs';

export async function queryExist(params) {
  return request(`/user/exist?${qs.stringify(params)}`);
}

export async function addUser(params) {
  return request(`/user/password/reset`, {
    method: 'post',
    body: params
  });
}