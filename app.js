// *CALCULATOR APP SCRIPT

// *Operators
function add(x, y){ return x + y; }
function subtract(x, y){ return x - y; }
function multiply(x, y){ return x * y; }
function divide(x, y){ return x / y; }

function operate(op, x, y){
    let result;
    switch(op){
        case 'add':
            result = add(x ,y);
            break;
        case 'sub':
            result = subtract(x ,y);
            break;
        case 'mul':
            result = multiply(x ,y);
            break;
        case 'div':
            result = divide(x, y);
    }
    return result;
}

// *Data Storage
let userInputNum;
let inputX = null;
let inputY = null;
let inputOp = null;
let checkOpSelect = false;
let displayValue = '';
let displayBuffer = '';
const ZERO_ERR_MSG = 'Whooaa! Stop that! You can\'t divide by zero! The calculator will explode!';

// *DOM Nodes
const buttonListNum = document.querySelectorAll('button.num');
const buttonListOp = document.querySelectorAll('button.op');
const clearButton = document.querySelector('button#clear');
const equalsButton = document.querySelector('button#equals');
const mainDisplay = document.querySelector('.display h1');
const secondaryDisplay = document.querySelector('.display h2');

// *Event Handlers:
// *number buttons
for(let button of buttonListNum){
    button.addEventListener('click', () => {
        // update mainDisplay
        if(mainDisplay.textContent.length < 15){
            displayBuffer += button.textContent;
            mainDisplay.textContent = displayValue + displayBuffer;
            userInputNum = Number(displayBuffer);
            checkOpSelect = true;
        }
    });
}
// *operator buttons
for(let button of buttonListOp){
    button.addEventListener('click', () => {
        // check division by zero
        if(inputOp == 'div' && userInputNum == 0){
            secondaryDisplay.textContent = ZERO_ERR_MSG;
            secondaryDisplay.style.color = 'red';
            return;
        }
        // calculate
        if(checkOpSelect){
            if(inputX == null){
                inputX = userInputNum;
            }else{
                inputY = userInputNum;
                inputX = operate(inputOp, inputX, inputY);
                secondaryDisplay.textContent = inputX;
            }
            inputOp = button.id;
            // update mainDisplay
            displayBuffer += button.textContent;
            displayValue += displayBuffer;
            mainDisplay.textContent = displayValue;
            displayBuffer = '';
            checkOpSelect = false;
        }
    });
}
// *clear button
clearButton.addEventListener('click', () => {
    userInputNum = 0;
    inputX = null;
    inputY = null;
    inputOp = null;
    displayValue = '';
    displayBuffer = '';
    mainDisplay.textContent = '0';
    secondaryDisplay.textContent = '-';
    secondaryDisplay.style.color = 'rgb(100, 100, 100)';
    checkOpSelect = false;
});
// *equals button
equalsButton.addEventListener('click', () => {
    // check division by zero
    if(inputOp == 'div' && userInputNum == 0){
        secondaryDisplay.textContent = ZERO_ERR_MSG;
        secondaryDisplay.style.color = 'red';
        return;
    }
    // update display & calculate
    if(inputX == null){
        mainDisplay.textContent = String(userInputNum);
    }else if(displayBuffer == ''){
        mainDisplay.textContent = inputX;
    }else{
        inputY = userInputNum;
        inputX = operate(inputOp, inputX, inputY);
        mainDisplay.textContent = inputX;
        secondaryDisplay.textContent = '';
    }
});

// *add advanced features
// !upload to github page!
