import React from "react";
import PropTypes from "prop-types";
import Emoji from "./renderer";
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
  options: PropTypes.object,
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
  options: PropTypes.object,
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
  options: PropTypes.object,
  size: PropTypes.oneOf([32, 64, 128]),
};
EmojioneV4.defaultProps = {
  size: 64,
};
