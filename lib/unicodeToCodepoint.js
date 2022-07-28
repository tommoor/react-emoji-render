"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unicodeToCodepoint;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// avoid runtime RegExp creation for not so smart,
// not JIT based, and old browsers / engines
// https://github.com/twitter/twemoji/blob/gh-pages/2/twemoji.js#L232
var UFE0Fg = /\uFE0F/g; // \u200D is a zero-width joiner character
// https://github.com/twitter/twemoji/blob/gh-pages/2/twemoji.js#L235

var U200D = String.fromCharCode(0x200d); // convert utf16 into code points

function toCodePoint(input) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  var codePoints = [];

  var _iterator = _createForOfIteratorHelper(input),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var codePoint = _step.value;
      codePoints.push(codePoint.codePointAt(0).toString(16));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return codePoints.join(separator);
}

function unicodeToCodepoint(input) {
  return toCodePoint(input.indexOf(U200D) < 0 ? input.replace(UFE0Fg, "") : input);
}