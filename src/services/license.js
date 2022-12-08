// import axios from '@/utils/request';
import request from '@/utils/request';
import qs from 'qs';

// 获取license
export function getLicense(params) {
  return request(`/license/get?${qs.stringify(params)}`);
}
//更新license
export function updateLicense(params) {
  return request(`/license/update`, {
    method: 'post',
    body: params,
  });
}

// 获取hash
export function jarHash(params) {
  return request(`/license/get/jar`, {
    method: 'get',
    //   body: params,
  });
}
