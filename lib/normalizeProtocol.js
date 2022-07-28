"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = normalizeProtocol;

// ensure protocol has trailing : if missing
function normalizeProtocol(protocol) {
  if (protocol && !protocol.endsWith(":")) return protocol + ":";
  return protocol;
}