"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _asciiAliases = _interopRequireDefault(require("../data/asciiAliases"));

var _lodash = _interopRequireDefault(require("lodash.flatten"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var allowedAliasCharacters = "\\w\\-\\_\\+\\*\\(\\)\\!#&åô’çéãí“”,";
var startOfURL = "https?\\S*";
var names = (0, _lodash["default"])(Object.keys(_asciiAliases["default"]).map(function (name) {
  return _asciiAliases["default"][name].map(_utils.escapeStringToBeUsedInRegExp);
})).sort().reverse().join("|"); // reverse sort for most specific match

var edgeCases = [startOfURL].join("|");

function getAliasesRegex() {
  return new RegExp( // edge cases will be skipped
  // match both (and later distinguish between)
  // * ascii aliases like :o
  // * full emoji like :open_mouth:
  "(".concat(edgeCases, ")?(").concat(names, "|:)([").concat(allowedAliasCharacters, "]*:)?"), "g");
}

var _default = getAliasesRegex;
exports["default"] = _default;