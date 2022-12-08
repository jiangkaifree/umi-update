import request from '../utils/request';
import qs from 'qs';

export async function logout(params) {
  return request(`/auth/logout?${qs.stringify(params)}`);
}

export async function sendSms(params) {
  return request(`/auth/sms`, {
    method: 'post',
    body: params,
  });
}

/** 获取license时间 */
export function getLicense(params) {
  return request(`/flksec-commons/license/reminder`);
}

export async function modifyPassword(params) {
  return request(`/user/password/modify`, {
    method: 'post',
    body: params,
  });
}

export async function loginIn(params) {
  return request(`/auth/login`, {
    method: 'post',
    body: params,
  });
}

export async function test(params) {
  return request(`/ah/login`, {
    method: 'post',
    body: params,
  });
}

export async function checkAdmin(params) {
  return request(`/user/password/reset_user/get?${qs.stringify(params)}`);
}

/**
 * @TODO 获取验证码
 */
export async function code() {
  return request(`/captcha`, {
    method: 'get',
  });
}

/**
 * @TODO 获取登录方式
 */
export async function loginType() {
  return request(`/getLoginType`, {
    method: 'GET',
  });
}

/**
 * @TODO Ukey登录
 */
export async function ukeyLogin(params) {
  return request(`/auth/loginCA`, {
    method: 'POST',
    body: params,
  });
}
