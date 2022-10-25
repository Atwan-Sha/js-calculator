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
//let checkDisplayFill = true;
let checkOpSelect = false;
let displayValue = '';
let displayBuffer = '';

// *DOM Nodes
const buttonListNum = document.querySelectorAll('button.num');
const buttonListOp = document.querySelectorAll('button.op');
const clearButton = document.querySelector('button#clear');
const equalsButton = document.querySelector('button#equals');
const display = document.querySelector('.display');

// *Event Handlers:
// number buttons
for(let button of buttonListNum){
    button.addEventListener('click', () => {
        // update display
        if(display.textContent.length < 15){
            displayBuffer += button.textContent;
            display.textContent = displayValue + displayBuffer;
            checkOpSelect = true;
        }
    });
}
// operator buttons
for(let button of buttonListOp){
    button.addEventListener('click', () => {
        if(checkOpSelect){
        // calculation
            userInputNum = Number(displayBuffer);
            if(inputX == null){
                inputX = userInputNum;
            }else{
                inputY = userInputNum;
                inputX = operate(inputOp, inputX, inputY);
            }
            inputOp = button.id;
            // update display
            displayBuffer += button.textContent;
            displayValue += displayBuffer;
            display.textContent = displayValue;
            displayBuffer = '';
            checkOpSelect = false;
        }
        // console.log({userInputNum, 
        //              inputX, 
        //              inputY, 
        //              displayValue, 
        //              displayBuffer, 
        //              inputOp
        // });

    });
}
// clear button
clearButton.addEventListener('click', () => {
    inputX = null;
    inputY = null;
    inputOp = null;
    displayValue = '';
    displayBuffer = '';
    display.textContent = '0';
    checkOpSelect = false;
});
// equals button
equalsButton.addEventListener('click', () => {
    userInputNum = Number(displayBuffer);
    if(inputX == null){
        display.textContent = userInputNum;
    }else if(displayBuffer == ''){
        display.textContent = inputX;
    }else{
        inputY = userInputNum;
        inputX = operate(inputOp, inputX, inputY);
        display.textContent = inputX;
    }
});


// ! Check for display overflow (especially decimals)
// ! Divide-by-zero snarky error message
// ! Add display for partial calculations









