
function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

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
// let opTest = operate('div',10,3);
// console.log(opTest);




