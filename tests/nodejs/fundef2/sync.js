function generateWord(num) {
    if(num < 0 || num > 9) {
        throw "Cannot convert "+num+" into a word";
    } else {
        var words = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];
        return words[num];
    }
}

exports.generateWord = generateWord;
