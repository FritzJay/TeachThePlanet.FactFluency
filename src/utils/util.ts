export const padString = (str: any, length: number, char: string = ' ', left: boolean = true): string => {
  if (str === undefined || str === null || str.toString === undefined) {
    str = '';
  } else {
    str = str.toString();
  }
  const diff = length - str.length;
  for (let i = 0; i < diff; i++) {
    if (left) {
      str = char + str;
    } else {
      str += char;
    }
  }
  return str;
}

export const getOperatorSymbol = (operator: string): string => {
  switch(operator) {
    case '*':
      return '×';
    case '/':
      return '÷';
     case '-':
      return '−';
    default:
      return operator
  }
}