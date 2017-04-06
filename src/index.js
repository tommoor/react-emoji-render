import React from "react";
import replace from "string-replace-to-array";
import emojiRegex from "emoji-regex";
import unicodeToCodepoint from "./unicodeToCodepoint";

const regex = emojiRegex();
const defaultOptions = {
  protocol: "https",
  baseUrl: "//twemoji.maxcdn.com/2/",
  size: "72x72",
  ext: ".png",
  props: null
};

function normalizeProtocol(protocol) {
  if (protocol && !protocol.endsWith(":")) return protocol + ":";
  return protocol;
}

export default function Emoji({ children, className, options }) {
  options = Object.assign({}, defaultOptions, options);
  const protocol = normalizeProtocol(options.protocol);

  return (
    <span className={className}>
      {replace(children, regex, (match, i) => {
        const src = protocol +
          options.baseUrl +
          options.size +
          "/" +
          unicodeToCodepoint(match) +
          options.ext;

        console.log("src", src);
        return <img key={i} src={src} />;
      })}
    </span>
  );
}
