export function convertNumberToWordsEN(value: number): string {
  value = Math.floor(value);
  var ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  var tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  var numString = value.toString();

  if (value < 0) throw new Error("Negative numbers are not supported.");

  if (value === 0) return "zero";

  // Function to convert numbers less than 100 into words
  function convertLessThanHundred(num: number): string {
    if (num < 20) {
      return ones[num];
    } else {
      return tens[Math.floor(num / 10)] + " " + ones[num % 10];
    }
  }

  // Function to convert numbers less than 1000 into words
  function convertLessThanThousand(num: number): string {
    var str = "";
    if (num >= 100) {
      str += ones[Math.floor(num / 100)] + " hundred ";
      num %= 100;
    }
    if (num !== 0) {
      if (str !== "") str += "and ";
      str += convertLessThanHundred(num);
    }
    return str;
  }

  // Function to convert numbers less than 1 crore into words
  function convertLessThanCrore(num: number): string {
    var str = "";
    if (num >= 10000000) {
      str += convertLessThanThousand(Math.floor(num / 10000000)) + " crore ";
      num %= 10000000;
    }
    if (num !== 0) {
      if (str !== "") str += " ";
      str += convertLessThanThousand(num);
    }
    return str;
  }

  // Function to convert fractional part into paisa
  function convertPaisa(num: number): string {
    if (num === 0) {
      return "";
    } else {
      return "paisa " + num.toString().padStart(2, "0");
    }
  }

  // Convert the whole number part
  var result = convertLessThanCrore(Math.floor(value));

  // Convert the fractional part
  if (numString.includes(".")) {
    var paisa = Number("0." + numString.split(".")[1]) * 100;
    result += " and " + convertPaisa(Math.floor(paisa));
  }

  return result;
}
