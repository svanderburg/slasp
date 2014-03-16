var printOnConsole = require('../fundef/async.js').printOnConsole;
var slasp = require('../../../lib/slasp.js');

function fibonacci(n, returnCallback) {
    slasp.when(function(callback) {
        callback(null, n < 2);
    }, function() {
        returnCallback(null, 1);
    }, function(callback) {
        var result1;
        
        slasp.sequence([
            function(callback) {
                setImmediate(function() {
                    fibonacci(n - 2, callback);
                });
            },
            
            function(callback, result) {
                result1 = result;
                
                setImmediate(function() {
                    fibonacci(n - 1, callback);
                });
            },
            
            function(callback, result) {
                returnCallback(null, result1 + result);
            }
        ], callback);
        
    }, returnCallback);
}

slasp.sequence([
    function(callback) {
        fibonacci(20, callback);
    },
    
    function(callback, result) {
        printOnConsole("20th element in the fibonacci series is: "+result, callback);
    }
]);
