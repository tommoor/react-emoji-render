import asciiAliases from "../data/asciiAliases";
import flatten from "lodash.flatten";

import { escapeStringToBeUsedInRegExp } from "./utils";

const allowedAliasCharacters = "\\w\\-\\_\\+\\*\\(\\)\\!#&åô’çéãí“”,";
const startOfURL = "https?\\S*";

const names = flatten(
  Object.keys(asciiAliases).map(name => {
    return asciiAliases[name].map(escapeStringToBeUsedInRegExp);
  })
).sort().reverse().join("|"); // reverse sort for most specific match

const edgeCases = [startOfURL].join("|");

function getAliasesRegex() {
  return new RegExp(
    // edge cases will be skipped
    // match both (and later distinguish between)
    // * ascii aliases like :o
    // * full emoji like :open_mouth:
    `(${edgeCases})?(${names}|:)([${allowedAliasCharacters}]*:)?`,
    "g"
  );
}

export default getAliasesRegex;
