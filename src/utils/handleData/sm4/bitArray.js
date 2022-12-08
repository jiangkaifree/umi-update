function bitSlice(b, c, d) {
  b = _shiftRight(b.slice(c / 32), 32 - (c & 31)).slice(1);
  return d === undefined ? b : clamp(b, d - c);
}


function bitLength(d) {
  var c = d.length,
    b;
  if (c === 0) {
    return 0;
  }
  b = d[c - 1];
  return (c - 1) * 32 + getPartial(b);
}

function clamp(d, b) {
  if (d.length * 32 < b) {
    return d;
  }
  d = d.slice(0, Math.ceil(b / 32));
  var c = d.length;
  b = b & 31;
  if (c > 0 && b) {
    d[c - 1] = partial(b, d[c - 1] & (2147483648 >> (b - 1)), 1);
  }
  return d;
}

function partial(b, a, c) {
  if (b === 32) {
    return a;
  }
  return (c ? a | 0 : a << (32 - b)) + b * 0x10000000000;
}

function getPartial(a) {
  return Math.round(a / 0x10000000000) || 32;
}

function _shiftRight(d, c, h, f) {
  var g,
    b = 0,
    e;
  if (f === undefined) {
    f = [];
  }
  for (; c >= 32; c -= 32) {
    f.push(h);
    h = 0;
  }
  if (c === 0) {
    return f.concat(d);
  }
  for (g = 0; g < d.length; g++) {
    f.push(h | (d[g] >>> c));
    h = d[g] << (32 - c);
  }
  b = d.length ? d[d.length - 1] : 0;
  e = getPartial(b);
  f.push(partial((c + e) & 31, c + e > 32 ? h : f.pop(), 1));
  return f;
}

export default {
  bitLength,
  bitSlice,
  partial,
};
