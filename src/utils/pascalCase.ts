export function pascalCase(str: string) {
  if (/^[\p{L}\d]+$/iu.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str
    .replaceAll(
      /([\p{L}\d])([\p{L}\d]*)/giu,
      (_g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
    )
    .replaceAll(/[^\p{L}\d]/giu, "");
}
