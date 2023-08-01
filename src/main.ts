import './style.scss'

const numButtons = document.querySelectorAll<HTMLButtonElement>(".calculator-number-input");
const operandButtons = document.querySelectorAll<HTMLButtonElement>(".calculator-operations");
const formatButtons = document.querySelectorAll<HTMLButtonElement>(".calculator-number-format");
const decimalButton = document.querySelector<HTMLButtonElement>("#input__number--decimal")

if (numButtons.length === 0 || 
    operandButtons.length === 0 || 
    formatButtons.length === 0 || 
    !decimalButton ) {
  throw new Error("Selector issue: check button nodes exist");
}

const inputOutputDisplay = document.querySelector<HTMLDivElement>(".calculator-display");

if (!inputOutputDisplay) {
  throw new Error("Check display node exists");
}

let buttonInputs: string[] = [];
let inputStr: string = ""
let num1: number;
let num2: number;
let operand: string;

const performCalculation = (num1 : number, num2 : number, operand: string) => {
  let result: number;
  switch (operand) {
  case "+":
    result = num1 + num2
    break;
  case "-":
    result = num1 - num2
    break;
  case "÷":
    result = num1 / num2
    break;
  case "*":
    result = num1 * num2
    break;
}
return inputOutputDisplay.innerText = result.toString()
} 

const handleButtonClick = (e: Event) => {
  let input = e.target.innerText;
  buttonInputs.push(input);
  inputStr = buttonInputs.join('').toString();
  if (inputStr.includes("=")) {
    getOperand(inputStr)
    getNums(inputStr, operand)
    // need to invalidate buttons
  }
}

const getOperand = (inputStr: string) => {
if (inputStr.includes("+")) {
  return operand = "+"
} else if (inputStr.includes("-")) {
  return operand = "-"
} else if (inputStr.includes("÷")) {
  return operand = "÷"
} else {
  return operand = "*" }
}

const getNums = (inputStr: string, operand: string) => {
  let cleanStr = inputStr.replace("=", "");
  num1 = +cleanStr.split(operand).shift();
  num2 = +cleanStr.split(operand).pop();
  performCalculation(num1, num2, operand);
}
  
  numButtons.forEach(b => b.addEventListener("click", handleButtonClick))
  operandButtons.forEach(b => b.addEventListener("click", handleButtonClick))
  formatButtons.forEach(b => b.addEventListener("click", handleButtonClick))
  decimalButton.addEventListener("click", handleButtonClick)