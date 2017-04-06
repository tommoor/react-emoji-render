// avoid runtime RegExp creation for not so smart,
// not JIT based, and old browsers / engines
const UFE0Fg = /\uFE0F/g;

// avoid using a string literal like '\u200D' here because minifiers expand it inline
const U200D = String.fromCharCode(0x200d);

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
