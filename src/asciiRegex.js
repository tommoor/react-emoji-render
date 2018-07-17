import asciiAliases from "../data/asciiAliases";
import flatten from "lodash.flatten";

function quoteRE(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

const names = flatten(
  Object.keys(asciiAliases).map(name =>
    asciiAliases[name].map(alias => quoteRE(alias)))
).join("|");

export default function() {
  return new RegExp(`(${names})([^\\s:]*)`, "g");
}
