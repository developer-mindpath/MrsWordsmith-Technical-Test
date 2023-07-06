function numberConversion(num: number): string {
  const romanNumbers: { [key: number]: string } = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
  };

  let result = "";

  const keys = Object.keys(romanNumbers).map(Number).reverse();

  for (const key of keys) {
    const value = romanNumbers[key];
    while (num >= key) {
      result += value;
      num -= key;
    }
  }

  return result;
}

console.log(
  "here is the converted roman numeral string:-",
  numberConversion(62)
);
