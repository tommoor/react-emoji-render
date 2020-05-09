export const allowedAliasCharacters = "\\w\\-\\_\\+\\*\\(\\)\\!#&åô’çéãí“”,";
export const startOfURL = "https?\\S*";

function getAliasesRegex() {
  return new RegExp(`(?<!${startOfURL}):([${allowedAliasCharacters}]+):`, "g");
}

export default getAliasesRegex;
