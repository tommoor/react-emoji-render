const NON_STRING_PLACEHOLDER = "__REACT_EMOJI_RENDER_PLACEHOLDER__";

export function escapeStringToBeUsedInRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function stripNonStringElements(children) {
  const strippedChildren = children
    .map(child => (typeof child === "string" ? child : NON_STRING_PLACEHOLDER))
    .join("");
  const elements = children.filter(child => typeof child !== "string");
  return [strippedChildren, elements];
}

function flatMap(array, mapper) {
  let result = [];

  for (let i = 0; i < array.length; ++i) {
    let item = mapper(array[i], i, array);

    if (!Array.isArray(item)) {
      item = [item];
    }

    for (let j = 0; j < item.length; ++j) {
      result.push(item[j]);
    }
  }

  return result;
}

export function returnNonStringStrippedElements(stripped, elements) {
  if (!stripped || !Array.isArray(stripped)) return stripped;
  if (!elements || !elements.length) return stripped;

  let count = -1;

  function replacePlaceholder(string) {
    const split = string.split(NON_STRING_PLACEHOLDER);
    if (split.length > 1) {
      return flatMap(split, (item, index) => {
        if (index === 0) return [item];
        else {
          count++;
          return [elements[count], item];
        }
      });
    } else {
      count++;
      return [...split, elements[count]];
    }
  }

  return flatMap(stripped, item => {
    if (typeof item === "string") {
      if (item.trim() === NON_STRING_PLACEHOLDER) {
        count++;
        return elements[count];
      } else if (item.includes(NON_STRING_PLACEHOLDER)) {
        return replacePlaceholder(item);
      }
    }
    return item;
  });
}
