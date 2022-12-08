import request from '../utils/request';
import { Modal } from 'antd';

/**
 * @TODO 获取系统版本信息
 */
export async function version() {
  const { data, errcode, errmsg } = await request(`/getVersion`);
  if (errcode === 0) {
    return data;
  } else {
    Modal.info({
      title: '提示',
      content: errmsg,
    });
    return false;
  }
}

/**
 * @TODO 获取系统是否是集群
 */
export async function systemVersion() {
  const { data, errcode, errmsg } = await request(`/cluster/status`);
  if (errcode === 0) {
    return data;
  } else {
    Modal.info({
      title: '提示',
      content: errmsg,
    });
    return false;
  }
}

/**
 * @TODO 切换系统版本
 */
export async function checkVersion(params) {
  const { data, errcode, errmsg } = await request(`/settingCluster`, {
    method: 'POST',
    body: params,
  });
  if (errcode === 0) {
    return data;
  } else {
    Modal.info({
      title: '提示',
      content: errmsg,
    });
    return false;
  }
}

/**
 * @TODO 初始化集群
 */
export async function initGroup(params) {
  const { data, errcode, errmsg } = await request(`/cluster/simpleInit`, {
    method: 'POST',
    body: params,
  });
  if (errcode === 0) {
    return data;
  } else {
    Modal.info({
      title: '提示',
      content: errmsg,
    });
    return false;
  }
}
