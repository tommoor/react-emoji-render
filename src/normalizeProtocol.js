// ensure protocol has trailing : if missing
export default function normalizeProtocol(protocol) {
  if (protocol && !protocol.endsWith(":")) return protocol + ":";
  return protocol;
}
