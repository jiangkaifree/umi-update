import request from '../utils/request';
import qs from 'qs';

export async function queryTemplatesList(params) {
  return request(`/storeEncrypted/templates/list?${qs.stringify(params)}`);
}
export async function queryEncryptAll(params) {
  return request(`/configuration/server/encrypt/all?${qs.stringify(params)}`);
}

export async function addTemplates(params) {
  return request(`/storeEncrypted/templates/add`, {
    method: 'post',
    body: params
  });
}

export async function modifyTemplates(params) {
  return request(`/storeEncrypted/templates/modify`, {
    method: 'post',
    body: params
  });
}

export async function storeUsing(params) {
  return request(`/storeEncrypted/templates/store_using`, {
    method: 'post',
    body: params
  });
}

export async function queryUserList(params) {
  return request(`/user/list?${qs.stringify(params)}`);
}
