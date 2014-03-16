var printOnConsole = require('../fundef/sync.js').printOnConsole;

function inherit(parent, child) {
    function F() {};
    F.prototype = parent.prototype; 
    child.prototype = new F();
    child.prototype.constructor = child;
}

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.calculateArea = function() {
    return this.width * this.height;
};

function Square(edge) {
    this.width = edge;
    this.height = edge;
}

inherit(Rectangle, Square);

var s = new Square(2);
var result = s.calculateArea();
printOnConsole("Area is: "+result);
