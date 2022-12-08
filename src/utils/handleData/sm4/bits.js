import bitArray from './bitArray'
function fromBits(a) {
  var b = "",
    e = bitArray.bitLength(a),
    d,
    c;
  for (d = 0; d < e / 8; d++) {
    if ((d & 3) === 0) {
      c = a[d / 4];
    }
    b += String.fromCharCode(c >>> 24);
    c <<= 8;
  }
  return decodeURIComponent(escape(b));
  //return b;
}

function toBits(d) {
  d = unescape(encodeURIComponent(d));
  var a = [],
    c,
    b = 0;
  for (c = 0; c < d.length; c++) {
    b = (b << 8) | d.charCodeAt(c);
    if ((c & 3) === 3) {
      a.push(b);
      b = 0;
    }
  }
  if (c & 3) {
    a.push(bitArray.partial(8 * (c & 3), b));
  }
  return a;
}

function uintstoBits(d) {
  var size = d.length;
  var bits = new Array();
  var c = 0;
  var i = 0;
  for (i = 1; i <= size; i++) {
    c = (c << 8) | d[i - 1];
    if (i % 4 === 0) {
      bits.push(c);
      c = 0;
    }
  }
  var leftbytes = (i - 1) % 4;
  if (leftbytes) {
    bits.push(c << ((4 - leftbytes) * 8));
    var paddinglen = 16 - ((i - 1) % 16);
    paddinglen = parseInt(paddinglen / 4);
    for (i = 0; i < paddinglen; i++) {
      bits.push(0);
    }
  }
  return bits;
}

function bitstoUints(d) {
  var size = d.length;
  var uints = new Uint8Array(size * 4);
  var i = 0;
  for (i = 0; i < size; i++) {
    var ii = i * 4;
    uints[ii] = (d[i] >> 24) & 0xff;
    uints[ii + 1] = (d[i] >> 16) & 0xff;
    uints[ii + 2] = (d[i] >> 8) & 0xff;
    uints[ii + 3] = d[i] & 0xff;
  }
  return uints;
}


export default {
  fromBits,
  toBits,
  uintstoBits,
  bitstoUints
}