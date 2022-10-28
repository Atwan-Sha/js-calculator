// *CALCULATOR APP SCRIPT

// *Operator functions
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
let userInputNum = '';
let inputX = null;
let inputY = null;
let inputOp = null;
let opSelect = false;
let displayValue = '';
let displayBuffer = '';
let blinkID = null;
let blinkOn = false;
const ZERO_ERR_MSG = 'Whooaa! Stop that! The calculator will explode!';

// *DOM Nodes
const buttonListNum = document.querySelectorAll('button.num');
const buttonListOp = document.querySelectorAll('button.op');
const clearButton = document.querySelector('button#clear');
const equalsButton = document.querySelector('button#equals');
const mainDisplay = document.querySelector('.display h1');
const secondaryDisplay = document.querySelector('.display h2');

// *Helper functions
function checkZero(buttonValue){
    if(buttonValue == '0' && mainDisplay.textContent == '0'){
        return true;
    }else{
        return false;
    }
}

function checkDivByZero(){
    if(inputOp == 'div' && userInputNum == '0' && inputX != null){
        secondaryDisplay.textContent = ZERO_ERR_MSG;
        secondaryDisplay.style.color = 'red';
        return true;
    }else{
        return false;
    }
}

function checkDisplayOverflow(){
    if(String(inputX).length > 6){
        inputX = inputX.toFixed(6);
    }
}

function checkOpChange(buttonValue){
    if(inputOp != null && inputOp != buttonValue){
        inputOp = buttonValue;
        displayValue = displayValue.slice(0, -1);
        opSelect = false;
        return true;
    }else{
        return false;
    }
}

function updateDisplay(buttonValue){
    displayValue += buttonValue;
    if(displayValue.length > 8){
        displayValue = displayValue.slice(0, 8);
    }
    mainDisplay.textContent = displayValue;
}

function resetDisplay(){
    clearInterval(blinkID);
    blinkOn = false;
    displayValue = '';
    mainDisplay.textContent = '0';
    secondaryDisplay.textContent = '-';
    secondaryDisplay.style.color = 'rgb(100, 100, 100)';
}

function resetLogic(){
    userInputNum = '';
    inputX = null;
    inputY = null;
    inputOp = null;
    opSelect = false;
}

function blink(){
    if(!blinkOn){
        blinkID = setInterval(() => {
            if(mainDisplay.textContent == displayValue){
                mainDisplay.textContent = '';
            }else{
                mainDisplay.textContent = displayValue;
            }
        }, 500);
        blinkOn = true;
    }
}

// *EVENT HANDLERS:
// *number buttons
for(let button of buttonListNum){
    button.addEventListener('click', () => {
        if(checkZero(button.textContent)){
            opSelect = true;
            displayValue = '0';
            blink();
        }else if(displayValue != '0'){
            updateDisplay(button.textContent);
            userInputNum += button.textContent;
            opSelect = true;
        }
    });
}

// *operator buttons
for(let button of buttonListOp){
    button.addEventListener('click', () => {
        if(blinkOn){
            clearInterval(blinkID);
            blinkOn = false;
        }
        if(checkDivByZero()){return;}
        if(opSelect){
            // calculate
            if(inputX == null){
                inputX = Number(userInputNum);
            }else{
                inputY = Number(userInputNum);
                inputX = operate(inputOp, inputX, inputY);
                checkDisplayOverflow();
                secondaryDisplay.textContent = String(inputX);
            }
            // update
            userInputNum = '';
            inputOp = button.id;
            opSelect = false;
            updateDisplay(button.textContent);
        }else if(checkOpChange(button.id)){
            updateDisplay(button.textContent);
        }
    });
}

// *equals button
equalsButton.addEventListener('click', () => {
    if(blinkOn){
        clearInterval(blinkID);
        blinkOn = false; 
        updateDisplay('');
    }
    if(checkDivByZero()){return;}
    if(inputX != null && !opSelect){
        userInputNum = String(inputX);
        inputX = null;
        displayValue = displayValue.slice(0, -1);
        updateDisplay('');
        opSelect = true;
    }else if(inputX != null){
        // calculate
        inputY = Number(userInputNum);
        inputX = operate(inputOp, inputX, inputY);
        // update
        userInputNum = String(inputX);
        checkDisplayOverflow();
        resetDisplay();
        updateDisplay(String(inputX));
        inputX = null;
        secondaryDisplay.textContent = '';
    }
});

// *clear button
clearButton.addEventListener('click', () => {
    resetDisplay();
    resetLogic();
});
