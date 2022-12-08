import request from '../utils/request';
import qs from 'qs';

export async function queryUsersLog(params) {
  return request(`/log/list?${qs.stringify(params)}`);
}
export async function queryEncryptLog(params) {
  return request(`/encryptlog/list?${qs.stringify(params)}`);
}
export async function queryUsersList(params) {
  return request(`/user/list?${qs.stringify(params)}`);
}

/**
 * @TODO 导出用户日志数据
 */
export async function userLogsPdf(params) {
  return request(`/user/list?${qs.stringify(params)}`);
}

/**
 * @TODO 导出日志
 */
export function exportLogs(params) {
  return request(`/exportLog?${qs.stringify(params)}`, {
    responseType: 'blob',
  });
}

/**
 * @TODO 导出加密日志
 * @param {*} params
 */
export function exportEncryptLogs(params) {
  return request(`/exportEncryptLog?${qs.stringify(params)}`, {
    responseType: 'blob',
  });
}
