const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const baseAliases = require("../../data/aliases/baseAliases.json");
const gemojiAliases = require("../../data/aliases/gemojiAliases.json");
const customAliases = require("../../data/aliases/customAliases.json");

const OUTPUT_FILE_PATH = path.resolve("data", "aliases.js");

const mergedAliases = {};

function addAliases(aliases) {
  Object.entries(aliases).forEach(([emoji, aliases]) => {
    aliases.forEach((alias) => {
      mergedAliases[alias] = emoji;
    });
  });
}

addAliases(baseAliases);
addAliases(gemojiAliases);
addAliases(customAliases);

const preGlue = "module.exports = ";
const postGlue = ";\n";

const content = `${preGlue}${JSON.stringify(mergedAliases)}${postGlue}`;
const formattedContent = prettier.format(content, { parser: "babel" });

fs.writeFile(OUTPUT_FILE_PATH, formattedContent, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log("`aliases.js` file generated =>", OUTPUT_FILE_PATH);
});
