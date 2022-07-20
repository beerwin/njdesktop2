(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.NjDesktop = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { NjDesktop } = require('./src/njDesktop');
const { NjWindow } = require('./src/njWindow');
const NjWindowHeaderButtonTypes = require('./src/njWindowHeaderButtonTypes');
const NjWindowStates = require('./src/njWindowStates');

module.exports = {
    NjDesktop,
    NjWindow,
    NjWindowHeaderButtonTypes,
    NjWindowStates,
}
},{"./src/njDesktop":18,"./src/njWindow":21,"./src/njWindowHeaderButtonTypes":24,"./src/njWindowStates":27}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function () {
    return _v.default;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _v2.default;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _v3.default;
  }
});
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function () {
    return _v4.default;
  }
});
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function () {
    return _nil.default;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return _validate.default;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.default;
  }
});

var _v = _interopRequireDefault(require("./v1.js"));

var _v2 = _interopRequireDefault(require("./v3.js"));

var _v3 = _interopRequireDefault(require("./v4.js"));

var _v4 = _interopRequireDefault(require("./v5.js"));

var _nil = _interopRequireDefault(require("./nil.js"));

var _version = _interopRequireDefault(require("./version.js"));

var _validate = _interopRequireDefault(require("./validate.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./nil.js":4,"./parse.js":5,"./stringify.js":9,"./v1.js":10,"./v3.js":11,"./v4.js":13,"./v5.js":14,"./validate.js":15,"./version.js":16}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports.default = _default;
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports.default = _default;
},{"./validate.js":15}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports.default = _default;
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports.default = _default;
},{"./validate.js":15}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports.default = _default;
},{"./rng.js":7,"./stringify.js":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _md = _interopRequireDefault(require("./md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;
},{"./md5.js":3,"./v35.js":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
},{"./parse.js":5,"./stringify.js":9}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports.default = _default;
},{"./rng.js":7,"./stringify.js":9}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _sha = _interopRequireDefault(require("./sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;
},{"./sha1.js":8,"./v35.js":12}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regex = _interopRequireDefault(require("./regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports.default = _default;
},{"./regex.js":6}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports.default = _default;
},{"./validate.js":15}],17:[function(require,module,exports){
const HasEvents = class {
    constructor() {
        this.handlers = {};
    }

    on(event, listener) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }

        const l = this.handlers[event].find(l => l === listener);
        if (!l) {
            this.handlers[event].push(listener);
        }
    }

    off(event, listener) {
        if (!this.handlers[event]) {
            return;
        }

        this.handlers = this.handlers.filter(l => l !== listener);
    }

    async triggerListeners(event, data) {
        const handlers = this.handlers[event] || [];
        if (handlers.length === 0) {
            return [];
        }

        const values = [];

        for (let x in handlers) {
            values.push(await this.handlers[event][x](this, data));
        }
        return values;
    }

    destroy() {
        this.handlers = {};
    }
}

module.exports = {
    HasEvents
}

},{}],18:[function(require,module,exports){
const { NjTaskBar } = require("./njTaskBar");
const { NjWindow } = require("./njWindow");
const { NjWindowManager } = require("./njWindowManager")

const njDefaultWidth = 400;
const njDefaultHeight = 280;

const NjDesktop = class {
    constructor(element) {
        this.element = element;
        this.element.classList.add('nj-desktop');
        this.windowContainer = document.createElement('div');
        this.windowContainer.classList.add('nj-desktop-window-container');
        this.element.appendChild(this.windowContainer);
        this.taskBar = new NjTaskBar(this.element);
        this.windowManager = new NjWindowManager();
        this.windowManager.on('windowAdded', this.windowAdded.bind(this));
        this.windowManager.on('windowRemoved', this.windowRemoved.bind(this));
    }

    getElement() {
        return this.element;
    }

    getWindowContainer() {
        return this.windowContainer;
    }

    windowAdded(origin, njWindow) {
        this.taskBar.addWindowButton(njWindow);
    }

    windowRemoved(origin, njWindow) {

    }

    addWindow(njWindow) {
        this.windowManager.add(njWindow);
    }

    removeWindow(njWindow) {
        this.windowManager.removeWindow(njWindow);
    }

    createWindow(title, state, availableButtons) {
        const nextPosition = this.windowManager.getNextPosition();
        if (nextPosition.y + njDefaultHeight > this.getWindowContainer().offsetHeight) {
            nextPosition.y = 0;
        }

        if (nextPosition.x + njDefaultWidth > this.getWindowContainer().offsetWidth) {
            nextPosition.x = 0;
            nextPosition.y = 0;
        }
        const w = new NjWindow(this.getWindowContainer(), {...nextPosition, width: njDefaultWidth, height: njDefaultHeight}, title || "New window", state, availableButtons);
        w.on('close', this.windowClosed.bind(this));
        this.windowManager.setLastPosition(nextPosition);
        this.windowManager.add(w);
        return w;
    }

    windowClosed(origin) {
        this.windowManager.remove(origin);
    }

    destroy() {
        this.element.classList.remove('.nj-desktop');
        this.windowManager.destroy();
    }
}

module.exports = {
    NjDesktop,
}
},{"./njTaskBar":19,"./njWindow":21,"./njWindowManager":26}],19:[function(require,module,exports){
const { HasEvents } = require("./hasEvents");
const { NjTaskBarButtonList } = require("./njTaskBarButtonList");

class NjTaskBar extends HasEvents {
    constructor(parentElement) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-taskbar');
        this.buttonList = new NjTaskBarButtonList(this.element);
        parentElement.appendChild(this.element);
    }

    addWindowButton(njWindow) {
        this.buttonList.addWindowButton(njWindow);
    }

    removeWindowButton(njWindow) {
        this.buttonList.removeWindowButton(njWindowButton);
    }

    destroy() {
        super.destroy();
        this.buttonList.destroy();
        this.element.parentElement.removeChild(this.element);
    }
}

module.exports = {
    NjTaskBar
}
},{"./hasEvents":17,"./njTaskBarButtonList":20}],20:[function(require,module,exports){
const { HasEvents } = require("./hasEvents");

class NjTaskBarButtonList extends HasEvents {
    constructor(parentNode){
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-taskbar-button-list');
        this.leftButtonElement = document.createElement('button');
        this.leftButtonElement.classList.add('nj-taskbar-button-list-nav');
        this.leftButtonElement.classList.add('nj-taskbar-button-list-nav-left');
        this.rightButtonElement = document.createElement('button');
        this.rightButtonElement.classList.add('nj-taskbar-button-list-nav');
        this.rightButtonElement.classList.add('nj-taskbar-button-list-nav-right');
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.classList.add('nj-taskbar-button-list-container');
        this.element.appendChild(this.leftButtonElement);
        this.element.appendChild(this.buttonContainer);
        this.element.appendChild(this.rightButtonElement);
        parentNode.appendChild(this.element);
        this.buttons = [];
    }

    addWindowButton(njWindow) {
        const button = document.createElement('button');
        button.innerText = njWindow.getTitle();
        button.addEventListener('click', () => {
            const buttonItem = this.buttons.find(b => b.njWindow === njWindow);
            if (!buttonItem.focused) {
                njWindow.focus();
            }

            if (buttonItem.njWindow.isMinimized()) {
                buttonItem.njWindow.restore();
            }
        })
        const buttonItem = {
            button,
            njWindow,
            focused: false,
        }
        this.buttons.push(buttonItem);
        this.buttonContainer.appendChild(button);
        njWindow.on('titleUpdated', this.windowUpdated.bind(this));
        njWindow.on('stateChange', this.windowStateUpdated.bind(this));
        njWindow.on('close', this.windowRemoved.bind(this));
        njWindow.on('focus', this.windowFocused.bind(this));
        njWindow.on('blur', this.windowBlurred.bind(this));
    }

    windowRemoved(njWindow) {
        const button = this.buttons.find(b => b.njWindow === njWindow);
        button.button.parentNode.removeChild(button.button);
        this.buttons = this.buttons.filter(b => b.njWindow !== njWindow);        
    }

    windowFocused(njWindow) {
        const button = this.buttons.find(b => b.njWindow === njWindow);
        button.focused = true;
        button.button.classList.add('focused');
        button.button.scrollIntoView();
    }

    windowBlurred(njWindow) {
        const button = this.buttons.find(b => b.njWindow === njWindow);
        button.focused = false;
        button.button.classList.remove('focused');
    }

    windowStateUpdated(njWindow) {
        //
    }

    windowUpdated(njWindow, payload) {
        const button = this.buttons.find(b => b.njWindow === njWindow);
        button.button.innerText = payload;
        button.button.setAttribute('title', payload)
    }

    destroy() {
        super.destroy();
        this.buttons = [];
        this.element.parentNode.removeChild(this.element);
    }
}

module.exports = {
    NjTaskBarButtonList,
}
},{"./hasEvents":17}],21:[function(require,module,exports){
const {v4: uuidV4} = require('uuid');
const {NjWindowHeader} = require('./njWindowHeader');
const {HasEvents} = require('./hasEvents');
const NjWindowStates = require('./njWindowStates');
const NJWindowHeaderButtonTypes = require('./njWindowHeaderButtonTypes');
const { WS_MINIMIZED } = require('./njWindowStates');

const defaultHeaderButtons = [
    NJWindowHeaderButtonTypes.NJ_MINIMIZE,
    NJWindowHeaderButtonTypes.NJ_MAXIMIZE,
    NJWindowHeaderButtonTypes.NJ_CLOSE,
]

const NjWindow = class extends HasEvents {
    constructor(parentElement, rect, title, state, availableButtons) {
        super();
        this.rect = rect;
        this.id = uuidV4();
        this.title = title;
        this.element = document.createElement('div');
        this.element.setAttribute('id', this.id);
        this.element.classList.add('nj-window');
        this.element.addEventListener('mousedown', this.focus.bind(this));
        this.setLeft(rect.x);
        this.setTop(rect.y);
        this.setWidth(rect.width);
        this.setHeight(rect.height);
        parentElement.appendChild(this.element);
        this.visible = true;
        this.changeState(state || NjWindowStates.WS_NORMAL);
        this.header = this.createHeader(availableButtons || defaultHeaderButtons);
        this.header.on('stateChange', this.headerStateChange.bind(this));
        this.header.on('close', this.closeQuery.bind(this));
    }

    setTitle(title) {
        this.title = title;
        this.header.setTitle(this.title);
        this.triggerListeners('titleUpdated', this.title);
    }

    getTitle() {
        return this.title;
    }

    setWidth(width) {
        this.rect.width = width;
        this.element.style.width = width + 'px';
    }

    width() {
        return this.rect.width;
    }

    setHeight(height) {
        this.rect.height = height;
        this.element.style.height = height + 'px';
    }

    height() {
        return this.rect.height;
    }

    setLeft(left) {
        this.element.style.left = left + 'px';
        this.rect.x = left;
    }

    setTop(top) {
        this.element.style.top = top + 'px';
        this.rect.y = top;
    }

    createHeader(availableButtons){
        return new NjWindowHeader(this.element, this.title, availableButtons, this.state);
    }

    minimize() {
        this.changeState(NjWindowStates.WS_MINIMIZED);
        super.triggerListeners('stateChange', this.state);
    }

    isMinimized() {
        return this.state === WS_MINIMIZED;
    }

    maximize() {
        this.changeState(NjWindowStates.WS_MAXIMIZED);
        super.triggerListeners('stateChange', this.state);
    }

    hide() {
        this.visible = false;
        this.element.classList.add('nj-hidden');
        super.triggerListeners('hide');
    }

    show() {
        this.visible = true;
        this.element.classList.remove('nj-hidden');
        super.triggerListeners('show');
    }

    setZIndex(index) {
        this.element.style.zIndex = index;
    }

    restore() {
        this.state = this.previousState;
        if (!this.visible) {
            this.show();
        }
        this.updateClasses();
        super.triggerListeners('stateChange', this.state);
    }

    headerStateChange(origin, state) {
        this.changeState(state);
        this.header.updateState(state);
        super.triggerListeners('stateChange', this.state);
    }

    changeState(state) {
        this.previousState = this.state;
        this.state = state;
        this.updateClasses();
        if (this.state === WS_MINIMIZED) {
            setTimeout(() => {
                this.blur();
                this.hide();
            }, 200);    
        }
    }

    async closeQuery() {
        const responses = await super.triggerListeners('beforeClose');
        if (responses.length === 0 || responses[responses.length - 1] === true) {
            this.close();
        }
    }

    async close() {
        await this.triggerListeners('close');
        this.destroy();
    }

    updateClasses() {
        switch (this.state) {
            case NjWindowStates.WS_MAXIMIZED: 
                this.element.classList.remove('nj-minimized');
                this.element.classList.add('nj-maximized');
                break;
            case NjWindowStates.WS_MINIMIZED: 
                this.element.classList.remove('nj-maximized');
                this.element.classList.add('nj-minimized');
                break;
            case NjWindowStates.WS_NORMAL: 
                this.element.classList.remove('nj-maximized');
                this.element.classList.remove('nj-minimized');
                break;
        }
    }

    focus() {
        this.element.classList.add('focused');
        this.triggerListeners('focus');
    }

    blur() {
        this.element.classList.remove('focused');
        this.triggerListeners('blur');
    }

    destroy() {
        super.destroy();
        this.header.destroy();
        this.element.parentNode.removeChild(this.element);
    }
}


module.exports = {
    NjWindow,
}
},{"./hasEvents":17,"./njWindowHeader":22,"./njWindowHeaderButtonTypes":24,"./njWindowStates":27,"uuid":2}],22:[function(require,module,exports){
const {v4: uuidV4} = require('uuid');
const { HasEvents } = require('./hasEvents');
const { NjWindowHeaderButtons } = require('./njWindowHeaderButtons');
const { WS_MINIMIZED, WS_MAXIMIZED, WS_NORMAL } = require('./njWindowStates');

const NjWindowHeader = class extends HasEvents {
    constructor(parentElement, title, availableHeaderButtons, state) {
        super();
        this.title = title;
        this.id = uuidV4();
        this.element = document.createElement('div');
        this.element.classList.add('nj-window-header');
        this.element.setAttribute('id', this.id);
        this.titleText = document.createTextNode(this.title);
        this.state = state;
        this.element.appendChild(this.titleText);
        this.parentElement = parentElement;
        this.parentElement.appendChild(this.element);
        this.headerButtons = this.createHeaderButtons(availableHeaderButtons);
        this.headerButtons.on('minimize', this.minimize.bind(this));
        this.headerButtons.on('maximize', this.maximize.bind(this));
        this.headerButtons.on('restore', this.restore.bind(this));
        this.headerButtons.on('close', this.close.bind(this));
    }

    setTitle(title) {
        this.title = title;
        this.titleText.nodeValue = this.title;
    }

    createHeaderButtons(availableHeaderButtons) {
        return new NjWindowHeaderButtons(this.element, availableHeaderButtons, this.state);
    }

    minimize() {
        super.triggerListeners('stateChange', WS_MINIMIZED);
    }

    maximize() {
        super.triggerListeners('stateChange', WS_MAXIMIZED);
    }

    restore() {
        super.triggerListeners('stateChange', WS_NORMAL);
    }

    close() {
        super.triggerListeners('close');
    }

    updateState(state) {
        this.headerButtons.updateState(state);
    }

    destroy() {
        super.destroy();
        this.headerButtons.destroy();
        this.element.parentNode.removeChild(this.element);
        this.titleText = null;
    }
}

module.exports = {
    NjWindowHeader
}
},{"./hasEvents":17,"./njWindowHeaderButtons":25,"./njWindowStates":27,"uuid":2}],23:[function(require,module,exports){
const { HasEvents } = require("./hasEvents");
const NJWindowHeaderButtonTypes = require("./njWindowHeaderButtonTypes");

const NjWindowHeaderButton = class extends HasEvents {
    constructor(parentNode, buttonType) {
        super();
        this.element = document.createElement('button');
        this.element.classList.add('nj-window-header-button');
        let buttonTypeClassName = '';
        switch (buttonType) {
            case NJWindowHeaderButtonTypes.NJ_MINIMIZE: 
                buttonTypeClassName = 'nj-minimize';
                break;
            case NJWindowHeaderButtonTypes.NJ_MAXIMIZE: 
                buttonTypeClassName = 'nj-maximize';
                break;
            case NJWindowHeaderButtonTypes.NJ_RESTORE: 
                buttonTypeClassName = 'nj-restore';
                break;
            case NJWindowHeaderButtonTypes.NJ_CLOSE: 
                buttonTypeClassName = 'nj-close';
                break;
        }
        if (!!buttonTypeClassName) {
            this.element.classList.add(buttonTypeClassName);
        }
        parentNode.appendChild(this.element);
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    show() {
        this.element.classList.remove('nj-hidden');
    }

    hide() {
        this.element.classList.add('nj-hidden');
    }

    handleClick() {
        super.triggerListeners('click');
    }

    destroy() {
        super.destroy();
        this.element.parentNode.removeChild(this.element);
    }
}

module.exports = {
    NjWindowHeaderButton,
}
},{"./hasEvents":17,"./njWindowHeaderButtonTypes":24}],24:[function(require,module,exports){
const NJWindowHeaderButtonTypes = {
    NJ_MINIMIZE: 0,
    NJ_MAXIMIZE: 1,
    NJ_CLOSE: 2,
    NJ_RESTORE: 3,
}

module.exports = NJWindowHeaderButtonTypes;

},{}],25:[function(require,module,exports){
const { v4: uuidV4 } = require('uuid');
const { HasEvents } = require("./hasEvents");
const { NjWindowHeaderButton } = require('./njWindowHeaderButton');
const NJWindowHeaderButtonTypes = require('./njWindowHeaderButtonTypes');
const { WS_MAXIMIZED, WS_NORMAL } = require('./njWindowStates');

class NjWindowHeaderButtons extends HasEvents {
    constructor(parentNode, availableButtons, state) {
        super();
        this.id = uuidV4();
        this.state = state;
        this.element = document.createElement('div');
        this.element.setAttribute('id', this.id);
        this.element.classList.add('nj-window-header-buttons');
        parentNode.appendChild(this.element);
        this.availableButtons = availableButtons || [
            NJWindowHeaderButtonTypes.NJ_MINIMIZE, 
            NJWindowHeaderButtonTypes.NJ_MAXIMIZE, 
            NJWindowHeaderButtonTypes.NJ_CLOSE
        ];

        this.buttons = this.createButtons();
    }

    createButtons() {
        const buttons = [];
        if (this.availableButtons.indexOf(NJWindowHeaderButtonTypes.NJ_MINIMIZE) >= 0) {
            const minimizeButton = new NjWindowHeaderButton(this.element, NJWindowHeaderButtonTypes.NJ_MINIMIZE);
            minimizeButton.on('click', this.minimize.bind(this));
            buttons.push(minimizeButton);
        }
        if (this.availableButtons.indexOf(NJWindowHeaderButtonTypes.NJ_MAXIMIZE) >= 0) {
            const maximizeButton = new NjWindowHeaderButton(this.element, NJWindowHeaderButtonTypes.NJ_MAXIMIZE);
            maximizeButton.on('click', this.maximize.bind(this));
            buttons.push(maximizeButton);
            this.maximizeButton = maximizeButton;
            const restoreButton = new NjWindowHeaderButton(this.element, NJWindowHeaderButtonTypes.NJ_RESTORE);
            restoreButton.on('click', this.restore.bind(this));
            buttons.push(restoreButton);
            this.restoreButton = restoreButton;
            if (this.state === WS_MAXIMIZED) {
                this.maximizeButton.hide();
            }
            if (this.state === WS_NORMAL) {
                this.restoreButton.hide();
            }
        }
        if (this.availableButtons.indexOf(NJWindowHeaderButtonTypes.NJ_CLOSE) >= 0) {
            const closeButton = new NjWindowHeaderButton(this.element, NJWindowHeaderButtonTypes.NJ_CLOSE);
            closeButton.on('click', this.close.bind(this));
            buttons.push(closeButton);
        }

        return buttons;
    }

    minimize() {
        super.triggerListeners('minimize');
    }

    maximize() {
        this.maximizeButton.hide();
        this.restoreButton.show();
        super.triggerListeners('maximize');
    }

    restore() {
        this.maximizeButton.show();
        this.restoreButton.hide();
        super.triggerListeners('restore');
    }

    close() {
        super.triggerListeners('close');
    }

    updateState(state) {
        this.state = state;
        switch (this.state) {
            case WS_MAXIMIZED:
                this.maximizeButton.hide();
                this.restoreButton.show();
                break;
            case WS_NORMAL:
                this.maximizeButton.show();
                this.restoreButton.hide();
                break;
        }
    }

    destroy() {
        super.destroy();
        for (let x in this.buttons) {
            this.buttons[x].destroy();
        }
        this.buttons = [];
        this.element.parentNode.removeChild(this.element);
        this.availableButtons = null;
        this.id = null;
    }
}

module.exports = {
    NjWindowHeaderButtons,
}

},{"./hasEvents":17,"./njWindowHeaderButton":23,"./njWindowHeaderButtonTypes":24,"./njWindowStates":27,"uuid":2}],26:[function(require,module,exports){
const { HasEvents } = require("./hasEvents");

const NjWindowManager = class extends HasEvents {
    constructor() {
        super();
        this.windowList = [];
        this.lastPosition = {
            x: 0,
            y: 0,
        };
        this.lastZIndex = 0;
        this.focusedWindow = null;
    }

    add(njWindow) {
        this.windowList.push(njWindow);
        njWindow.on('focus', this.focus.bind(this));
        super.triggerListeners('windowAdded', njWindow);
        njWindow.focus();
    }

    remove(njWindow) {
        this.windowList = this.windowList.filter(w => w !== njWindow).sort((a, b) => a.zIndex > b.zIndex);
        super.triggerListeners('windowRemoved', njWindow);

        if (this.windowList.length === 0) {
            return
        }
        
        this.windowList[this.windowList.length - 1].focus();
    }

    getNextPosition() {
        return {
            x: this.lastPosition.x + 20,
            y: this.lastPosition.y + 20,
        }
    }

    setLastPosition(position) {
        this.lastPosition = {
            x: position.x,
            y: position.y,
        };
    }

    focus(njWindow) {
        if (this.focusedWindow && this.focusedWindow !== njWindow) {
            this.focusedWindow.blur();
        }
        this.focusedWindow = njWindow;
        this.lastZIndex +=1 ;
        this.focusedWindow.setZIndex(this.lastZIndex);
    }

    destroy() {
        super.destroy();
        this.windowList = null;
    }
}

module.exports = {
    NjWindowManager,
}

},{"./hasEvents":17}],27:[function(require,module,exports){
const NjWindowStates = {
    WS_MINIMIZED:  0,
    WS_NORMAL:     1,
    WS_MAXIMIZED:  2,
}

module.exports = NjWindowStates;

},{}]},{},[1])(1)
});
