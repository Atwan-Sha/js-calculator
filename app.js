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
let userInputNum = null;
let inputX = null;
let inputY = null;
let inputOp = null;
let opSelect = false;
let displayValue = '';
let displayBuffer = '';
const ZERO_ERR_MSG = 'Whooaa! Stop that! The calculator will explode!';

// *DOM Nodes
const buttonListNum = document.querySelectorAll('button.num');
const buttonListOp = document.querySelectorAll('button.op');
const clearButton = document.querySelector('button#clear');
const equalsButton = document.querySelector('button#equals');
const mainDisplay = document.querySelector('.display h1');
const secondaryDisplay = document.querySelector('.display h2');

/*
*displayBuffer += value;
*mainDisplay.textContent = displayValue + displayBuffer;
*userInputNum = Number(displayBuffer);
*opSelect = true;

?displayBuffer += button.textContent;
?displayValue += displayBuffer;
?mainDisplay.textContent = displayValue;
?displayBuffer = '';
?opSelect = false;
*/

// *Helper functions
function checkDivByZero(){
    if(inputOp == 'div' && userInputNum == 0){
        secondaryDisplay.textContent = ZERO_ERR_MSG;
        secondaryDisplay.style.color = 'red';
        return true;
    }else{
        return false;
    }
}

function checkDisplayOverflow(){
    if(String(inputX).length > 10){
        inputX = inputX.toFixed(10);
    }
}

function checkOpChange(value){
    if(inputOp != null && inputOp != value){
        inputOp = value;
        displayValue = displayValue.slice(0, -1);
        opSelect = false;
        return true;
    }else{
        return false;
    }
}

function updateDisplay(value){
    if(mainDisplay.textContent.length < 10){
        displayBuffer += value;
        displayValue += displayBuffer;
        mainDisplay.textContent = displayValue;
        displayBuffer = '';
    }
}

function resetDisplay(){
    displayValue = '';
    displayBuffer = '';
    mainDisplay.textContent = '0';
    secondaryDisplay.textContent = '-';
    secondaryDisplay.style.color = 'rgb(100, 100, 100)';
}

function resetLogic(){
    userInputNum = null;
    inputX = null;
    inputY = null;
    inputOp = null;
    opSelect = false;
}


// *EVENT HANDLERS:
// *number buttons
for(let button of buttonListNum){
    button.addEventListener('click', () => {
        updateDisplay(button.textContent);
        userInputNum = Number(button.textContent);
        opSelect = true;
    });
}

// *operator buttons
for(let button of buttonListOp){
    button.addEventListener('click', () => {
        if(checkDivByZero()){return;}
        // calculate
        if(opSelect){
            if(inputX == null){
                inputX = userInputNum;
            }else{
                inputY = userInputNum;
                inputX = operate(inputOp, inputX, inputY);
                checkDisplayOverflow();
                secondaryDisplay.textContent = String(inputX);
            }
            inputOp = button.id;
            updateDisplay(button.textContent);
            opSelect = false;
        }
        if(checkOpChange(button.id)){
            updateDisplay(button.textContent);
        }
    });
}

// *equals button
equalsButton.addEventListener('click', () => {
    if(checkDivByZero()){return;}
    // ! add correct calculation after result
    // ! fix faulty logic below
    // calculate
    if(inputX == null && displayValue != ''){
        //updateDisplay(String(userInputNum));
    }else if(inputX != null && !opSelect){
        displayValue = displayValue.slice(0, -1);
        updateDisplay('');
        opSelect = true;
    }else if(inputX != null){
        inputY = userInputNum;
        inputX = operate(inputOp, inputX, inputY);
        checkDisplayOverflow();
        resetDisplay();
        updateDisplay(String(inputX));
        secondaryDisplay.textContent = '';
    }
});

// *clear button
clearButton.addEventListener('click', () => {
    resetDisplay();
    resetLogic();
});
