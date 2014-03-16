var printOnConsole = require('../fundef/async.js').printOnConsole;
var slasp = require('../../../lib/slasp.js');

function checkTreshold(callback) {
    process.nextTick(function() {
        callback(null, approx.toString().substring(0, 7) != "3.14159");
    });
}

var approx = 0;
var denominator = 1;
var sign = 1;

slasp.whilst(checkTreshold, function(callback) {
    slasp.sequence([
        function(callback) {
            approx += 4 * sign / denominator;
            callback(null);
        },
        
        function(callback) {
            printOnConsole("Current approximation is: "+approx, callback);
        },
        
        function(callback) {
            denominator += 2;
            callback(null);
        },
        
        function(callback) {
            sign *= -1;
            callback(null);
        }
    ], callback);
});
