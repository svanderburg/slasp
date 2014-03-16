var printOnConsole = require('../fundef/async.js').printOnConsole;
var slasp = require('../../../lib/slasp.js');

function inherit(parent, child) {
    function F() {};
    F.prototype = parent.prototype; 
    child.prototype = new F();
    child.prototype.constructor = child;
}

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

function Square(self, edge, callback) {
    process.nextTick(function() {
        self.width = edge;
        self.height = edge;
        callback(null);
    });
}

inherit(Rectangle, Square);

slasp.novel(Square, 2, function(err, result) {
    var s = result;
    s.calculateArea(function(err, result) {
        printOnConsole("Area is: "+result);
    });
});
