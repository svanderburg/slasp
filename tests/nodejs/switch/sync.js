var printOnConsole = require('../fundef/sync.js').printOnConsole;
var generateWord = require('../fundef2/sync.js').generateWord;

switch(generateWord(4)) {
    case "zero":
        printOnConsole("nul");
        break;
    case "one":
        printOnConsole("een");
        break;
    case "two":
        printOnConsole("twee");
        break;
    case "three":
        printOnConsole("drie");
        break;
    case "four":
        printOnConsole("vier");
        break;
    case "five":
        printOnConsole("vijf");
        break;
    case "six":
        printOnConsole("zes");
        break;
    case "seven":
        printOnConsole("zeven");
        break;
    case "eight":
        printOnConsole("acht");
        break;
    case "nine":
        printOnConsole("negen");
        break;
    default:
        printOnConsole("geen idee");
        break;
}
