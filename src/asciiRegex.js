import asciiAliases from "../data/asciiAliases";
import flatten from "lodash.flatten";

function quoteRE(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

const names = flatten(
  Object.keys(asciiAliases).map(name =>
    asciiAliases[name].map(alias => quoteRE(alias)))
).join("|");

const firstLettersAliases = flatten(
  Object.keys(asciiAliases).map(name =>
    asciiAliases[name].map(alias => quoteRE(alias.slice(0, 1))))
).join("");

const preEdgeCases = ["http", "https"].join("|");

// Emojis' unicode ranges from
// https://stackoverflow.com/questions/24840667/what-is-the-regex-to-extract-all-the-emojis-from-a-string
export default function() {
  return new RegExp(
    `(${preEdgeCases})?(${names})([^\\s\\uD83C-\\uDBFF\\uDC00-\\uDFFF${firstLettersAliases}]*)`,
    "g"
  );
}
