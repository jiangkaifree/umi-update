import flk_SM3Digest from './create';
import * as flk_Hex from './hex';

const sm3 = (value) => {
  //str:需要sm3加密的字符串  isFile:需要加密的是文件类型的不需要utf8StrToBytes  needByte：返回值类型为byte
  var str = '';

  if (value.str) {
    str = value.str;
  }

  if (value.isFile) {
    var isFile = true;
  }

  var sm3 = new flk_SM3Digest();

  if (!isFile) {
    var dataBy = flk_Hex.utf8StrToBytes(str);
    sm3.update(dataBy, 0, dataBy.length); //数据很多的话，可以分多次update
  } else {
    sm3.update(str, 0, str.length); //数据很多的话，可以分多次update
  }

  var sm3Hash = sm3.doFinal(); //得到的数据是个byte数组

  var sm3HashHex = flk_Hex.encode(sm3Hash, 0, sm3Hash.length); //编码成16进制可见字符

  return sm3HashHex;
};
const flk_sm3HMAC = (value, aukey) => {
  if (value.isFile) {
    var isFile = true;
  }
  var sm3 = new flk_SM3Digest();
  if (!isFile) {
    value = flk_Hex.utf8StrToBytes(value);
  }
  // var sm3 = new flk_SM3Digest();
  var ipad = new Uint8Array(64);
  var opad = new Uint8Array(64);
  for (var i = 0; i < 64; i++) {
    ipad[i] = 0x36;
    opad[i] = 0x5c;
  }
  for (i = 0; i < aukey.length; i++) {
    ipad[i] = ipad[i] ^ aukey[i];
    opad[i] = opad[i] ^ aukey[i];
  }
  sm3.update(ipad, 0, 64);
  sm3.update(value, 0, value.length);
  var temp = sm3.doFinal();
  var sm3_1 = new flk_SM3Digest();
  sm3_1.update(opad, 0, 64);
  sm3_1.update(temp, 0, temp.length);
  var sm3Hash = sm3_1.doFinal();
  var sm3HashHex = flk_Hex.encode(sm3Hash, 0, sm3Hash.length);
  return sm3HashHex;
};

export { sm3, flk_sm3HMAC };
