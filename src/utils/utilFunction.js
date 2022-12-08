import { message } from 'antd';
import request from './request';

export const RedirectToLogin = () => {
  const platform = sessionStorage.getItem('platform');
  sessionStorage.clear();
  localStorage.clear();
  if (platform) {
    alert('token过期，请重新登录!');
    window.close();
  } else {
    if (window.location.pathname === '/login') return;
    window.location.href = '/login';
  }
  // window.location.href = "/login";
};

export const timesTransition = (times) => {
  let t = 0;
  if (times <= 1000000) {
    return {
      times: times,
    };
  }

  if (times > 1000000 && times <= 1000000000) {
    t = Number(times / 10000).toFixed(2);
    return {
      times: t,
      unit: '万次',
    };
  }

  if (times > 1000000000) {
    t = Number(times / 10000000).toFixed(2);
    return {
      times: t,
      unit: '千万次',
    };
  }
};

export const byteTransition = (count) => {
  let c = 0;
  if (count <= 1024) {
    return {
      count: count,
      unit: 'B',
    };
  }

  if (count > 1024 && count <= 1024 * 1024) {
    c = Number(count / 1024).toFixed(2);
    return {
      count: c,
      unit: 'KB',
    };
  }

  if (count > 1024 * 1024 * 1024) {
    c = Number(count / 1024 / 1024).toFixed(2);
    return {
      count: c,
      unit: 'MB',
    };
  }
};

export const broadbandTransition = (count) => {
  let c = 0;
  if (count <= 1024) {
    return {
      count: c,
      unit: 'B/S',
    };
  }

  if (count > 1024 && count <= 1024 * 1024) {
    c = Number(count / 1024).toFixed(2);
    return {
      count: c,
      unit: 'KB/S',
    };
  }

  if (count > 1024 * 1024) {
    c = Number(count / 1024 / 1024).toFixed(2);
    return {
      count: c,
      unit: 'MB/S',
    };
  }
};

// 校验上传文件
export const canNextFile = (info, maxsize = 20, filetypes = []) => {
  var target = info.target;
  if (target.files.length === 0) {
    return;
  }
  var fileSize = target.files[0].size;
  // if (filetypes.length === 0) {
  //   filetypes = [".crt", ".key"];
  // }
  var filepath = target.value;
  if (filepath) {
    var isnext = false;
    var fileend = filepath.substring(filepath.lastIndexOf('.'));
    if (filetypes && filetypes.length > 0) {
      for (var i = 0; i < filetypes.length; i++) {
        if (filetypes[i] === fileend) {
          isnext = true;
          break;
        }
      }
    }
    if (!isnext && filetypes.length > 0) {
      message.info('不接受此文件类型！');
      target.value = '';
      return false;
    }
  } else {
    return false;
  }
  var size = fileSize / (1024 * 1024);
  if (maxsize && size > maxsize) {
    message.info('文件大小不能大于' + maxsize + 'M！');
    target.value = '';
    return false;
  }
  if (size <= 0) {
    message.info('文件大小不能为0M！');
    target.value = '';
    return false;
  } else if (size > 50 * 1024 * 1024) {
    return false;
  }
  return true;
};

/**
 * @TODO 获取平台侧携带query参数
 */
export const getPlatformQuery = async () => {
  const { search, pathname } = window.location;
  const query = new URLSearchParams(search);
  console.log(query.has('token') === false);
  if (query.has('token') === true) {
    const token = query.get('token');
    sessionStorage.setItem(
      'userInfo',
      JSON.stringify({
        token,
      }),
    );
    const org = query.get('org');
    const server = query.get('server');
    const role = query.get('role');

    sessionStorage.setItem(
      'platform',
      JSON.stringify({
        orgServer: `${org}_${server}`,
        role,
        server,
      }),
    );

    const { errcode, data } = await request(`/wte/csp/getUserByToken`);
    if (errcode === 0) {
      sessionStorage.setItem('userInfo', JSON.stringify(data));
      sessionStorage.setItem('userPermission', JSON.stringify(data.user.permissions));
      // 处理
      window.location.href = `${window.location.origin}${pathname}`;
    }
  }
};

/**
 * @TODO 密码输入框禁止copy, 粘贴
 */
export const disableCopyPaste = (e) => {
  e.preventDefault();
  return false;
};

/** 序列化 chartsSource */
export const formatChartsSource = (data) => {
  const enc = [];
  const flow = [];
  const links = [];

  data.forEach(
    ({ date, decryptionCount, encryptCount, connections, decryptionFlow, encryptFlow }) => {
      enc.push(
        { date, value: encryptCount, name: '加密次数' },
        { date, value: decryptionCount, name: '解密次数' },
      );
      flow.push(
        { date, value: Number((encryptFlow / 1024).toFixed(2)), name: '加密流量' },
        { date, value: Number((decryptionFlow / 1024).toFixed(2)), name: '解密流量' },
      );
      links.push({ date, value: connections, name: '连接数' });
    },
  );
  console.log('flow', flow);
  return [
    {
      name: 'enc',
      data: enc,
    },
    {
      name: 'flow',
      data: flow,
    },
    {
      name: 'links',
      data: links,
    },
  ];
};

/**
 * @TODO 校验上传文件格式及大小
 * @param {object} file 文件对象
 * @param {number} maxsize 最大大小
 * @param {array}·types 文件类型
 * @returns {boolean} 是否通过校验
 */
export const checkFile = (file, types, maxsize = 20) => {
  const { size, name } = file;

  // 文件类型校验
  const extendName = name.substring(name.lastIndexOf('.'));
  console.log(extendName);
  // debugger
  const hasType = types.includes(extendName);
  if (hasType === false) {
    message.info('文件类型不符合要求！');
    return false;
  }

  // 校验文件大小
  if (size === 0) {
    message.info('文件大小不能为0M！');
    return false;
  } else if (size > maxsize * 1024 * 1024) {
    message.info(`文件大小不能大于${maxsize}M！`);
    return false;
  }
  return true;
};

/**
 * @TODO 延迟函数
 * @param {number} time 延迟时间
 * @return resolve
 */
export const waitTime = (time = 3000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * @TODO download files
 * @param {Blob} blob
 * @param {string} name fileName
 */
export const downloadFiles = (blob, name) => {
  var file = new Blob([blob]);
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = decodeURIComponent(name.split('=')[1]);
  link.click();
  window.URL.revokeObjectURL(link.href);
  message.success('文件下载成功！');
};
