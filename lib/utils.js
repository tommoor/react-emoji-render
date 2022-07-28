"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeStringToBeUsedInRegExp = escapeStringToBeUsedInRegExp;

function escapeStringToBeUsedInRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}