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
import {
  returnNonStringStrippedElements,
  stripNonStringElements,
} from "./utils";

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

  function replaceAliases(text) {
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

  return replace(replaceAliases(text), unicodeEmojiRegex, replaceUnicodeEmoji);
}

export default function Emoji({
  text,
  onlyEmojiClassName,
  options = {},
  className,
  children,
  ...rest
}) {
  let nonStringElements = [];

  console.log("children:", children);
  if (!!children && Array.isArray(children)) {
    const [strippedChildren, elements] = stripNonStringElements(children);
    text = strippedChildren;
    nonStringElements = elements;
  } else if (!!children && typeof children === "string") {
    text = children;
  } else if (!!children) {
    //children must then be an object (react component or html element)
    const [strippedChildren, elements] = stripNonStringElements([children]);
    text = strippedChildren;
    nonStringElements = elements;
  } else if (!text) {
    throw new Error(
      "react-emoji-render: either children or text prop must be provided"
    );
  }

  function isOnlyEmoji(output) {
    if (output.length > 3) return false;

    for (let i = 0; i < output.length; i++) {
      if (typeof output[i] === "string") return false;
    }

    return true;
  }

  const output = returnNonStringStrippedElements(
    toArray(text, options),
    nonStringElements
  );

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
