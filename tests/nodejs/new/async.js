var printOnConsole = require('../fundef/async.js').printOnConsole;
var slasp = require('../../../lib/slasp.js');

function Rectangle(self, width, height, callback) {
    process.nextTick(function() {
        self.width = width;
        self.height = height;
        callback(null);
    });
}

Rectangle.prototype.calculateArea = function(callback) {
    var self = this;
    process.nextTick(function() {
        callback(null, self.width * self.height);
    });
};

slasp.novel(Rectangle, 2, 2, function(err, result) {
    var r = result;
    r.calculateArea(function(err, result) {
        printOnConsole("Area is: "+result);
    });
});
