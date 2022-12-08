import request from '@/utils/request';
import qs from 'qs';

// 获取关联服务列表
// export function services(params) {
//   return request(`/configuration/server/uiagroup`);
// }

// 获取证书列表
export function certs(params) {
  return request(`/httpscert/list?${qs.stringify(params)}`, {
    method: 'post',
  });
}

// 删除证书
export function deleteCert(params) {
  return request(`/httpscert/delete`, {
    method: 'post',
    body: params,
  });
}

// 更新证书
export function updateCert(params) {
  return request('/httpscert/update', {
    method: 'post',
    body: params,
  });
}

// 添加证书
export function uploadCert(params) {
  return request('/httpscert/upload', {
    method: 'post',
    body: params,
  });
}
