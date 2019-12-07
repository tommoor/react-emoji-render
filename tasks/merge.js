const path = require("path");
const glob = require("glob");

const mergeScripsDir = path.resolve("scripts", "merge");

function getAllScripts(callback) {
  const allScriptFilesGlob = mergeScripsDir + "/**/*.*";
  return glob(allScriptFilesGlob, callback);
}

console.log("\n***MERGE***");

// Execute all merge scripts
getAllScripts((error, result) => {
  result.forEach(file => {
    const filePath = path.resolve(mergeScripsDir, file);
    console.log("Running =>", filePath.slice(filePath.indexOf("/merge")));
    require(filePath);
  });
});
