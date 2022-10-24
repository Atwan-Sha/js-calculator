
function add(x, y){ return x + y; }

function subtract(x, y){ return x - y; }

function multiply(x, y){ return x * y; }

function divide(x, y){ return x / y; }

// function testOperators(){
//     console.log('add 4+5 = ' + add(4,5));
//     console.log('subtract 9-10 = ' + subtract(9,10));
//     console.log('multiply 4*5 = ' + multiply(4,5));
//     console.log('divide 10/2 = ' + divide(10,2));
// }

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

const buttonListNum = document.querySelectorAll('button.num');
const buttonListOp = document.querySelectorAll('button.op');
const clearButton = document.querySelector('button.clear');
const equalsButton = document.querySelector('button.equals');

const display = document.querySelector('.display');

let userInputNum;
let inputX = null;
let inputY = null;
let inputOp;
let result;
let displayValue = '';
let displayBuffer = '';

for(let button of buttonListNum){
    button.addEventListener('click', () => {
        displayBuffer += button.textContent;
        display.textContent = displayValue + displayBuffer;
    });
}

for(let button of buttonListOp){
    button.addEventListener('click', () => {
        userInputNum = Number(displayBuffer);
        inputOp = button.id;
        if(inputX == null){
            inputX = userInputNum;
        }else{
            inputY = userInputNum;
            inputX = operate(inputOp, inputX, inputY);
        }

        displayBuffer += button.textContent;
        displayValue += displayBuffer;
        display.textContent = displayValue;
        displayBuffer = '';

        console.log({userInputNum, 
                     inputX, 
                     inputY, 
                     displayValue, 
                     displayBuffer, 
                     inputOp
        });

    });
}












