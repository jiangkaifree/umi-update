/**
 * @description  系统通用fetch数据请求
 */
import { fetch } from 'dva';
import { message, notification, Modal } from 'antd';
import { downloadFiles, RedirectToLogin } from './utilFunction';
// import { IP_PORT } from './constants';

// const checkIsLogin = url => {
//   const UserInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
//   const href = window.location.href;
//   if (!UserInfo) {
//     if (href.indexOf('/login') === -1 || href.indexOf('/resetpasswords') === -1) {
//       logout();
//       return false;
//     }
//   }
//   return true;
// };
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const IP_PORT =
  process.env.NODE_ENV === 'development' ? '/bmserver' : `${window.location.origin}/bmserver`;

export const request = (url, options = {}) => {
  const UserInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};

  const { method = 'get', headers, body } = options;
  const token = 'Bearer ' + UserInfo.token || '';

  const accessToken = sessionStorage.getItem('accessToken') || '';
  const sessionKey = sessionStorage.getItem('sessionKey') || '';
  // console.log(JSON.parse(sessionStorage.getItem('platform')))
  const { role, orgServer } = JSON.parse(sessionStorage.getItem('platform')) || {
    role: '',
    orgServer: '',
  };

  if (
    method.toUpperCase() === 'POST' ||
    method.toUpperCase() === 'PUT' ||
    method.toUpperCase() === 'DELETE'
  ) {
    if (!(body instanceof FormData)) {
      options.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      };
      options.body = JSON.stringify(options.body);
    } else {
      console.log(' FormData)', body);
      // newOptions.body is FormData
      options.headers = {
        Accept: 'application/json',
        ...headers,
      };
    }
  }

  options.headers = {
    ...options.headers,
    token,
    'Session-Key': sessionKey,
    'Access-Token': accessToken,
    // 开放平台需要携带header
    Role: role,
    'Org-Server': orgServer,
  };

  const response = fetch(IP_PORT + url, options)
    .then((response) => {
      const header = response.headers.get('content-type');
      if (header === 'application/octet-stream') {
        const fileName = response.headers.get('content-disposition');
        response.blob().then((blob) => {
          downloadFiles(blob, fileName);
        });
      } else {
        return response.json();
      }
    })
    .catch((e) => {
      console.log(e);
      message.error(`${e}`);
    });
  return response;
};

export default async (url, options) => {
  return new Promise((resolve, reject) => {
    let status = 0; // 0 等待 1 完成 2 超时
    let timer = setTimeout(() => {
      if (status === 0) {
        status = 2;
        timer = null;
        reject('time out');
      }
    }, 60000 * 2);
    request(url, options).then((res) => {
      if (status !== 2) {
        clearTimeout(timer);
        resolve(res);
        timer = null;
        status = 1;
      }
      if (res) {
        const { errcode } = res;
        if (errcode === -2 || errcode === 5102 || errcode === 5103 || errcode === 5104) {
          //未登录、token过期、token解析失败
          Modal.confirm({
            title: '提醒',
            content: '登录信息已经过期或失效。请前往重新登录',
            onOk: () => {
              RedirectToLogin();
            },
          });
        }
      }
      resolve(res);
    });
  });
};
