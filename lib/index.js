"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Emojione = Emojione;
exports.EmojioneV4 = EmojioneV4;
exports.Twemoji = Twemoji;
exports["default"] = void 0;
Object.defineProperty(exports, "toArray", {
  enumerable: true,
  get: function get() {
    return _renderer.toArray;
  }
});

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _renderer = _interopRequireWildcard(require("./renderer"));

var _excluded = ["svg", "options"],
    _excluded2 = ["svg", "options"],
    _excluded3 = ["size", "options"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var protocol = "https";

if (typeof location !== "undefined" && location.protocol === "http:") {
  protocol = "http";
}

var _default = _renderer["default"];
exports["default"] = _default;

function Twemoji(_ref) {
  var svg = _ref.svg,
      options = _ref.options,
      rest = _objectWithoutProperties(_ref, _excluded);

  var size = svg ? "" : "72x72";
  var ext = svg ? "svg" : "png";
  options = _objectSpread({
    protocol: protocol,
    baseUrl: "//twemoji.maxcdn.com/2/".concat(svg ? "svg/" : ""),
    size: size,
    ext: ext
  }, options);
  return /*#__PURE__*/_react["default"].createElement(_renderer["default"], _extends({
    options: options
  }, rest));
}

Twemoji.propTypes = {
  text: _propTypes["default"].string,
  options: _propTypes["default"].object,
  svg: _propTypes["default"].bool
};

function Emojione(_ref2) {
  var svg = _ref2.svg,
      options = _ref2.options,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  var ext = svg ? "svg" : "png";
  options = _objectSpread({
    protocol: protocol,
    baseUrl: "//cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/".concat(ext, "/"),
    size: "",
    ext: ext,
    emojione: true
  }, options);
  return /*#__PURE__*/_react["default"].createElement(_renderer["default"], _extends({
    options: options
  }, rest));
}

Emojione.propTypes = {
  text: _propTypes["default"].string,
  options: _propTypes["default"].object,
  svg: _propTypes["default"].bool
};

function EmojioneV4(_ref3) {
  var size = _ref3.size,
      options = _ref3.options,
      rest = _objectWithoutProperties(_ref3, _excluded3);

  var ext = "png";
  options = _objectSpread({
    protocol: protocol,
    baseUrl: "//cdn.jsdelivr.net/emojione/assets/4.0/".concat(ext, "/"),
    size: size,
    ext: ext,
    emojione: true
  }, options);
  return /*#__PURE__*/_react["default"].createElement(_renderer["default"], _extends({
    options: options
  }, rest));
}

EmojioneV4.propTypes = {
  text: _propTypes["default"].string,
  options: _propTypes["default"].object,
  size: _propTypes["default"].oneOf([32, 64, 128])
};
EmojioneV4.defaultProps = {
  size: 64
};