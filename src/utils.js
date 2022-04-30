const NON_STRING_PLACEHOLDER = "__REACT_EMOJI_RENDER_PLACEHOLDER__";

export function escapeStringToBeUsedInRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function stripNonStringElements(children) {
  if (Array.isArray(children)) {
    const stripped = children
      .map(x => (typeof x === "string" ? x : NON_STRING_PLACEHOLDER))
      .join("");
    return [stripped, children.filter(x => typeof x !== "string")];
  } else if (typeof children === "string") {
    return [children, []];
  }
}

export function returnStrippedElements(stripped, elements) {
  if (!stripped || !Array.isArray(stripped)) return stripped;
  if (!elements || !elements.length) return stripped;

  let count = -1;
  return stripped.flatMap((x, i) => {
    if (typeof x === "string") {
      if (x.trim() === NON_STRING_PLACEHOLDER) {
        count++;
        return elements[count];
      } else if (x.includes(NON_STRING_PLACEHOLDER)) {
        const split = x.split(NON_STRING_PLACEHOLDER);
        if (split.length > 1) {
          return split.flatMap((y, i) => {
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
    }
    return x;
  });
}
