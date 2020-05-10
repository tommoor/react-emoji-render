import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import replace from "string-replace-to-array";
import emojiRegex from "emoji-regex";

import asciiRegex from "./asciiRegex";
import aliasRegex from "./aliasRegex";

import normalizeProtocol from "./normalizeProtocol";
import unicodeToCodepoint from "./unicodeToCodepoint";

import aliases from "../data/aliases";
import asciiAliases from "../data/asciiAliases";

const asciiAliasesRegex = asciiRegex();
const aliasesRegex = aliasRegex();
const unicodeEmojiRegex = emojiRegex();

// using em's we can ensure size matches surrounding font
const style = {
  width: "1em",
  height: "1em",
  margin: "0 .05em 0 .1em",
  verticalAlign: "-0.1em",
};

export function toArray(text, options = {}) {
  const protocol = normalizeProtocol(options.protocol);

  function replaceUnicodeEmoji(match, i) {
    if (!options.baseUrl) {
      return (
        <span key={i} style={style} className={options.className}>
          {match}
        </span>
      );
    }

    let codepoint = unicodeToCodepoint(match, removeHelperCharacters);

    // if Emojione we don't want to add helper characters in the URL
    const removeHelperCharacters = options.emojione;
    if (removeHelperCharacters) {
      codepoint = codepoint.replace(/-200d/g, "").replace(/-fe0f/g, "");
    }

    const separator = options.size ? "/" : "";
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

    const fullMatch = match[0];
    const edgeCase = match[1];
    const asciiAlias = match[2];
    const maybeBiggerAliasCharacters = match[3];

    for (let i in asciiAliasKeys) {
      const alias = asciiAliasKeys[i];
      const data = asciiAliases[alias];

      if (data.includes(asciiAlias)) {
        const isEdgeCase = edgeCase !== undefined;

        if (isEdgeCase) {
          return fullMatch; // do nothing
        }

        const isMaybePartOfBiggerAlias =
          maybeBiggerAliasCharacters !== undefined;

        if (!isMaybePartOfBiggerAlias) {
          return aliases[alias]; // replace with unicode
        } else if (fullMatch[0] === ":") {
          const fullMatchContent = fullMatch.slice(1, -1); // remove ":" at the beginning and end
          const isPartOfBiggerAlias = aliases[fullMatchContent] !== undefined; // ":" + fullMatchContent + ":" alias doesn't exist

          if (isPartOfBiggerAlias) {
            return fullMatch; // do nothing
          }
        }

        return `${aliases[alias]}${maybeBiggerAliasCharacters}`; // also return matched characters afterwards to handle them in next iteration
      }
    }
  }

  function replaceAliases(...match) {
    const fullMatch = match[0];
    const alias = match[1];

    const aliasEmoji = aliases[alias];

    return aliasEmoji || fullMatch;
  }

  // We need to execute several times `string.replace` for cases for such as ":):)"
  // As we are forced to match ":):" to check if it's a normal alias, the second colon is consumed and cannot match again
  function replaceAllAsciiAliases(textWithAsciiAliases) {
    let previousTextWithoutAsciiAliases = null;
    let textWithoutAsciiAliases = textWithAsciiAliases;

    while (previousTextWithoutAsciiAliases !== textWithoutAsciiAliases) {
      previousTextWithoutAsciiAliases = textWithoutAsciiAliases;
      textWithoutAsciiAliases = textWithoutAsciiAliases.replace(
        asciiAliasesRegex,
        replaceAsciiAliases
      );
    }

    return textWithoutAsciiAliases;
  }

  let replacedText = text;
  replacedText = replacedText.replace(aliasesRegex, replaceAliases);
  replacedText = replaceAllAsciiAliases(replacedText);
  replacedText = replacedText.replace(aliasesRegex, replaceAliases);
  return replace(replacedText, unicodeEmojiRegex, replaceUnicodeEmoji);
}

export default function Emoji({
  text,
  onlyEmojiClassName,
  options = {},
  className,
  ...rest
}) {
  function isOnlyEmoji(output) {
    if (output.length > 3) return false;

    for (let i = 0; i < output.length; i++) {
      if (typeof output[i] === "string") return false;
    }

    return true;
  }

  const output = toArray(text, options);
  const classes = classnames(className, {
    [onlyEmojiClassName]: isOnlyEmoji(output),
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
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ext: PropTypes.string,
    className: PropTypes.string,
  }),
};
