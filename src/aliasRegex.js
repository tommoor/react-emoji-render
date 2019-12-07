export const allowedAliasCharacters = "\\w\\-\\_\\+\\*\\(\\)\\!#&åô’çéãí“”,";

function getAliasesRegex() {
  return new RegExp(`:([${allowedAliasCharacters}]+):`, "g");
}

export default getAliasesRegex;
