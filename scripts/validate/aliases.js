const Joi = require("@hapi/joi");

const aliases = require("../../data/aliases");

// Regex extracted from "../../src/aliasRegex.js"
const JoiSchema = Joi.object().pattern(
  /^[\w\-\_\+\*\(\)\!#&åô’çéãí“”,]+$/,
  Joi.string().required()
);

const { error } = JoiSchema.validate(aliases);
if (error === undefined) {
  console.log("=> ✅ Valid data");
} else {
  console.log("=> ❌ ", error.details[0]);
}
