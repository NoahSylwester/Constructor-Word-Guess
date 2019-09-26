function Letter(character) {
  this.letter = character;
  this.isGuessed = false;
  this.returnCharacter = function() {
    if (this.isGuessed === true) {
      return this.letter;
    }
    else {
      return "_";
    }
  }
  this.checkGuess = function(guess) {
    if (guess === this.letter) {
      this.isGuessed = true;
    }
  }
}

module.exports = Letter;