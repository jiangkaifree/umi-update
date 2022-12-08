import request from '@/utils/request'
import { Modal } from 'antd';

/**
 * @TODO 获取文件配置
 * @returns
 */
export async function querySwitch() {
  const { errcode, data, errmsg } = await request(`/configuration/switch/get`);
  if (errcode === 0) {
    return data
  } else {
    Modal.info({
      title: '错误提示',
      content: errmsg
    })
    return false
  }
}

/**
 * @TODO 设置是否自动降级
 * @returns
 */
export async function autoDegradation(params) {
  const { errcode, data, errmsg} = await request(`/configuration/switch/auto_degradation`, {
    method: 'post',
    body: params,
  });
  if (errcode === 0) {
    return data || true
  } else {
    Modal.info({
      title: '错误提示',
      content: errmsg
    })
    return false
  }
}

/**
 * @TODO 设置是否开启加密
 * @returns
 */
export async function encryption(params) {
  const { errcode, data, errmsg } = await request(`/configuration/switch/encryption`, {
    method: 'post',
    body: params,
  });
  if (errcode === 0) {
    return data || true
  } else {
    Modal.info({
      title: '错误提示',
      content: errmsg
    })
    return false
  }
}