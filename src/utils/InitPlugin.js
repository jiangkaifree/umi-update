// import axios from 'axios';
import { message } from 'antd';
import { flk_sm4CbcNoPadding } from './handleData/sm4/sm4';
import { flk_sm3HMAC } from './handleData/sm3/instances';
/**
 * 16字节key合并成int[4]数组
 *
 * @param key
 * @returns {number[]}
 */
function mixSM4Key(key) {
  if (!key || typeof key != 'object' || key.length !== 16) {
    return;
  }
  var mixKey = [0, 0, 0, 0];
  for (var i = 0; i < 16; i++) {
    mixKey[Math.floor(i / 4)] |= key[i] << ((3 - (i % 4)) * 8);
  }
  return mixKey;
}

var iv = [0, 0, 0, 0];
const key = [
  0x3f, 0x54, 0xa1, 0xdc, 0x91, 0x0c, 0x93, 0xcc, 0xb7, 0x24, 0x38, 0xed, 0xff, 0x8c, 0xa6, 0x30,
];

/**
 * @TODO 统一调用Ukey方法
 * @param {*} params
 */

export const ukeyPlugin = async (params) => {
  console.log('params', params);
  params = JSON.stringify(params);
  let result = '';
  var enc_body = flk_sm4CbcNoPadding(mixSM4Key(key), 1, iv, params);
  console.log(123, 'beforeAxios');
  // await axios.post('http://localhost:61230/skf/oper', enc_body).then(res => {
  // await axios.post('http://192.168.20.106:61230/skf/oper', enc_body).then(res => {
  await axios
    .post('http://127.0.0.1:61230/skf/oper', enc_body)
    .then((res) => {
      const deData = flk_sm4CbcNoPadding(mixSM4Key(key), 0, iv, res.data);
      result = JSON.parse(deData.replace(/\u0000/g, ''));
      console.log('ukeyPlugin', result);
    })
    .catch((err) => {
      console.log(222222, err);
      result = err;
    });
  return result;
};
var aukey = new Uint8Array([
  0x01, 0xf8, 0x45, 0x87, 0x66, 0x01, 0x01, 0x01, 0x55, 0xab, 0x01, 0x01, 0x01, 0xcd, 0x01, 0x01,
]);
const verifySignature = (result) => {
  if (result && (result.code === 0 || result.code)) {
    if (result.code === 352) {
      alert('完整性校验失败');
      return;
    }
    if (result.code !== 0) {
      message.error(`${result.code},${result.message}`);
      return;
    }
    let checkoutSignature = {};
    checkoutSignature = result.signature;
    delete result.signature;
    result = flk_sm3HMAC(JSON.stringify(result), aukey);
    if (result !== checkoutSignature) {
      alert('完整性校验失败');
      return;
    }
  }
};
const verifySignatureNoMessage = (result) => {
  if (result && (result.code === 0 || result.code)) {
    if (result.code === 352) {
      alert('完整性校验失败');
      return;
    }

    let checkoutSignature = {};
    checkoutSignature = result.signature;
    delete result.signature;
    // result = sm3({ str: JSON.stringify(result) })
    result = flk_sm3HMAC(JSON.stringify(result), aukey);
    console.log('result', result);

    if (result !== checkoutSignature) {
      alert('完整性校验失败');
      return;
    }
  }
};
const handleParams = (params) => {
  let stringParams = JSON.stringify(params);
  console.log(2222, stringParams);
  // signature = sm3({ str: params })
  let signature = flk_sm3HMAC(stringParams, aukey);
  console.log(333333, signature);

  params.signature = signature;
  console.log(44444, params);
};
/**
 * @TODO 登录接口
 * @param {string} type   type: 'login',检测请求与当前ukey是否匹配type
 */
export const ukeyLogin = async (params) => {
  handleParams(params);
  const result = await ukeyPlugin(params);
  verifySignatureNoMessage(result);
  return result;
};
/**
 * @TODO 修改ukey口令
 * @param {string} oldPassword 旧口令值
 * @param {string} newPassword 新口令值
 * @returns {boolean} 是否修改成功
 */
