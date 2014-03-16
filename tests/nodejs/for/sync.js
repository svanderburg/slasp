var printOnConsole = require('../fundef/sync.js').printOnConsole;

var i;

function startFun() {
    i = 1;
}

function conditionFun() {
    return i <= 10;
}

function stepFun() {
    i++;
}

function checkEven(number) {
    return (i % 2 == 0);
}

for(startFun(); conditionFun(); stepFun()) {
    if(checkEven(i))
        printOnConsole("The number "+i+" is even!");
    else
        printOnConsole("The number "+i+" is odd!");
}
