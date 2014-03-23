var printOnConsole = require('../fundef/async.js').printOnConsole;
var generateWord = require('../fundef2/async.js').generateWord;
var slasp = require('../../../lib/slasp.js');

var word;

slasp.attempt(function(callback) {
    var i;
    slasp.from(function(callback) {
        i = 0;
        callback(null);
    }, function(callback) {
        callback(null, i <= 15);
    }, function(callback) {
        i++;
        callback(null);
    }, function(callback) {
        slasp.sequence([
            function(callback) {
                generateWord(i, callback);
            },
        
            function(callback, result) {
                word = result;
                printOnConsole("We have a: "+word, callback);
            },
        ], callback);
    }, callback);
}, function(err, callback) {
    printOnConsole("Some exception occurred: "+err, callback);
}, function() {
    printOnConsole("Bye bye!");
});
