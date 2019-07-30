const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// raw.htm located at https://github.com/iamcal/emoji-data/blob/master/table.htm
const INPUT_FILE_PATH = path.join(__dirname, "../data/raw.htm");
const OUTPUT_FILE_PATH = path.join(__dirname, "../data/aliases.js");

const rawDataHtml = fs.readFileSync(INPUT_FILE_PATH, {
  encoding: "utf-8"
});

const $ = cheerio.load(rawDataHtml);

function getAliasLine(alias, emoji) {
  return `\t"${alias}": "${emoji}",\n`;
}

let aliases = "";
const tableBody = $("tbody").next();
tableBody.find("tr").each((index, row) => {
  const columns = $(row).find("td");

  const alias = $(columns.get(7)).text();
  const emoji = $(columns.get(5)).text();

  const parsedAlias = alias.slice(1, -1); // remove prefix and suffix colons

  aliases += getAliasLine(parsedAlias, emoji);
});

const preGlue = "module.exports = {\n";
const postGlue = "};\n";
const content = `${preGlue}${aliases}${postGlue}`;

fs.writeFile(OUTPUT_FILE_PATH, content, function(error) {
  if (error) {
    return console.log(error);
  }

  console.log("Aliases file generated!", OUTPUT_FILE_PATH);
});
