import bitArray from './bitArray';

const _chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function fromBits(g, k, b) {
  var d = '',
    e,
    j = 0,
    h = _chars,
    f = 0,
    a = bitArray.bitLength(g);
  if (b) {
    h = h.substr(0, 62) + '-_';
  }
  for (e = 0; d.length * 6 < a; ) {
    d += h.charAt((f ^ (g[e] >>> j)) >>> 26);
    if (j < 6) {
      f = g[e] << (6 - j);
      j += 26;
      e++;
    } else {
      f <<= 6;
      j -= 6;
    }
  }
  while (d.length & 3 && !k) {
    d += '=';
  }
  return d;
}

function toBits(h, f) {
  h = h.replace(/\s|=/g, '');
  var d = [],
    e,
    g = 0,
    j = _chars,
    b = 0,
    a;
  if (f) {
    j = j.substr(0, 62) + '-_';
  }
  for (e = 0; e < h.length; e++) {
    a = j.indexOf(h.charAt(e));
    if (a < 0) {
      var err = { message: " sm4 异常 this isn't base64!" };
      throw err;
    }
    if (g > 26) {
      g -= 26;
      d.push(b ^ (a >>> g));
      b = a << (32 - g);
    } else {
      g += 6;
      b ^= a << (32 - g);
    }
  }
  if (g & 56) {
    d.push(bitArray.partial(g & 56, b, 1));
  }
  return d;
}

export default {
  toBits,
  fromBits,
};
