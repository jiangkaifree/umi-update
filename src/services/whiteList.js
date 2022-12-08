import request from '../utils/request';
import qs from 'qs';
import { Modal } from 'antd';

export async function queryHostList(params) {
  const { errcode, data, errmsg } = await request(`/host/filter/page?${qs.stringify(params)}`);
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

export async function updateHostFilter(params) {
  const { errcode, data, errmsg } = await request(`/host/filter/update/${params.id}`, {
    method: 'post',
    body: params,
  });
  if (errcode === 0) {
    return data || true;
  } else {
    Modal.info({
      title: '提示',
      content: errmsg,
    });
    return false;
  }
}

export async function addHostFilter(params) {
  const { errcode, data, errmsg } = await request(`/host/filter/add`, {
    method: 'post',
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

export async function deleteHostFilter(params) {
  const { errcode, data, errmsg } = await request(`/host/filter/delete/${params.id}`, {
    method: 'post',
    body: params,
  });
  if (errcode === 0) {
    return data || true;
  } else {
    Modal.info({
      title: '提示',
      content: errmsg,
    });
    return false;
  }
}

export async function enableHostFilter(params) {
  const { errcode, data, errmsg } = await request(`/host/filter/enable/${params.id}`, {
    method: 'post',
    body: params.formData,
  });
  if (errcode === 0) {
    return data || true;
  } else {
    Modal.info({
      title: '错误提示',
      content: errmsg,
    });
  }
}

/**
 * @TODO 获取api列表
 */
export async function queryApiList(params) {
  const { errcode, data, errmsg } = await request(`/api/filter/page?${qs.stringify(params)}`);
  if (errcode === 0) {
    return data || true;
  } else {
    Modal.info({
      title: '错误提示',
      content: errmsg,
    });
  }
}

export async function updateApiFilter(params) {
  const { errcode, data, errmsg } = await request(`/api/filter/update/${params.id}`, {
    method: 'post',
    body: params,
  });
  if (errcode === 0) {
    return data || true;
  } else {
    Modal.info({
      title: '错误提示',
      content: errmsg,
    });
  }
}

/**
 * @TODO 更新api
 */
export async function addApiFilter(params) {
  const { errcode, data, errmsg } = await request(`/api/filter/add`, {
    method: 'post',
    body: params,
  });
  if (errcode === 0) {
    return data || true;
  } else {
    Modal.info({
      title: '错误提示',
      content: errmsg,
    });
  }
}

export async function deleteApiFilter(params) {
  const { errcode, data, errmsg } = await request(`/api/filter/delete/${params.id}`, {
    method: 'post',
    body: params,
  });
  if (errcode === 0) {
    return data || true;
  } else {
    Modal.info({
      title: '错误提示',
      content: errmsg,
    });
  }
}

export async function enableApiFilter(params) {
  const { errcode, data, errmsg } = await request(`/api/filter/enable/${params.id}`, {
    method: 'post',
    body: params.formData,
  });
  if (errcode === 0) {
    return data || true;
  } else {
    Modal.info({
      title: '错误提示',
      content: errmsg,
    });
  }
}
