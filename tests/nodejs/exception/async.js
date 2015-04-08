var printOnConsole = require('../fundef/async.js').printOnConsole;
var generateWord = require('../fundef2/async.js').generateWord;

var slasp = require('../../../lib/slasp.js');

var word;

slasp.attempt(function(callback) {
    slasp.sequence([
        function(callback) {
            generateWord(1, callback);
        },
        
        function(callback, result) {
            word = result;
            printOnConsole("We have a: "+word, callback);
        },
        
        function(callback) {
            generateWord(10, callback);
        },
        
        function(callback, result) {
            word = result;
            printOnConsole("We have a: "+word, callback);
        }
        
    ], callback);
}, function(err, callback) {
    printOnConsole("Some exception occurred: "+err, callback);
}, function() {
    printOnConsole("Bye bye!");
});
