import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import replace from "string-replace-to-array";
import emojiRegex from "emoji-regex";

import aliasRegex from "./aliasRegex";

import normalizeProtocol from "./normalizeProtocol";
import unicodeToCodepoint from "./unicodeToCodepoint";

import aliases from "../data/aliases";
import asciiAliases from "../data/asciiAliases";

const unicodeEmojiRegex = emojiRegex();

// using em's we can ensure size matches surrounding font
const style = {
  width: "1em",
  height: "1em",
  margin: "0 .05em 0 .1em",
  verticalAlign: "-0.1em",
};

const asciiToAlias = { ":": ":" };

for (const alias of Object.keys(asciiAliases)) {
  for (const ascii of asciiAliases[alias]) {
    asciiToAlias[ascii] = aliases[alias];
  }
}

export function toArray(text, options = {}) {
  const protocol = normalizeProtocol(options.protocol);

  function replaceUnicodeEmoji(match, i) {
    const isUnicode = !match.startsWith(":");
    if (!options.baseUrl || (options.forceUnicode && isUnicode)) {
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
    const src = `${protocol}${
      isUnicode ? options.baseUrl : options.customUrl
    }${options.size || ""}${separator}${
      // slice removes colons from custom emoji alias e.g :electron:->electron
      isUnicode ? codepoint : match.slice(1, -1)
    }.${options.ext}`;

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

  function replaceAliases(text, options = {}) {
    const regex = aliasRegex();
    const textWithEmoji = [];
    let match,
      pos = 0;

    while ((match = regex.exec(text))) {
      const [edgeCase, asciiAlias, fullEmoji] = match.slice(1, 4);
      // possible full emoji like :open_mouth:
      const emoji = aliases[(asciiAlias + fullEmoji).slice(1, -1)];
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
    }

    // text after last match (if any)
    textWithEmoji.push(text.slice(pos));
    return textWithEmoji.join("");
  }

  const customAliases = options.customAliases || [];
  // adds custom aliases to the regex to detect. e.g GitHub's :electron: which isn't part of the unicode standard.
  const modifiedRegex =
    customAliases.length > 0
      ? new RegExp(
          // slice here removes the /.../g on regex tags
          `${unicodeEmojiRegex.toString().slice(1, -2)}|:(${customAliases.join(
            "|"
          )}):`,
          "g"
        )
      : unicodeEmojiRegex;
  return replace(
    replaceAliases(text, options),
    modifiedRegex,
    replaceUnicodeEmoji
  );
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
export const optionsType = PropTypes.shape({
  baseUrl: PropTypes.string,
  customUrl: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ext: PropTypes.string,
  // image props
  props: PropTypes.object,
  className: PropTypes.string,
  customAliases: PropTypes.arrayOf(PropTypes.string),
  forceUnicode: PropTypes.bool,
});
Emoji.propTypes = {
  text: PropTypes.string,
  onlyEmojiClassName: PropTypes.string,
  options: optionsType,
};
