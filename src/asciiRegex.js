import asciiAliases from "../data/asciiAliases";
import flatten from "lodash.flatten";

import { allowedAliasCharacters } from "./aliasRegex";
import { escapeStringToBeUsedInRegExp } from "./utils";

const names = flatten(
  Object.keys(asciiAliases).map(name => {
    return asciiAliases[name].map(escapeStringToBeUsedInRegExp);
  })
).join("|");

const edgeCases = "https?\\S*";

// Regex reads as following:
//
// Match ascii aliases with optional edge cases before it (to know if parsing is needed)
// Additionally, after the ascii alias:
//    - Forbid edge cases
//    - Allow characters included in normal aliases (to check later cases like :s and :smile:)
export default function() {
  return new RegExp(
    `(${edgeCases})?(${names})([${allowedAliasCharacters}]*:)?`,
    "g"
  );
}
