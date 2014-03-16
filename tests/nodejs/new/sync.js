var printOnConsole = require('../fundef/sync.js').printOnConsole;

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.calculateArea = function() {
    return this.width * this.height;
};

var r = new Rectangle(2, 2);

printOnConsole("Area is: "+r.calculateArea());
