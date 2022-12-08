import request from '../utils/request';
import qs from 'qs';

export async function queryRiskList(params) {
  return request(`/alarm/list?${qs.stringify(params)}`);
}
export async function queryEmailList(params) {
  return request(`/alarm/set/inform/list?${qs.stringify(params)}`);
}

export async function addEmail(params) {
  return request(`/alarm/set/inform/add`, {
    method: 'post',
    body: params
  });
}

export async function modifyEmail(params) {
  return request(`/alarm/set/inform/modify`, {
    method: 'post',
    body: params
  });
}
export async function deleteEmail(params) {
  return request(`/alarm/set/inform/delete/${params.id}`, {
    method: 'post',
    body: params
  });
}
