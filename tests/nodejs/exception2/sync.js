var printOnConsole = require('../fundef/sync.js').printOnConsole;

function generateWord(num) {
    if(num < 0 || num > 9) {
        throw "Cannot convert "+num+" into a word";
    } else {
        var words = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];
        return words[num];
    }
}

try {
    for(var i = 0; i <= 15; i++) {
        var word = generateWord(i);
        printOnConsole("We have a: "+word);
    }
} catch(err) {
    printOnConsole("Some exception occured: "+err);
} finally {
    printOnConsole("Bye bye!");
}