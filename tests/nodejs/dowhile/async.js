var printOnConsole = require('../fundef/async.js').printOnConsole;
var slasp = require('../../../lib/slasp.js');

function checkTreshold(callback) {
    process.nextTick(function() {
        callback(null, approx.toString().substring(0, 7) != "2.71828");
    });
}

var approx = 1;
var denominator = 1;
var multiplier = 1;

slasp.doWhilst(function(callback) {
    slasp.sequence([
        function(callback) {
            approx += 1 / denominator;
            callback(null);
        },
        
        function(callback) {
            printOnConsole("Current approximation is: "+approx, callback);
        },
        
        function(callback) {
            multiplier++;
            callback(null);
        },
        
        function(callback) {
            denominator *= multiplier;
            callback(null);
        }
    ], callback);
}, checkTreshold);
