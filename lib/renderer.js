"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Emoji;
exports.toArray = toArray;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _stringReplaceToArray = _interopRequireDefault(require("string-replace-to-array"));

var _emojiRegex = _interopRequireDefault(require("emoji-regex"));

var _aliasRegex = _interopRequireDefault(require("./aliasRegex"));

var _normalizeProtocol = _interopRequireDefault(require("./normalizeProtocol"));

var _unicodeToCodepoint = _interopRequireDefault(require("./unicodeToCodepoint"));

var _aliases = _interopRequireDefault(require("../data/aliases"));

var _asciiAliases = _interopRequireDefault(require("../data/asciiAliases"));

var _excluded = ["text", "onlyEmojiClassName", "options", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var unicodeEmojiRegex = (0, _emojiRegex["default"])(); // using em's we can ensure size matches surrounding font

var style = {
  width: "1em",
  height: "1em",
  margin: "0 .05em 0 .1em",
  verticalAlign: "-0.1em"
};
var asciiToAlias = {
  ":": ":"
};

for (var _i = 0, _Object$keys = Object.keys(_asciiAliases["default"]); _i < _Object$keys.length; _i++) {
  var alias = _Object$keys[_i];

  var _iterator = _createForOfIteratorHelper(_asciiAliases["default"][alias]),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ascii = _step.value;
      asciiToAlias[ascii] = _aliases["default"][alias];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function toArray(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var protocol = (0, _normalizeProtocol["default"])(options.protocol);

  function replaceUnicodeEmoji(match, i) {
    if (!options.baseUrl) {
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: i,
        style: style,
        className: options.className
      }, match);
    }

    var codepoint = (0, _unicodeToCodepoint["default"])(match, removeHelperCharacters); // if Emojione we don't want to add helper characters in the URL

    var removeHelperCharacters = options.emojione;

    if (removeHelperCharacters) {
      codepoint = codepoint.replace(/-200d/g, "").replace(/-fe0f/g, "");
    }

    var separator = options.size ? "/" : "";
    var src = "".concat(protocol).concat(options.baseUrl).concat(options.size).concat(separator).concat(codepoint, ".").concat(options.ext);
    return /*#__PURE__*/_react["default"].createElement("img", _extends({
      key: i,
      alt: match,
      src: src,
      style: style,
      className: options.className
    }, options.props));
  }

  function replaceAliases(text) {
    var regex = (0, _aliasRegex["default"])();
    var textWithEmoji = [];
    var match,
        pos = 0;

    while (match = regex.exec(text)) {
      var _match$slice = match.slice(1, 4),
          _match$slice2 = _slicedToArray(_match$slice, 3),
          edgeCase = _match$slice2[0],
          asciiAlias = _match$slice2[1],
          fullEmoji = _match$slice2[2]; // possible full emoji like :open_mouth:


      var emoji = _aliases["default"][(asciiAlias + fullEmoji).slice(1, -1)];

      if (match.index > pos) {
        // text between matches
        textWithEmoji.push(text.slice(pos, match.index));
      }

      if (edgeCase) {
        // verbatim matched text
        textWithEmoji.push(match[0]);
      } else if (asciiAlias[0] === ":" && fullEmoji && emoji) {
        // full emoji
        textWithEmoji.push(emoji);
      } else {
        // ascii alias or ":"
        textWithEmoji.push(asciiToAlias[asciiAlias]);

        if (fullEmoji) {
          // false positive, "go back" and don't skip that substring
          regex.lastIndex -= fullEmoji.length;
        }
      }

      pos = regex.lastIndex;
    } // text after last match (if any)


    textWithEmoji.push(text.slice(pos));
    return textWithEmoji.join("");
  }

  return (0, _stringReplaceToArray["default"])(replaceAliases(text), unicodeEmojiRegex, replaceUnicodeEmoji);
}

function Emoji(_ref) {
  var text = _ref.text,
      onlyEmojiClassName = _ref.onlyEmojiClassName,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded);

  function isOnlyEmoji(output) {
    if (output.length > 3) return false;

    for (var i = 0; i < output.length; i++) {
      if (typeof output[i] === "string") return false;
    }

    return true;
  }

  var output = toArray(text, options);
  var classes = (0, _classnames2["default"])(className, _defineProperty({}, onlyEmojiClassName, isOnlyEmoji(output)));
  return /*#__PURE__*/_react["default"].createElement("span", _extends({}, rest, {
    className: classes
  }), output);
}

Emoji.propTypes = {
  text: _propTypes["default"].string,
  props: _propTypes["default"].object,
  onlyEmojiClassName: _propTypes["default"].string,
  options: _propTypes["default"].shape({
    baseUrl: _propTypes["default"].string,
    size: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    ext: _propTypes["default"].string,
    className: _propTypes["default"].string
  })
};