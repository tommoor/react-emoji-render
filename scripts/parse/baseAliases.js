const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const INPUT_FILE_PATH = path.resolve("data", "raw", "baseAliases.json");
const OUTPUT_FILE_PATH = path.resolve("data", "aliases", "baseAliases.json");

const baseAliases = JSON.parse(
  fs.readFileSync(INPUT_FILE_PATH, {
    encoding: "utf-8",
  })
);

const baseAliasesParsed = {};
const emojis = Object.keys(baseAliases);
const uniqueEmojis = [...new Set(emojis)];
uniqueEmojis.forEach(emoji => {
  baseAliasesParsed[emoji] = [baseAliases[emoji].name];
});

const content = JSON.stringify(baseAliasesParsed);
const formattedContent = prettier.format(content, {
  parser: "json-stringify",
});

fs.writeFile(OUTPUT_FILE_PATH, formattedContent, function(error) {
  if (error) {
    return console.log(error);
  }

  console.log("`baseAliases.json` file generated =>", OUTPUT_FILE_PATH);
});
