import request from '../utils/request';
import qs from 'qs';
import { Modal } from 'antd';

/**
 * @TODO 获取应用列表 分页
 * @returns
 */
export const apps = async params => {
  const { data, errcode, errmsg } = await request(`/app/queryPage?${qs.stringify(params)}`);
  if (errcode === 0) {
    return data;
  } else {
    Modal.info({
      title: '提示',
      content: errmsg,
    });
    return false;
  }
};

/**
 * @TODO 获取所有应用
 * @returns
 */
export const appList = async appCode => {
  const { data, errcode, errmsg } = await request(
    `/app/queryList${appCode ? `?appCode=${appCode}` : ''}`,
  );
  if (errcode === 0) {
    return data;
  } else {
    Modal.info({
      title: '提示',
      content: errmsg,
    });
    return false;
  }
};

/**
 * @TODO 添加应用
 */
export const createApp = async params => {
  const { data, errcode, errmsg } = await request(`/app/create`, {
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
};

/**
 * @TODO 获取应用详情
 */
export const app = async id => {
  const { data, errcode, errmsg } = await request(`/app/info/${id}`, {
    methods: 'GET',
  });
  if (errcode === 0) {
    return data;
  } else {
    Modal.info({
      title: '获取应用失败',
      content: errmsg,
    });
    return false;
  }
};

// 修改应用
export const updateApp = async params => {
  const { data, errcode, errmsg } = await request(`/app/modify`, {
    method: 'POST',
    body: params,
  });
  if (errcode === 0) {
    return data;
  } else {
    Modal.info({
      title: '更新应用失败',
      content: errmsg,
    });
    return false;
  }
};

/**
 * @TODO 删除应用
 */
export const deleteApp = async id => {
  const { data, errcode, errmsg } = await request(`/app/remove/${id}`, {
    method: 'POST',
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
};

/**
 * @TODO 切换应用加密状态
 */
export const checkApp = async params => {
  const { data, errcode, errmsg } = await request(`/app/switch`, {
    method: 'POST',
    body: params
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
};
