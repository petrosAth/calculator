let operation = {
  number: {
    first: null,
    second: null,
  },
  sign: null,
};

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  const msg = "Can't divide with zero!";
  return num2 === 0 ? msg : num1 / num2;
}
