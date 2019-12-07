const path = require("path");
const glob = require("glob");

const validateScripsDir = path.resolve("scripts", "validate");

function getAllScripts(callback) {
  const allScriptFilesGlob = validateScripsDir + "/**/*.*";
  return glob(allScriptFilesGlob, callback);
}

console.log("\n***VALIDATE***");

// Execute all validate scripts
getAllScripts((error, result) => {
  result.forEach(file => {
    const filePath = path.resolve(validateScripsDir, file);
    console.log("Running =>", filePath.slice(filePath.indexOf("/validate")));
    require(filePath);
  });
});
