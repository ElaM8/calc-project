import './style.scss'

const buttons = document.querySelectorAll<HTMLButtonElement>("button");

if (buttons.length === 0) {
  throw new Error("Selector issue: check buttons");
}

const inputOutputDisplay = document.querySelector<HTMLDivElement>(".calculator-display");

if (!inputOutputDisplay) {
  throw new Error("Selector issue: check buttons");
}

let buttonInputs: string[] = [];

const handleButtonClick = (e: Event) => { //type?
  let inp = e.target.innerText;
  buttonInputs.push(inp);
  console.log(buttonInputs)
  }

buttons.forEach(b => b.addEventListener("click", handleButtonClick))