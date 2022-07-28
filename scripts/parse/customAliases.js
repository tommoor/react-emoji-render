const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const INPUT_FILE_PATH = path.resolve("data", "raw", "customAliases.json");
const OUTPUT_FILE_PATH = path.resolve("data", "aliases", "customAliases.json");

const customAliases = JSON.parse(
  fs.readFileSync(INPUT_FILE_PATH, {
    encoding: "utf-8",
  })
);

const uniqueEmojis = [...new Set(Object.values(customAliases))];

const customAliasesParsed = {};
const aliases = Object.keys(customAliases);
uniqueEmojis.forEach((emoji) => {
  customAliasesParsed[emoji] = aliases.filter(
    (alias) => customAliases[alias] === emoji
  );
});

const content = JSON.stringify(customAliasesParsed);
const formattedContent = prettier.format(content, {
  parser: "json-stringify",
});

fs.writeFile(OUTPUT_FILE_PATH, formattedContent, function (error) {
  if (error) {
    return console.log(error);
  }

  console.log("`customAliases.json` file generated =>", OUTPUT_FILE_PATH);
});
