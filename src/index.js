import React from "react";
import PropTypes from "prop-types";
import Emoji, { optionsType } from "./renderer";

export { toArray } from "./renderer";

let protocol = "https";

if (typeof location !== "undefined" && location.protocol === "http:") {
  protocol = "http";
}

export default Emoji;

export function Twemoji({ svg, options, ...rest }) {
  const size = svg ? "" : "72x72";
  const ext = svg ? "svg" : "png";

  options = {
    protocol,
    baseUrl: `//twemoji.maxcdn.com/2/${svg ? "svg/" : ""}`,
    size,
    ext,
    ...options,
  };

  return <Emoji options={options} {...rest} />;
}

Twemoji.propTypes = {
  text: PropTypes.string,
  options: optionsType,
  svg: PropTypes.bool,
};

export function Emojione({ svg, options, ...rest }) {
  const ext = svg ? "svg" : "png";

  options = {
    protocol,
    baseUrl: `//cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/${ext}/`,
    size: "",
    ext,
    emojione: true,
    ...options,
  };

  return <Emoji options={options} {...rest} />;
}

Emojione.propTypes = {
  text: PropTypes.string,
  options: optionsType,
  svg: PropTypes.bool,
};

export function EmojioneV4({ size, options, ...rest }) {
  const ext = "png";

  options = {
    protocol,
    baseUrl: `//cdn.jsdelivr.net/emojione/assets/4.0/${ext}/`,
    size,
    ext,
    emojione: true,
    ...options,
  };

  return <Emoji options={options} {...rest} />;
}

EmojioneV4.propTypes = {
  text: PropTypes.string,
  options: optionsType,
  size: PropTypes.oneOf([32, 64, 128]),
};
EmojioneV4.defaultProps = {
  size: 64,
};

export function GitHub({ options, ...rest }) {
  options = {
    protocol,
    baseUrl: `//github.githubassets.com/images/icons/emoji/unicode/`,
    customUrl: `//github.githubassets.com/images/icons/emoji/`,
    ext: "png",
    customAliases: ["electron"],
    ...options,
  };
  return <Emoji options={options} {...rest} />;
}

GitHub.propTypes = {
  text: PropTypes.string,
  options: optionsType,
};
