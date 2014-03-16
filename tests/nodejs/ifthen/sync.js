var printOnConsole = require('../fundef/sync.js').printOnConsole;

function checkMe(name) {
    return name == "Sander"
}
    
var name = "Sander";
    
if(checkMe(name)) {
    printOnConsole("It's me!");
}

printOnConsole("That's all folks!");
