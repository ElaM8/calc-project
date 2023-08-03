import './style.scss'

const numButtons = document.querySelectorAll<HTMLButtonElement>(".calculator-number-input");
const operandButtons = document.querySelectorAll<HTMLButtonElement>(".calculator-operations");
const formatButtons = document.querySelectorAll<HTMLButtonElement>(".calculator-number-format");
const decimalButton = document.querySelector<HTMLButtonElement>("#input__number--decimal");
const clearButton = document.querySelector<HTMLButtonElement>("#input__clear");
const calculatorContainer = document.querySelector<HTMLDivElement>(".calculator-container");
const keys = document.querySelectorAll(".calculator-container");// dont need these
const inputOutputDisplay = document.querySelector<HTMLDivElement>(".calculator-display");

let buttonInputs: string[] = [];
let inputStr: string = ""
let num1: number;
let num2: number;
let operand: string;
let result: number;

if (numButtons.length === 0 || 
    operandButtons.length === 0 || 
    formatButtons.length === 0 || 
    keys.length === 0 ||
    !decimalButton ||
    !clearButton ||
    !calculatorContainer ||
    !inputOutputDisplay) {
  throw new Error("Selector issue: check button nodes exist");
}

const performCalculation = (num1 : number, num2 : number, operand: string) => {
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
  let input = (e.target as HTMLInputElement).innerText;
  console.log(input)
  buttonInputs.push(input);
  inputOutputDisplay.innerText = input
  inputStr = buttonInputs.join('').toString().replace("×", "*")
  if (inputStr.includes("=")) {
    getOperand(inputStr)
    console.log(inputStr)
    getNums(inputStr, operand)
    disableButtons()
  }
}

const handleKeyup = (e: Event) => {
  let input = e.key // what kind of event is this??
  buttonInputs.push(input);
  inputStr = buttonInputs.join('').toString()
  // clean the string here to remove everything except d / . / operands
  }

const disableButtons = () => {
if (result) {
  numButtons.forEach(b => b.disabled = true);
  operandButtons.forEach(b => b.disabled = true);
  formatButtons.forEach(b => b.disabled = true);
  decimalButton.disabled = true;
  clearButton.disabled = false;
}
}

const getOperand = (inputStr: string) => {
if (inputStr.includes("+")) {
  return operand = "+"
} else if (inputStr.includes("-")) {
  return operand = "-"
} else if (inputStr.includes("÷")) {
  return operand = "÷"
} else if (inputStr.includes("*")) {
  return operand = "*"
}
}

const getNums = (inputStr: string, operand: string) => {
  let cleanStr = inputStr.replace("=", "");
  console.log(cleanStr)
  num1 = +(cleanStr.split(operand).shift() as string);
  num2 = +(cleanStr.split(operand).pop() as string);
  performCalculation(num1, num2, operand);
}

const resetCalc = () => {
  window.location.reload()
}
  
  numButtons.forEach(b => b.addEventListener("click", handleButtonClick));
  operandButtons.forEach(b => b.addEventListener("click", handleButtonClick));
  formatButtons.forEach(b => b.addEventListener("click", handleButtonClick));
  decimalButton.addEventListener("click", handleButtonClick);
  clearButton.addEventListener("click", resetCalc);
  keys.forEach(k => k.addEventListener("keyup", handleKeyup));
  document.addEventListener("keyup", handleKeyup);