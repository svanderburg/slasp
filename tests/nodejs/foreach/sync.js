var printOnConsole = require('../fundef/sync.js').printOnConsole;

function getFruitPrices() {
    return {
        "apples": 1.0,
        "pears": 0.9,
        "oranges": 1.1
    };
}

for(var varName in getFruitPrices()) {
    printOnConsole(varName);
}
