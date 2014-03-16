var printOnConsole = require('../fundef/sync.js').printOnConsole;

function checkTreshold() {
    return (approx.toString().substring(0, 7) != "2.71828");
}

var approx = 1;
var denominator = 1;
var multiplier = 1;

do {
    approx += 1 / denominator;
    printOnConsole("Current approximation is: "+approx);
        
    multiplier++;
    denominator *= multiplier;
}
while(checkTreshold())
