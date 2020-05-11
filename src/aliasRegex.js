import asciiAliases from "../data/asciiAliases";
import flatten from "lodash.flatten";

import { escapeStringToBeUsedInRegExp } from "./utils";

const allowedAliasCharacters = "\\w\\-\\_\\+\\*\\(\\)\\!#&åô’çéãí“”,";
const startOfURL = "https?\\S*";

const names = flatten(
  Object.keys(asciiAliases).map(name => {
    return asciiAliases[name].map(escapeStringToBeUsedInRegExp);
  })
).join("|");

const edgeCases = [startOfURL].join("|");

function getAliasesRegex() {
  return new RegExp(
    `(${edgeCases})?(${names}|:)([${allowedAliasCharacters}]*:)?`,
    "g"
  );
}

export default getAliasesRegex;
