var printOnConsole = require('../fundef/async.js').printOnConsole;
var slasp = require('../../../lib/slasp.js');

function getFruitPrices(callback) {
    process.nextTick(function() {
        callback(null, {
            "apples": 1.0,
            "pears": 0.9,
            "oranges": 1.1
        });
    });
}

slasp.fromEach(getFruitPrices, function(varName, callback) {
    printOnConsole(varName, callback);
});
