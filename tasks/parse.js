const path = require("path");
const glob = require("glob");

const parseScripsDir = path.resolve("scripts", "parse");

function getAllScripts(callback) {
  const allScriptFilesGlob = parseScripsDir + "/**/*.*";
  return glob(allScriptFilesGlob, callback);
}

console.log("\n***PARSE***");

// Execute all parse scripts
getAllScripts((error, result) => {
  result.forEach((file) => {
    const filePath = path.resolve(parseScripsDir, file);
    console.log("Running =>", filePath.slice(filePath.indexOf("/parse")));
    require(filePath);
  });
});
