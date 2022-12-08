import request from '../utils/request';
import qs from 'qs';

export async function queryPortList(params) {
  return request(`/configuration/server/encrypt/list?${qs.stringify(params)}`);
}
export async function queryAgencyList(params) {
  return request(`/configuration/server/proxy/list?${qs.stringify(params)}`);
}



export async function queryCyCle(params) {
  return request(`/configuration/refreshcycle/get?${qs.stringify(params)}`);
}

export async function modifyCyCle(params) {
  return request(`/configuration/refreshcycle/modify`, {
    method: 'post',
    body: params,
  });
}
export async function updateSecret(params) {
  return request(`/configuration/secretkey/update`, {
    method: 'post',
    body: params,
  });
}

export async function addPort(params) {
  return request(`/configuration/server/encrypt/add`, {
    method: 'post',
    body: params,
  });
}

export async function deletePort(params) {
  return request(`/configuration/server/encrypt/delete/${params.id}`, {
    method: 'post',
    body: params,
  });
}
export async function modifyPort(params) {
  return request(`/configuration/server/encrypt/modify`, {
    method: 'post',
    body: params,
  });
}

export async function addAgency(params) {
  return request(`/configuration/server/proxy/add`, {
    method: 'post',
    body: params,
  });
}

export async function deleteAgency(params) {
  return request(`/configuration/server/proxy/delete/${params.id}`, {
    method: 'POST',
    body: params,
  });
}
export async function modifyAgency(params) {
  return request(`/configuration/server/proxy/modify`, {
    method: 'post',
    body: params,
  });
}

export async function queryEmailsList(params) {
  return request(`/configuration/list?${qs.stringify(params)}`);
}



export async function store_encryption(params) {
  return request(`/configuration/switch/store_encryption`, {
    method: 'post',
    body: params,
  });
}

// 获取https证书列表
export function httpsCerts(params) {
  return request(`/httpscert/certgroup?${qs.stringify(params)}`);
}
