import React from "react";
import isString from "lodash.isstring";
import flatten from "lodash.flatten";
import replace from "string-replace-to-array";
import emojiRegex from "emoji-regex";
import normalizeProtocol from "./normalizeProtocol";
import unicodeToCodepoint from "./unicodeToCodepoint";
import aliases from "../data/aliases";

const unicodeEmojiRegex = emojiRegex();
const aliasesRegex = /:([\w\-\_]+):/g;
const defaultOptions = {
  className: undefined,
  protocol: "https",
  baseUrl: "//twemoji.maxcdn.com/2/",
  size: "72x72",
  ext: ".png",
  props: null
};

export default function Emoji({ children, options, ...rest }) {
  options = Object.assign({}, defaultOptions, options);
  const protocol = normalizeProtocol(options.protocol);
  const onlyEmoji = false; // TODO

  function replaceUnicodeEmoji(match, i) {
    const src = protocol +
      options.baseUrl +
      options.size +
      "/" +
      unicodeToCodepoint(match) +
      options.ext;

    return (
      <img key={i} src={src} className={options.className} {...options.props} />
    );
  }

  function replaceAliases(match, alias, i) {
    return aliases[alias] || match;
  }

  return (
    <span {...rest}>
      {replace(
        children.replace(aliasesRegex, replaceAliases),
        unicodeEmojiRegex,
        replaceUnicodeEmoji
      )}
    </span>
  );
}
