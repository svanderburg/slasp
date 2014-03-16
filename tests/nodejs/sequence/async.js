var printOnConsole = require('../fundef/async.js').printOnConsole;
var generateWord = require('../fundef2/async.js').generateWord;
var slasp = require('../../../lib/slasp.js');

var a;
var b;
var number;

slasp.sequence([
    function(callback) {
        a = 1;
        callback(null);
    },

    function(callback) {
        b = a + 1;
        callback(null);
    },
    
    function(callback) {
        generateWord(b, callback);
    },
    
    function(callback, result) {
        number = result;
        printOnConsole(number); // two
    }
]);
