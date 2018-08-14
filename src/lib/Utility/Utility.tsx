export const padString = (str: string, char: string, length: number): string => {
  const diff = length - str.length;
  console.log(diff);
  for (let i = 0; i < diff; i++) {
    str += char;
    console.log(str);
  }
  return str;
}