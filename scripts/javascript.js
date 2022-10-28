let screen = {
  print: "0",
  clear: false,
  validCharacters: ["float", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
};
let operation = {
  number: {
    first: null,
    second: null,
  },
  sign: null,
  justStarted: false,
  validSigns: ["add", "substract", "multiply", "divide"],
  active: null,
};

function calculateDimensions() {
  if (window.innerWidth > window.innerHeight) {
    document.querySelector(".calculator").style.maxHeight = "90vh";
  } else {
    document.querySelector(".calculator").style.maxWidth = "90vw";
  }
}

function refreshScreen() {
  document.querySelector(".calculator__screen--top").textContent = screen.print;
  screen.print = screen.clear ? "0" : screen.print;
  screen.clear = false;
}

function showActiveOperation() {
  if (operation.active !== null) {
    let activeButton = document.querySelector(
      `.calculator__buttons__${operation.active}--sign--top`
    );
    activeButton.style.background = "rgb(70, 70, 70)";
    activeButton.style.color = "rgb(220, 220, 220)";
    return;
  }
  let signButtons = document.querySelectorAll(
    `[class^="calculator__buttons"][class$="--sign--top"]`
  );
  signButtons.forEach(function (button) {
    button.style.background = "var(--button-sign_color)";
    button.style.color = "var(--button_outline_color)";
  });
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
    case "add":
      screen.print = add(operation.number.first, operation.number.second);
      break;
    case "substract":
      screen.print = substract(operation.number.first, operation.number.second);
      break;
    case "multiply":
      screen.print = multiply(operation.number.first, operation.number.second);
      break;
    case "divide":
      screen.print = divide(operation.number.first, operation.number.second);
      break;

    default:
      break;
  }
}

function startOperation(sign) {
  if (operation.number.first !== null) {
    endOperation();
  }
  operation.active = sign;
  operation.sign = sign;
  screen.clear = true;
  operation.number.first = parseFloat(screen.print);
  operation.justStarted = true;
  showActiveOperation();
}

function endOperation() {
  operation.number.second = parseFloat(screen.print);
  operation.active = null;
  showActiveOperation();
  equals();
}

function clear() {
  screen.print = "0";
  operation.number.first = null;
  operation.number.second = null;
  operation.sign = null;
  operation.active = null;
}

function deleteCharacter() {
  if (operation.justStarted) {
    return;
  }
  if (typeof screen.print === "string") {
    screen.print = screen.print.length === 1 ? "0" : screen.print.slice(0, -1);
  }
}

function writeScreen(button) {
  if (screen.print.length > 10) {
    return;
  }
  if (button === "float") {
    if (!screen.print.includes("float")) {
      screen.print = screen.print.concat("", ".");
    }
  } else if (screen.print === "0" || typeof screen.print !== "string") {
    screen.print = button;
  } else {
    screen.print = screen.print.concat("", button);
  }
  operation.justStarted = false;
}

function registerOperation(button) {
  if (button === "c") {
    clear();
  }
  if (button === "=") {
    endOperation();
  }
  if (button === "d") {
    deleteCharacter();
  }
  if (operation.validSigns.includes(button)) {
    startOperation(button);
  }
  if (screen.validCharacters.includes(button)) {
    writeScreen(button);
  }
  refreshScreen();
}

function initButtons() {
  const addButton = document.querySelector(".calculator__buttons__add--sign");
  addButton.addEventListener("click", (event) => registerOperation("add"));

  const substractButton = document.querySelector(
    ".calculator__buttons__substract--sign"
  );
  substractButton.addEventListener("click", (event) =>
    registerOperation("substract")
  );

  const multiplyButton = document.querySelector(
    ".calculator__buttons__multiply--sign"
  );
  multiplyButton.addEventListener("click", (event) =>
    registerOperation("multiply")
  );

  const divideButton = document.querySelector(
    ".calculator__buttons__divide--sign"
  );
  divideButton.addEventListener("click", (event) =>
    registerOperation("divide")
  );

  const equalsButton = document.querySelector(
    ".calculator__buttons__equals--sign"
  );
  equalsButton.addEventListener("click", () => registerOperation("="));

  const floatButton = document.querySelector(".calculator__buttons__float");
  floatButton.addEventListener("click", () => registerOperation("float"));

  const clearButton = document.querySelector(
    ".calculator__buttons__clear--utility"
  );
  clearButton.addEventListener("click", () => registerOperation("c"));

  const deleteButton = document.querySelector(
    ".calculator__buttons__delete--utility"
  );
  deleteButton.addEventListener("click", () => registerOperation("d"));

  const oneButton = document.querySelector(".calculator__buttons__one");
  oneButton.addEventListener("click", () => registerOperation("1"));

  const twoButton = document.querySelector(".calculator__buttons__two");
  twoButton.addEventListener("click", () => registerOperation("2"));

  const threeButton = document.querySelector(".calculator__buttons__three");
  threeButton.addEventListener("click", () => registerOperation("3"));

  const fourButton = document.querySelector(".calculator__buttons__four");
  fourButton.addEventListener("click", () => registerOperation("4"));

  const fiveButton = document.querySelector(".calculator__buttons__five");
  fiveButton.addEventListener("click", () => registerOperation("5"));

  const sixButton = document.querySelector(".calculator__buttons__six");
  sixButton.addEventListener("click", () => registerOperation("6"));

  const sevenButton = document.querySelector(".calculator__buttons__seven");
  sevenButton.addEventListener("click", () => registerOperation("7"));

  const eightButton = document.querySelector(".calculator__buttons__eight");
  eightButton.addEventListener("click", () => registerOperation("8"));

  const nineButton = document.querySelector(".calculator__buttons__nine");
  nineButton.addEventListener("click", () => registerOperation("9"));

  const zeroButton = document.querySelector(".calculator__buttons__zero");
  zeroButton.addEventListener("click", () => registerOperation("0"));

  document.addEventListener("keyup", function (event) {
    switch (event.key) {
      case "add":
        registerOperation("add");
        break;
      case "substract":
        registerOperation("substract");
        break;
      case "multiply":
        registerOperation("multiply");
        break;
      case "divide":
        registerOperation("divide");
        break;
      case "=":
        registerOperation("=");
        break;
      case "Enter":
        registerOperation("=");
        break;
      case "float":
        registerOperation("float");
        break;
      case "c":
        registerOperation("c");
        break;
      case "Delete":
        registerOperation("c");
        break;
      case "Backspace":
        registerOperation("d");
        break;
      case "0":
        registerOperation("0");
        break;
      case "1":
        registerOperation("1");
        break;
      case "2":
        registerOperation("2");
        break;
      case "3":
        registerOperation("3");
        break;
      case "4":
        registerOperation("4");
        break;
      case "5":
        registerOperation("5");
        break;
      case "6":
        registerOperation("6");
        break;
      case "7":
        registerOperation("7");
        break;
      case "8":
        registerOperation("8");
        break;
      case "9":
        registerOperation("9");
        break;

      default:
        break;
    }
  });
}

calculateDimensions();
initButtons();
