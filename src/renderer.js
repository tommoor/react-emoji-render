import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import replace from "string-replace-to-array";
import emojiRegex from "emoji-regex";
import asciiRegex from "./asciiRegex";
import normalizeProtocol from "./normalizeProtocol";
import unicodeToCodepoint from "./unicodeToCodepoint";
import aliases from "../data/aliases";
import asciiAliases from "../data/asciiAliases";

const asciiAliasesRegex = asciiRegex();
const unicodeEmojiRegex = emojiRegex();
const aliasesRegex = /:([\w\-\_\+]+):/g;

// using em's we can ensure size matches surrounding font
const style = {
  width: "1em",
  height: "1em",
  margin: "0 .05em 0 .1em",
  verticalAlign: "-0.1em"
};

export function toArray(text, options = {}) {
  const protocol = normalizeProtocol(options.protocol);

  function replaceUnicodeEmoji(match, i) {
    if (!options.baseUrl) {
      return (
        <span key={i} style={style} className={options.className}>{match}</span>
      );
    }

    const separator = options.size ? "/" : "";
    const codepoint = unicodeToCodepoint(match);
    const src = `${protocol}${options.baseUrl}${options.size}${separator}${codepoint}.${options.ext}`;

    return (
      <img
        key={i}
        alt={match}
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
      const aliasFound = match[2];

      if (data.includes(aliasFound)) {
        const isEdgeCase = match[1];
        const fullMatchContent = match[0].slice(1, -1); // remove ":" at the beginning and end
        const validAsciiAlias = !aliases[fullMatchContent]; // ":" + fullMatchContent + ":" alias doesn't exist

        if (!isEdgeCase && validAsciiAlias) {
          return `:${alias}:`;
        }

        // return the original word to replace its value in aliasesRegex
        return match[0];
      }
    }
  }

  function replaceAliases(...match) {
    return aliases[match[1]] || match[0];
  }

  return replace(
    text
      .replace(asciiAliasesRegex, replaceAsciiAliases)
      .replace(aliasesRegex, replaceAliases),
    unicodeEmojiRegex,
    replaceUnicodeEmoji
  );
}

export default function Emoji(
  { text, onlyEmojiClassName, options = {}, className, ...rest }
) {
  function isOnlyEmoji(output) {
    if (output.length > 3) return false;

    for (let i = 0; i < output.length; i++) {
      if (typeof output[i] === "string") return false;
    }

    return true;
  }

  const output = toArray(text, options);
  const classes = classnames(className, {
    [onlyEmojiClassName]: isOnlyEmoji(output)
  });

  return (
    <span {...rest} className={classes}>
      {output}
    </span>
  );
}

Emoji.propTypes = {
  text: PropTypes.string,
  props: PropTypes.object,
  onlyEmojiClassName: PropTypes.string,
  options: PropTypes.shape({
    baseUrl: PropTypes.string,
    size: PropTypes.string,
    ext: PropTypes.string,
    className: PropTypes.string
  })
};
