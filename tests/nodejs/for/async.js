var printOnConsole = require('../fundef/async.js').printOnConsole;
var slasp = require('../../../lib/slasp.js');

var i;

function startFun(callback) {
    process.nextTick(function() {
        i = 1;
        callback(null);
    });
}

function conditionFun(callback) {
    process.nextTick(function() {
        callback(null, i <= 10);
    });
}

function stepFun(callback) {
    process.nextTick(function() {
        i++;
        callback(null);
    });
}

function checkEven(number, callback) {
    process.nextTick(function() {
        callback(null,i % 2 == 0);
    });
}

slasp.from(startFun, conditionFun, stepFun
, function(callback) {
    slasp.when(function(callback) {
        checkEven(i, callback);
    }, function(callback) {
        printOnConsole("The number "+i+" is even!", callback);
    }, function(callback) {
        printOnConsole("The number "+i+" is odd!", callback);
    }, callback);
});
