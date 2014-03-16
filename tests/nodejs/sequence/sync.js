var printOnConsole = require('../fundef/sync.js').printOnConsole;
var generateWord = require('../fundef2/sync.js').generateWord;

var a = 1;
var b = a + 1;
var number = generateWord(b);
printOnConsole(number); // two
