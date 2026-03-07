const IS_SINGLE_WORD_UNICODE_ALNUM_RE = /^[\p{L}\d]+$/iu;
const UNICODE_ALNUM_WORD_PARTS_RE = /([\p{L}\d])([\p{L}\d]*)/giu;
const NON_UNICODE_ALNUM_RE = /[^\p{L}\d]/giu;

export function pascalCase(str: string) {
  if (IS_SINGLE_WORD_UNICODE_ALNUM_RE.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str
    .replaceAll(
      UNICODE_ALNUM_WORD_PARTS_RE,
      (_g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
    )
    .replaceAll(NON_UNICODE_ALNUM_RE, "");
}
