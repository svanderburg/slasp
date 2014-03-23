function generateWord(num, callback) {
    var words;
    process.nextTick(function() {
        if(num < 0 || num > 9) {
            callback("Cannot convert "+num+" into a word");
        } else {
            words = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];
            callback(null, words[num]);
        }
    });
}

exports.generateWord = generateWord;
