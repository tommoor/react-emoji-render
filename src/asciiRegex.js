import asciiAliases from "../data/asciiAliases";
import flatten from "lodash.flatten";

function quoteRE(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

const names = flatten(
  Object.keys(asciiAliases).map(name =>
    asciiAliases[name].map(alias => quoteRE(alias)))
).join("|");

// Emojis' unicode ranges from
// https://stackoverflow.com/questions/24840667/what-is-the-regex-to-extract-all-the-emojis-from-a-string
export default function() {
  return new RegExp(`(${names})([^\\s(${names})\\uD83C-\\uDBFF\\uDC00-\\uDFFF]*)`, "g");
}
