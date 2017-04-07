import React, { PropTypes } from "react";
import isString from "lodash.isstring";
import replace from "string-replace-to-array";
import emojiRegex from "emoji-regex";
import asciiRegex from "./asciiRegex";
import normalizeProtocol from "./normalizeProtocol";
import unicodeToCodepoint from "./unicodeToCodepoint";
import aliases from "../data/aliases";
import asciiAliases from "../data/asciiAliases";
import defaultOptions from "./options";

const asciiAliasesRegex = asciiRegex();
const unicodeEmojiRegex = emojiRegex();
const aliasesRegex = /:([\w\-\_]+):/g;

// using em's we can ensure size matches surrounding font
const style = {
  width: "1em",
  height: "1em",
  margin: "0 .05em 0 .1em",
  verticalAlign: "-0.1em"
};

export default function Emoji({ children, options, ...rest }) {
  options = { ...defaultOptions, ...options };
  const protocol = normalizeProtocol(options.protocol);
  const onlyEmoji = false; // TODO

  function replaceUnicodeEmoji(match, i) {
    const src = protocol +
      options.baseUrl +
      options.size +
      (options.size ? "/" : "") +
      unicodeToCodepoint(match) +
      options.ext;

    return (
      <img
        key={i}
        src={src}
        style={style}
        className={options.className}
        {...options.props}
      />
    );
  }

  function replaceAsciiAliases(...match) {
    const asciiAliasKeys = Object.keys(asciiAliases);
    for (let i in asciiAliasKeys) {
      const alias = asciiAliasKeys[i];
      const data = asciiAliases[alias];
      if (data.includes(match[2])) {
        return `:${alias}:`;
      }
    }
    return match;
  }

  function replaceAliases(...match) {
    return aliases[match[1]] || match[0];
  }

  return (
    <span {...rest}>
      {replace(
        children
          .replace(asciiAliasesRegex, replaceAsciiAliases)
          .replace(aliasesRegex, replaceAliases),
        unicodeEmojiRegex,
        replaceUnicodeEmoji
      )}
    </span>
  );
}

Emoji.propTypes = {
  children: PropTypes.string,
  props: PropTypes.object,
  options: PropTypes.shape({
    baseUrl: PropTypes.string,
    size: PropTypes.string,
    ext: PropTypes.string,
    className: PropTypes.string
  })
};
