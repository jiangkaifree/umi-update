import request from '../utils/request';
import qs from 'qs';

export async function queryPermissionTree(params) {
  return request(`/permission/tree/list?${qs.stringify(params)}`);
}

export async function queryRoleList(params) {
  return request(`/role/list?${qs.stringify(params)}`);
}

export async function queryUserList(params) {
  return request(`/user/page?${qs.stringify(params)}`);
}

export async function queryRoleP(params) {
  return request(`/role/list?${qs.stringify(params)}`);
}

export async function setRoleP(params) {
  return request(`/role/permission/set`, {
    method: 'post',
    body: params
  });
}

export async function addRole(params) {
  return request(`/role/add`, {
    method: 'post',
    body: params
  });
}

export async function modifyRole(params) {
  return request(`/role/modify`, {
    method: 'post',
    body: params
  });
}

export async function deleteRole(params) {
  return request(`/role/delete/${params.id}`, {
    method: 'post',
    body: params
  });
}

export async function addUser(params) {
  return request(`/user/add`, {
    method: 'post',
    body: params
  });
}

export async function modifyUser(params) {
  return request(`/user/modify`, {
    method: 'post',
    body: params
  });
}

export async function deleteUser(params) {
  return request(`/user/delete/${params.id}`, {
    method: 'post',
    body: params
  });
}
export async function resetUser(params) {
  return request(`/user/password/reset`, {
    method: 'post',
    body: params
  });
}