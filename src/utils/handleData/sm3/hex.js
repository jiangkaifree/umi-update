const encode = (b, pos, len) => {
  var hexCh = new Array(len * 2);
  var hexCode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

  for (var i = pos, j = 0; i < len + pos; i++, j++) {
    hexCh[j] = hexCode[(b[i] & 0xff) >> 4];
    hexCh[++j] = hexCode[b[i] & 0x0f];
  }

  return hexCh.join('');
};

const utf8StrToBytes = (utf8Str) => {
  var ens = encodeURIComponent(utf8Str);
  var es = unescape(ens);
  var esLen = es.length; // Convert

  var words = [];

  for (var i = 0; i < esLen; i++) {
    words[i] = es.charCodeAt(i);
  }

  return words;
};

export { utf8StrToBytes, encode };
