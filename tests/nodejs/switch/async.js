var printOnConsole = require('../fundef/async.js').printOnConsole;
var generateWord = require('../fundef2/async.js').generateWord;
var slasp = require('../../../lib/slasp.js');

slasp.circuit(function(callback) {
    generateWord(4, callback)
}, function(result, callback) {
    switch(result) {
        case "zero":
            printOnConsole("nul", callback);
            break;
        case "one":
            printOnConsole("een", callback);
            break;
        case "two":
            printOnConsole("twee", callback);
            break;
        case "three":
            printOnConsole("drie", callback);
            break;
        case "four":
            printOnConsole("vier", callback);
            break;
        case "five":
            printOnConsole("vijf", callback);
            break;
        case "six":
            printOnConsole("zes", callback);
            break;
        case "seven":
            printOnConsole("zeven", callback);
            break;
        case "eight":
            printOnConsole("acht", callback);
            break;
        case "nine":
            printOnConsole("negen", callback);
            break;
        default:
            printOnConsole("geen idee", callback);
            break;
    }
});
