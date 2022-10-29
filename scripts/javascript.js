let screen = {
  print: "0",
  clear: false,
  validCharacters: [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
};
let calculation = {
  mode: {
    first: true,
    operator: false,
    second: false,
    result: false,
  },
  result: {
    shown: "0",
    temp: null,
  },
  validOperators: ["+", "-", "*", "/"],
  activeOperator: null,
};

function calculateDimensions() {
  if (window.innerWidth > window.innerHeight) {
    document.querySelector(".calculator").style.maxHeight = "90vh";
  } else {
    document.querySelector(".calculator").style.maxWidth = "90vw";
  }
}

function setMode(newMode) {
  for (const mode in calculation.mode) {
    calculation.mode[mode] = false;
  }
  calculation.mode[newMode] = true;
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

function refreshScreen() {
  let screen = document.querySelector(".calculator__screen--top");
  screen.textContent = calculation.result.shown;
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
  const msg = "Can't divide by zero!";
  return num2 === 0 ? msg : num1 / num2;
}

function equals() {
  // switch (operation.sign) {
  //   case "add":
  //     screen.print = add(operation.number.first, operation.number.second);
  //     break;
  //   case "substract":
  //     screen.print = substract(operation.number.first, operation.number.second);
  //     break;
  //   case "multiply":
  //     screen.print = multiply(operation.number.first, operation.number.second);
  //     break;
  //   case "divide":
  //     screen.print = divide(operation.number.first, operation.number.second);
  //     break;
  //
  //   default:
  //     break;
  // }
}

function clear() {
  setMode("first");
  calculation.result.shown = "0";
  calculation.activeOperator = null;
}

function undo() {
  let screen = calculation.result.shown;

  if (!calculation.mode.result) {
    screen = screen.length === 1 ? "0" : screen.slice(0, -1);
  }

  calculation.result.shown = screen;
}

function writeScreen(button) {
  if (calculation.mode.result) {
    clear();
  }

  let screen = calculation.result.shown;

  if (screen.length > 10) {
    return;
  }
  if (button === ".") {
    if (!screen.includes(".")) {
      screen = screen.concat("", ".");
    }
  } else if (screen === "0") {
    screen = button;
  } else {
    screen = screen.concat("", button);
  }

  calculation.result.shown = screen;
}

function initCalculation(button) {
  if (button === "clear") {
    clear();
  }
  if (button === "undo") {
    undo();
  }
  if (screen.validCharacters.includes(button)) {
    writeScreen(button);
  }
  // if (calculation.validSigns.includes(button)) {
  //   startOperation(button);
  // }
  // if (button === "=") {
  //   endOperation();
  // }
  refreshScreen();
}

function initButtons() {
  const addButton = document.querySelector(".calculator__buttons__add--sign");
  addButton.addEventListener("click", () => initCalculation("add"));

  const substractButton = document.querySelector(
    ".calculator__buttons__substract--sign"
  );
  substractButton.addEventListener("click", () => initCalculation("substract"));

  const multiplyButton = document.querySelector(
    ".calculator__buttons__multiply--sign"
  );
  multiplyButton.addEventListener("click", () => initCalculation("multiply"));

  const divideButton = document.querySelector(
    ".calculator__buttons__divide--sign"
  );
  divideButton.addEventListener("click", () => initCalculation("divide"));

  const equalsButton = document.querySelector(
    ".calculator__buttons__equals--sign"
  );
  equalsButton.addEventListener("click", () => initCalculation("="));

  const floatButton = document.querySelector(".calculator__buttons__float");
  floatButton.addEventListener("click", () => initCalculation("."));

  const clearButton = document.querySelector(
    ".calculator__buttons__clear--utility"
  );
  clearButton.addEventListener("click", () => initCalculation("clear"));

  const undoButton = document.querySelector(
    ".calculator__buttons__undo--utility"
  );
  undoButton.addEventListener("click", () => initCalculation("undo"));

  const oneButton = document.querySelector(".calculator__buttons__one");
  oneButton.addEventListener("click", () => initCalculation("1"));

  const twoButton = document.querySelector(".calculator__buttons__two");
  twoButton.addEventListener("click", () => initCalculation("2"));

  const threeButton = document.querySelector(".calculator__buttons__three");
  threeButton.addEventListener("click", () => initCalculation("3"));

  const fourButton = document.querySelector(".calculator__buttons__four");
  fourButton.addEventListener("click", () => initCalculation("4"));

  const fiveButton = document.querySelector(".calculator__buttons__five");
  fiveButton.addEventListener("click", () => initCalculation("5"));

  const sixButton = document.querySelector(".calculator__buttons__six");
  sixButton.addEventListener("click", () => initCalculation("6"));

  const sevenButton = document.querySelector(".calculator__buttons__seven");
  sevenButton.addEventListener("click", () => initCalculation("7"));

  const eightButton = document.querySelector(".calculator__buttons__eight");
  eightButton.addEventListener("click", () => initCalculation("8"));

  const nineButton = document.querySelector(".calculator__buttons__nine");
  nineButton.addEventListener("click", () => initCalculation("9"));

  const zeroButton = document.querySelector(".calculator__buttons__zero");
  zeroButton.addEventListener("click", () => initCalculation("0"));

  document.addEventListener("keyup", function (event) {
    switch (event.key) {
      case "add":
        initCalculation("add");
        break;
      case "substract":
        initCalculation("substract");
        break;
      case "multiply":
        initCalculation("multiply");
        break;
      case "divide":
        initCalculation("divide");
        break;
      case "=":
        initCalculation("=");
        break;
      case "Enter":
        initCalculation("=");
        break;
      case "float":
        initCalculation("float");
        break;
      case "c":
        initCalculation("c");
        break;
      case "Delete":
        initCalculation("c");
        break;
      case "Backspace":
        initCalculation("d");
        break;
      case "0":
        initCalculation("0");
        break;
      case "1":
        initCalculation("1");
        break;
      case "2":
        initCalculation("2");
        break;
      case "3":
        initCalculation("3");
        break;
      case "4":
        initCalculation("4");
        break;
      case "5":
        initCalculation("5");
        break;
      case "6":
        initCalculation("6");
        break;
      case "7":
        initCalculation("7");
        break;
      case "8":
        initCalculation("8");
        break;
      case "9":
        initCalculation("9");
        break;

      default:
        break;
    }
  });
}

calculateDimensions();
initButtons();
function debug() {
  // NOTE: Remove when project is done
  console.log(`operation.number.first = ${operation.number.first}`);
  console.log(`operation.number.second = ${operation.number.second}`);
}
