var Letter = require('./letter.js');

function Word(word) {
  this.letterArr = word.split('').map(function(value) {
    return new Letter(value);
  });
  this.returnWord = function() {
    let str = "";
    for (let i = 0; i < this.letterArr.length; i++) {
      str += this.letterArr[i].returnCharacter();
    }
    return str;
  };
  this.checkGuess = function(guess) {
    for (let i = 0; i < this.letterArr.length; i++) {
      this.letterArr[i].checkGuess(guess);
    }
    return "Checked!";
  };
};

module.exports = Word;