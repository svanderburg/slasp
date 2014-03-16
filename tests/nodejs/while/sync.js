var printOnConsole = require('../fundef/sync.js').printOnConsole;

function checkTreshold() {
    return (approx.toString().substring(0, 7) != "3.14159");
}

var approx = 0;
var denominator = 1;
var sign = 1;

while(checkTreshold()) {
    approx += 4 * sign / denominator;
    printOnConsole("Current approximation is: "+approx);
        
    denominator += 2;
    sign *= -1;
}
