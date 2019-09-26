var Letter = require('./letter.js');

function Word(word) {
  // initializes number of allowed guesses
  this.guessesLeft = 10;
  // builds array of letter objects based on input word
  this.letterArr = word.split('').map(function(value) {
    return new Letter(value);
  });
  // returns word with blanks as appropriate to what user has guessed
  this.returnWord = function() {
    let str = [];
    for (let i = 0; i < this.letterArr.length; i++) {
      str.push(this.letterArr[i].returnCharacter());
    }
    return str.join(' ');
  };
  // runs a user input through array of letter objects
  this.checkGuess = function(guess) {
    // iterates through letter objects to check if they match guess
    for (let i = 0; i < this.letterArr.length; i++) {
      this.letterArr[i].checkGuess(guess);
    }
    return "Checked!";
  };
  // shows full word on user loss
  this.returnFullWord = function() {
    let str = [];
    for (let i = 0; i < this.letterArr.length; i++) {
      str.push(this.letterArr[i].letter);
    }
    return str.join(' ');
  }
};

module.exports = Word;