import { FK, CK, SboxTable } from "./constant";
import bitArray from "./bitArray";
import bits from "./bits";
import base64 from "./base64";

//位运算
function bigxor(a, b) {
  return a ^ b;
}

function leftshift(a, n, size) {
  if (!size) {
    size = 32;
  }
  n = n % size;
  return (a << n) | (a >>> (size - n));
  //return (a << n)
}


function sm4Sbox(a) {
  var b1 = SboxTable[(a & 0xf0000000) >>> 28][(a & 0x0f000000) >>> 24];
  var b2 = SboxTable[(a & 0x00f00000) >>> 20][(a & 0x000f0000) >>> 16];
  var b3 = SboxTable[(a & 0x0000f000) >>> 12][(a & 0x00000f00) >>> 8];
  var b4 = SboxTable[(a & 0x000000f0) >>> 4][(a & 0x0000000f) >>> 0];
  return (b1 << 24) | (b2 << 16) | (b3 << 8) | (b4 << 0);
}

function GET_ULONG_BE(a) {
  a = sm4Sbox(a);
  return bigxor(
    bigxor(
      bigxor(a, leftshift(a, 2)),
      bigxor(leftshift(a, 10), leftshift(a, 18))
    ),
    leftshift(a, 24)
  );
}

function PUT_ULONG_BE(b) {
  b = sm4Sbox(b);
  return bigxor(b, bigxor(leftshift(b, 13), leftshift(b, 23)));
}

function sm4_getkey(MK) {
  var K = new Array();
  var rk = new Array();
  K[0] = bigxor(MK[0], FK[0]);
  K[1] = bigxor(MK[1], FK[1]);
  K[2] = bigxor(MK[2], FK[2]);
  K[3] = bigxor(MK[3], FK[3]);

  for (var i = 0; i < 32; i++) {
    K[i + 4] = bigxor(
      K[i],
      PUT_ULONG_BE(bigxor(bigxor(K[i + 1], K[i + 2]), bigxor(K[i + 3], CK[i])))
    );
    //rk[i] = K[i+4].toString(16);
    rk[i] = K[i + 4];
  }
  return rk;
}

function sm4_init(key, type) {
  // console.log("sm4_init", key, type);
  if (type === 1) {
    //encrypt_sm4
    return sm4_getkey(key);
  } else {
    var frk = sm4_getkey(key);
    var rk = new Array();
    for (var i = frk.length - 1; i >= 0; i--) {
      rk[frk.length - 1 - i] = frk[i];
    }
    return rk;
  }
}

function sm4_operator(messsage, rk) {
  var X = messsage;
  for (var i = 0; i < 32; i++) {
    //X[i+4] = bigxor(X[i], GET_ULONG_BE(bigxor(bigxor(X[i+1], X[i+2]), bigxor(X[i+3], parseInt(rk[i], 16)))))
    X[i + 4] = bigxor(
      X[i],
      GET_ULONG_BE(bigxor(bigxor(X[i + 1], X[i + 2]), bigxor(X[i + 3], rk[i])))
    );
  }
  var Y = [X[35], X[34], X[33], X[32]];
  return Y;
}

function sm4_padding(message, length) {
  var paddlen = 0;
  var len = 16 - (length % 16);

  len = len % 4;

  if (length === 0) {
    message[0] = leftshift(0x80, 31);
    message[1] = 0;
    message[2] = 0;
    message[3] = 0;
    paddlen = 16;
    return paddlen;
  }

  if (len == 1) {
    message[message.length - 1] += 0x80;
  } else if (len == 2) {
    message[message.length - 1] += 0x8000;
  } else if (len == 3) {
    message[message.length - 1] += 0x800000;
  } else if (len == 0) {
    message[message.length] = leftshift(0x80, 24);
  }
  paddlen += len;

  while (message.length % 4 != 0) {
    message[message.length] = 0;
    paddlen += 4;
  }

  return paddlen;
}

function sm4_unpadding(message) {
  var paddlen = 0;
  while (message.length > 0 && message[message.length - 1] === 0) {
    message.pop();
    // paddlen += 4;
  }

  if (message[message.length - 1] & 0x80) {
    message[message.length - 1] -= 0x80;
    paddlen += 1;
  } else if (message[message.length - 1] & 0x8000) {
    message[message.length - 1] -= 0x8000;
    paddlen += 2;
  } else if (message[message.length - 1] & 0x800000) {
    message[message.length - 1] -= 0x800000;
    paddlen += 3;
  } else if (message[message.length - 1] & 0x80000000) {
    message.pop();
    // paddlen += 4;
  }

  return paddlen;
}
// function toarr(str) {

