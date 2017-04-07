import React from "react";
import Emoji from "./renderer";
import { twemoji, emojione } from "./options";

export default Emoji;

export function Twemoji({ children, options, ...rest }) {
  options = {
    ...options,
    ...twemoji
  };
  return <Emoji options={options} {...rest}>{children}</Emoji>;
}

export function Emojione({ children, options, ...rest }) {
  options = {
    ...options,
    ...emojione
  };
  return <Emoji options={options} {...rest}>{children}</Emoji>;
}