export const changePinPassword = async (params) => {
  // const result = await ukeyPlugin(params);
  // return result
  handleParams(params);
  const result = await ukeyPlugin(params);
  console.log('changePinPassword(params)', result);
  verifySignature(result);
  return result;
};
/**
 * @TODO 检查uKey是否插入
 * @returns
 */

export const hasUkey = async (params) => {
  // let result = ''
  // result = await ukeyPlugin(params);
  // return result
  handleParams(params);
  const result = await ukeyPlugin(params);
  console.log('hasUkey', result);
  verifySignatureNoMessage(result);
  return result;
};

/**
 * @TODO 初始化ukey
 * @returns {boolean} 是否初始化成功
 */
export const initUkey = () => {
  // const { code, data } = plugin.InitUkey();
  // if (code === 200) {
  //   return true;
  // } else {
  //   return false;
  // }
  return true;
};

/**
 * @TODO ssl生成登录鉴权参数
 * @param {string} params
 * params:{
        type: 'GenerateAuthData',
        role: '',
        cipher: '',
    }
 * @param {string} role 用户身份
 * @param {number} cipher 登录密码
 * @returns {string}  生成token
  */
export const GenerateAuthData = async (params) => {
  // let result = ''
  // result = await ukeyPlugin(params);
  // if (result.code === 0) {
  //     return result;
  // } else {
  //     return result;
  // }
  handleParams(params);
  const result = await ukeyPlugin(params);
  verifySignatureNoMessage(result);
  return result;
};

/**
 * @TODO ipsec生成登录鉴权参数
 * @param {string} params
 * param:{{
        type: 'GenerateAuthDataForIPSecGM',
        role: '',
        cipher: '',
        random: '',
        sessionID: '',
    }}
 * @param {string} role 用户身份
 * @param {number} cipher 登录密码
 * @param {string} random 随机数
 * @param {number} sessionID 登录密码
 */
export const GenerateAuthDataForIPSecGM = async (params) => {
  const { code, data } = await ukeyPlugin(params);
  if (code === 0) {
    return data;
  } else {
    return false;
  }
};

/**
 * @TODO 获取系统MAC地址
 * @param {string} type 获取mac的type
 * @returns {string}  生成MAC
 */
// export const GetMAC = async () => {
//     let result = ''
//     result = await ukeyPlugin({
//         type: 'GetMAC',//获取登系统mac需要传的type
//     });
//     // console.log('GetMAC', code, result)
//     return result
// }
export const GetMAC = async (params) => {
  // let result = ''

  // result = await ukeyPlugin(params);
  // return result
  handleParams(params);
  const result = await ukeyPlugin(params);
  verifySignatureNoMessage(result);
  return result;
};

/**
 * @TODO 向ukey写入数据
 * @param {string}
 * params:{
        type: 'WriteDataIntoUkey',
        fileDate: ''
    }
 *  @param {string}fileDate 要写入Ukey的数据
 */
// WriteDataIntoUkey
export const WriteDataIntoUkey = async (params) => {
  const { code, data } = await ukeyPlugin(params);
  if (code === 0) {
    return data;
  } else {
    return false;
  }
};

/**
 * @TODO 读取ukey中的数据
 * @param {string} type 读取数据的type
 */
// WriteDataIntoUkey
export const ReadDataFromUkey = async () => {
  const { code, data } = await ukeyPlugin({
    type: 'ReadDataFromUkey',
  });
  if (code === 0) {
    return data;
  } else {
    return false;
  }
};

/**
 * @TODO 检测请求与当前ukey是否匹配  暂时好像没有这个接口
 * @param {string} type 检测请求与当前ukey是否匹配type
 */
export const MatchUkey = async () => {
  const { code, data } = await ukeyPlugin({
    type: '', //检测请求与当前ukey是否匹配需要传的type
  });
  if (code === 0) {
    return data;
  } else {
    return false;
  }
};
