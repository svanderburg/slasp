var printOnConsole = require('../fundef/async.js').printOnConsole;
var slasp = require('../../../lib/slasp.js');

function checkMe(name, callback) {
    process.nextTick(function() {
        callback(null, name == "Sander");
    });
}

var name = "Sander";

slasp.when(function(callback) {
    checkMe(name, callback);
}, function(callback) {
    slasp.sequence([
        function(callback) {
            printOnConsole("It's me!", callback);
        },
    ], callback);
}, undefined, function(callback) {
    printOnConsole("That's all folks!", callback);
});
