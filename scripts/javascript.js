let screen = {
  print: "0",
  clear: false,
};
let operation = {
  number: {
    first: null,
    second: null,
  },
  sign: null,
};

function calculateDimensions() {
  if (window.innerWidth > window.innerHeight) {
    document.querySelector(".calculator").style.maxHeight = "90vh";
  } else {
    document.querySelector(".calculator").style.maxWidth = "90vw";
  }
}

function refreshScreen() {
  document.querySelector(".calculator__screen").textContent = screen.print;
  screen.print = screen.clear ? "0" : screen.print;
  screen.clear = false;
}

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

function float(num1, num2 = 5) {
  num2 = num2 / Math.pow(10, num2.toString().length);
  return num1 + num2;
}

function equals() {
  switch (operation.sign) {
    case "+":
      screen.print = add(operation.number.first, operation.number.second);
      break;
    case "-":
      screen.print = substract(operation.number.first, operation.number.second);
      break;
    case "*":
      screen.print = multiply(operation.number.first, operation.number.second);
      break;
    case "/":
      screen.print = divide(operation.number.first, operation.number.second);
      break;

    default:
      break;
  }
}

function startOperation(sign) {
  operation.sign = sign;
  screen.clear = true;
  operation.number.first = parseFloat(screen.print);
}

function endOperation() {
  operation.number.second = parseFloat(screen.print);
  equals();
}

function populateOperation(button) {
  if (button === "c") {
    screen.print = "0";
    operation.number.first = null;
    operation.number.second = null;
    operation.number.float = null;
    operation.sign = null;
  }
  if (button === "=") {
    endOperation();
  }
  if (button === "d") {
    screen.print = screen.print === "0" ? "0" : screen.print.slice(0, -1);
  }
  if (["+", "-", "*", "/"].includes(button)) {
    startOperation(button);
  }
  if (button === ".") {
    screen.print = screen.print.concat("", button);
  }
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(button)) {
    screen.print =
      screen.print === "0" ? button : screen.print.concat("", button);
  }
  refreshScreen();
}

function initButtons() {
  const addButton = document.querySelector(".calculator__buttons__add");
  addButton.addEventListener("click", () => populateOperation("+"));

  const substractButton = document.querySelector(
    ".calculator__buttons__substract"
  );
  substractButton.addEventListener("click", () => populateOperation("-"));

  const multiplyButton = document.querySelector(
    ".calculator__buttons__multiply"
  );
  multiplyButton.addEventListener("click", () => populateOperation("*"));

  const divideButton = document.querySelector(".calculator__buttons__divide");
  divideButton.addEventListener("click", () => populateOperation("/"));

  const equalsButton = document.querySelector(".calculator__buttons__equals");
  equalsButton.addEventListener("click", () => populateOperation("="));

  const floatButton = document.querySelector(".calculator__buttons__float");
  floatButton.addEventListener("click", () => populateOperation("."));

  const clearButton = document.querySelector(".calculator__buttons__clear");
  clearButton.addEventListener("click", () => populateOperation("c"));

  const deleteButton = document.querySelector(".calculator__buttons__delete");
  deleteButton.addEventListener("click", () => populateOperation("d"));

  const oneButton = document.querySelector(".calculator__buttons__one");
  oneButton.addEventListener("click", () => populateOperation("1"));

  const twoButton = document.querySelector(".calculator__buttons__two");
  twoButton.addEventListener("click", () => populateOperation("2"));

  const threeButton = document.querySelector(".calculator__buttons__three");
  threeButton.addEventListener("click", () => populateOperation("3"));

  const fourButton = document.querySelector(".calculator__buttons__four");
  fourButton.addEventListener("click", () => populateOperation("4"));

  const fiveButton = document.querySelector(".calculator__buttons__five");
  fiveButton.addEventListener("click", () => populateOperation("5"));

  const sixButton = document.querySelector(".calculator__buttons__six");
  sixButton.addEventListener("click", () => populateOperation("6"));

  const sevenButton = document.querySelector(".calculator__buttons__seven");
  sevenButton.addEventListener("click", () => populateOperation("7"));

  const eightButton = document.querySelector(".calculator__buttons__eight");
  eightButton.addEventListener("click", () => populateOperation("8"));

  const nineButton = document.querySelector(".calculator__buttons__nine");
  nineButton.addEventListener("click", () => populateOperation("9"));

  const zeroButton = document.querySelector(".calculator__buttons__zero");
  zeroButton.addEventListener("click", () => populateOperation("0"));
}

calculateDimensions();
initButtons();
