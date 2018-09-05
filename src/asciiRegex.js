import asciiAliases from "../data/asciiAliases";
import flatten from "lodash.flatten";

function quoteRE(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

const names = flatten(
  Object.keys(asciiAliases).map(name =>
    asciiAliases[name].map(alias => quoteRE(alias)))
).join("|");

const edgeCases = ["http", "https"].join("|");

// Regex reads as following:
//
// Match ascii aliases without edge cases before it.
// Additionally, after the ascii:
//    - Forbid edge cases
//    - Allow every kind of character that could be included in a normal alias to check later cases like :s and :smile:
export default function() {
  return new RegExp(
    `(${edgeCases})?(${names})(((?!(${edgeCases}))[a-z0-9_-]+):)?`,
    "g"
  );
}