//   var len = str.length;
//   let arr = [];
//   for (var i = 0; i < len; i++) {
//     console.log(111115555)
//     cons
//     arr.push(str.charCodeAt(i).toString(16));
//     console.log(44444)
//   }
//   console.log('arr.join(" 0x")', arr.join(" 0x"));
// }
export function flk_sm4CbcNoPadding(skey, type, siv, smessage) {
  var key;
  var iv;
  if (typeof siv == "string") {
    if (siv.length !== 16) {
      return;
    }
    //iv = sjcl.codec.utf8String.toBits(siv);
    iv = bits.toBits(siv);
  } else if (Object.prototype.toString.call(siv) === "[object Array]") {
    if (siv.length !== 4) {
      return;
    }
    iv = siv;
  }

  if (typeof skey == "string") {
    if (skey.length !== 16) {
      return;
    }
    //key = sjcl.codec.utf8String.toBits(skey);
    key = bits.toBits(skey);
  } else if (Object.prototype.toString.call(skey) === "[object Array]") {
    if (skey.length !== 4) {
      return;
    }
    key = skey;
  }

  var message = "";
  if (type === 1) {
    //console.log("enc smessage: " + smessage);
    //message = sjcl.codec.utf8String.toBits(smessage);
    // console.log("smessagee: " + smessage);
    message = bits.toBits(smessage);
    // console.log("smessagee====: " + smessage);
    //console.log("dec message: " + message);
    //console.log("len:"+smessage.length+" ,message:"+message );
    // sm4_padding(message, bitArray.bitLength(message) / 8);
    //console.log("len:"+smessage.length+" ,message:"+message );
  } else {
    // message = sjcl.codec.base64.toBits(smessage);
    message = base64.toBits(smessage);
    // toarr(message)
    // console.log("smessagee====: " + message);
  }

  var rk = sm4_init(key, type);
  var cipher = new Array();
  var tmp = new Array();

  // if (type === 1) { //encrypt
  //     //message.concat(0x80);
  //     message[message.length] = 0x00000000;
  //     while (message.length % 4 !== 0) {
  //         //message.concat(0x00);
  //         message[message.length] = 0x00000000;
  //     }
  // }
  // if(type === 1){
  //     sm4_padding(message);
  // }

  if (type === 1) {
    for (var i = 0; i < message.length; i += 4) {
      message[i] = bigxor(iv[0], message[i]);
      message[i + 1] = bigxor(iv[1], message[i + 1]);
      message[i + 2] = bigxor(iv[2], message[i + 2]);
      message[i + 3] = bigxor(iv[3], message[i + 3]);
      tmp = [message[i], message[i + 1], message[i + 2], message[i + 3]];
      iv = sm4_operator(tmp, rk);
      cipher.splice(i, 0, iv[0], iv[1], iv[2], iv[3]);
      // console.log('messagemessage', message)
    }
  } else {
    for (var i = 0; i < message.length; i += 4) {
      tmp = [message[i], message[i + 1], message[i + 2], message[i + 3]];
      //cipher.concat(sm4_operator(tmp, rk));
      tmp = sm4_operator(tmp, rk);
      cipher[i] = bigxor(iv[0], tmp[0]);
      cipher[i + 1] = bigxor(iv[1], tmp[1]);
      cipher[i + 2] = bigxor(iv[2], tmp[2]);
      cipher[i + 3] = bigxor(iv[3], tmp[3]);
      iv = [message[i], message[i + 1], message[i + 2], message[i + 3]];
    }
  }

  if (type !== 1) {
    var paddlen = sm4_unpadding(cipher);
    //w.bitSlice(output, 0, output.length * 32 - bi * 8)

    //console.log("dec bits : " + bitArray.bitSlice(cipher,0,cipher.length*32-paddlen*8));
    //console.log("dec str : " + bits.fromBits(sjcl.bitArray.bitSlice(cipher,0,cipher.length*32-paddlen*8)));
    return bits.fromBits(
      bitArray.bitSlice(cipher, 0, cipher.length * 32 - paddlen * 8)
    );
    //return bits.fromBits(bitArray.bitSlice(cipher,0,cipher.length*32-paddlen*8));
    // var tmp  = "";
    // for(var i = 0; i < cipher.length;i++)
    // {
    //     tmp += cipher[i].toString();
    // }
    // return tmp;
  }

  //return cipher;
  //return sjcl.codec.base64.fromBits(cipher);
  return base64.fromBits(cipher);
}


export function flk_sm4CbcStream(skey, type, siv, uintstream) {
  var key;
  var iv;
  if (typeof siv == "string") {
    if (siv.length !== 16) {
      return;
    }
    iv = bits.toBits(siv);
  } else if (Object.prototype.toString.call(siv) === "[object Array]") {
    if (siv.length !== 4) {
      return;
    }
    iv = siv;
  }

  if (typeof skey == "string") {
    if (skey.length !== 16) {
      return;
    }
    key = bits.toBits(skey);
  } else if (Object.prototype.toString.call(skey) === "[object Array]") {
    if (skey.length !== 4) {
      return;
    }
    key = skey;
  }

  var message = "";
  //if (type === 1) {
  message = bits.uintstoBits(uintstream);
  //sm4_padding(message, (bitArray.bitLength(message) / 8));
  //} else {
  //  message = sm4.mode.base64.toBits(smessage);
  //}

  var rk = sm4_init(key, type);
  var cipher = new Array();
  var tmp = new Array();

  if (type === 1) {
    for (var i = 0; i < message.length; i += 4) {
      message[i] = bigxor(iv[0], message[i]);
      message[i + 1] = bigxor(iv[1], message[i + 1]);
      message[i + 2] = bigxor(iv[2], message[i + 2]);
      message[i + 3] = bigxor(iv[3], message[i + 3]);
      tmp = [message[i], message[i + 1], message[i + 2], message[i + 3]];
      iv = sm4_operator(tmp, rk);
      cipher.splice(i, 0, iv[0], iv[1], iv[2], iv[3]);
    }
  } else {
    for (var i = 0; i < message.length; i += 4) {
      tmp = [message[i], message[i + 1], message[i + 2], message[i + 3]];
      tmp = sm4_operator(tmp, rk);
      cipher[i] = bigxor(iv[0], tmp[0]);
      cipher[i + 1] = bigxor(iv[1], tmp[1]);
      cipher[i + 2] = bigxor(iv[2], tmp[2]);
      cipher[i + 3] = bigxor(iv[3], tmp[3]);
      iv = [message[i], message[i + 1], message[i + 2], message[i + 3]];
    }
  }

  return bits.bitstoUints(cipher);
}
