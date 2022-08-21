const NON_STRING_PLACEHOLDER = "__REACT_EMOJI_RENDER_PLACEHOLDER__";

export function escapeStringToBeUsedInRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function stripNonStringElements(children) {
  const stripped = children
    .map(x => (typeof x === "string" ? x : NON_STRING_PLACEHOLDER))
    .join("");
  return [stripped, children.filter(x => typeof x !== "string")];
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

export function returnStrippedElements(stripped, elements) {
  if (!stripped || !Array.isArray(stripped)) return stripped;
  if (!elements || !elements.length) return stripped;

  let count = -1;

  function replacePlaceholder(string) {
    const split = string.split(NON_STRING_PLACEHOLDER);
    if (split.length > 1) {
      return flatMap(split, (y, i) => {
        if (i === 0) return [y];
        else {
          count++;
          return [elements[count], y];
        }
      });
    } else {
      count++;
      return [...split, elements[count]];
    }
  }

  return flatMap(stripped, x => {
    if (typeof x === "string") {
      if (x.trim() === NON_STRING_PLACEHOLDER) {
        count++;
        return elements[count];
      } else if (x.includes(NON_STRING_PLACEHOLDER)) {
        return replacePlaceholder(x);
      }
    }
    return x;
  });
}
