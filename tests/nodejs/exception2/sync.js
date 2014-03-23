var printOnConsole = require('../fundef/sync.js').printOnConsole;
var generateWord = require('../fundef2/sync.js').generateWord;

try {
    for(var i = 0; i <= 15; i++) {
        var word = generateWord(i);
        printOnConsole("We have a: "+word);
    }
} catch(err) {
    printOnConsole("Some exception occurred: "+err);
} finally {
    printOnConsole("Bye bye!");
}
