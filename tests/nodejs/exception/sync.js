var printOnConsole = require('../fundef/sync.js').printOnConsole;
var generateWord = require('../fundef2/sync.js').generateWord;

try {
    var word = generateWord(1);
    printOnConsole("We have a: "+word);
    word = generateWord(10);
    printOnConsole("We have a: "+word);
} catch(err) {
    printOnConsole("Some exception occurred: "+err);
} finally {
    printOnConsole("Bye bye!");
}
