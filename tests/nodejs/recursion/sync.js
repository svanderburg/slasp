var printOnConsole = require('../fundef/sync.js').printOnConsole;

function fibonacci(n) {
    if (n < 2)
        return 1;
    else
        return fibonacci(n - 2) + fibonacci(n - 1);
}

var result = fibonacci(20);
printOnConsole("20th element in the fibonacci series is: "+result);
