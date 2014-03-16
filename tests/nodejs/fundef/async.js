function printOnConsole(value, callback) {
    process.nextTick(function() {
        console.log(value);
        if(typeof callback == "function")
            callback(null);
    });
}

exports.printOnConsole = printOnConsole;
