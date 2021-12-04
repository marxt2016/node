const colors = require("colors");
const [begin, end] = process.argv.slice(2);

function primeNumbers(begin, end) {
  if (
    !Number(begin) ||
    !Number(end) ||
    Number(begin) < 0 ||
    Number(end) < 0 ||
    Number(begin) > Number(end)
  ) {
    console.log(colors.red("Please provide correct range boundaries"));
  } else {
    console.log(`begin ${begin}`);
    console.log(`end ${end}`);
    const initialArray = [...Array(end - begin + 1).keys()].map(
      (i) => Number(begin) + i
    );
    const primeNumbersArray = initialArray.filter((i) => isPrime(i));
    if (primeNumbersArray.length < 1) {
      console.log(colors.red("No prime numbers found"));
    } else {
      console.log(primeNumbersArray);
      for (let i = 0; i < primeNumbersArray.length; i += 3) {
        for (let count = 0; count < 3; count++) {
          if (count === 0) {
            console.log(colors.green(primeNumbersArray[i]));
          }
          if (count === 1) {
            if (primeNumbersArray[i + 1]) {
              console.log(colors.yellow(primeNumbersArray[i + 1]));
            }
          }
          if (count === 2) {
            if (primeNumbersArray[i + 2]) {
              console.log(colors.red(primeNumbersArray[i + 2]));
            }
          }
        }
      }
    }
  }
}

function isPrime(number) {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i < number; i++) {
    if (number % i == 0) return false;
  }
  return true;
}

primeNumbers(begin, end);

// const colors = require('colors');
// console.log(colors.green('Hello green'));
