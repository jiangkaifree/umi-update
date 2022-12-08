import request from '../utils/request';
import qs from 'qs';

export async function queryAdmin(params) {
  return request(`/user/admin/page?${qs.stringify(params)}`);
}

export async function addUser(params) {
  return request(`/user/admin/add`, {
    method: 'post',
    body: params,
  });
}

export async function delUser(params) {
  return request(`/user/delete/${params.id}`, {
    method: 'post',
    body: params,
  });
}
export async function resetUser(params) {
  return request(`/user/password/reset`, {
    method: 'post',
    body: params,
  });
}

// 获取管理员列表
export async function ukeyAdmin() {
  return request(`/admin/list`);
}

// 创建、更新用户
export async function updateUkeyUser(params) {
  return request(`/admin/cert/upd`, {
    method: 'post',
    body: params,
  });
}
