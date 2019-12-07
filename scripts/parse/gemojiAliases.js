const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const INPUT_FILE_PATH = path.resolve("data", "raw", "gemojiAliases.json");
const OUTPUT_FILE_PATH = path.resolve("data", "aliases", "gemojiAliases.json");

const gemojiAliases = JSON.parse(
  fs.readFileSync(INPUT_FILE_PATH, {
    encoding: "utf-8",
  })
);

const gemojiAliasesParsed = {};
gemojiAliases.forEach(emojiData => {
  gemojiAliasesParsed[emojiData.emoji] = emojiData.aliases;
});

const content = JSON.stringify(gemojiAliasesParsed);
const formattedContent = prettier.format(content, {
  parser: "json-stringify",
});

fs.writeFile(OUTPUT_FILE_PATH, formattedContent, function(error) {
  if (error) {
    return console.log(error);
  }

  console.log("`gemojiAliases.json` file generated =>", OUTPUT_FILE_PATH);
});
