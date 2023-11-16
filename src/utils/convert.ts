export function convertInString(...lines: any[]) {
  return lines.filter((el) => typeof el === "string").join(" ");
}

export function capitalizedString(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
