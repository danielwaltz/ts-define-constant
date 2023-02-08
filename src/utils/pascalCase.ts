export function pascalCase(str: string) {
  return str
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
