// avoid runtime RegExp creation for not so smart,
// not JIT based, and old browsers / engines
// https://github.com/twitter/twemoji/blob/gh-pages/2/twemoji.js#L232
const UFE0Fg = /\uFE0F/g;

// \u200D is a zero-width joiner character
// https://github.com/twitter/twemoji/blob/gh-pages/2/twemoji.js#L235
const U200D = String.fromCharCode(0x200d);

// convert utf16 into code points
function toCodePoint(input, separator = "-") {
  const codePoints = [];
  for (let codePoint of input) {
    codePoints.push(codePoint.codePointAt(0).toString(16));
  }
  return codePoints.join(separator);
}

export default function unicodeToCodepoint(input) {
  return toCodePoint(
    input.indexOf(U200D) < 0 ? input.replace(UFE0Fg, "") : input
  );
}
