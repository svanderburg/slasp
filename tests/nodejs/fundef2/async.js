function generateWord(num, callback) {
    var words;
    process.nextTick(function() {
        words = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];
        if(typeof callback == "function")
            callback(null, words[num]);
    });
}

exports.generateWord = generateWord;
