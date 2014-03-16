var printOnConsole = require('../fundef/async.js').printOnConsole;
var slasp = require('../../../lib/slasp.js');

function generateWord(num, callback) {
    process.nextTick(function() {
        if(num < 0 || num > 9) {
            callback("Cannot convert "+num+" into a word");
        } else {
            var words = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];
            callback(null, words[num]);
        }
    });
}

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
            printOnConsole("We have a: "+word);
        }
        
    ], callback);
}, function(err, callback) {
    printOnConsole("Some exception occured: "+err, callback);
}, function() {
    printOnConsole("Bye bye!");
});
