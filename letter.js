function Letter(character) {
  // store input as 'correct' character
  this.letter = character;
  // store whether or not the character has been guessed
  this.isGuessed = false;
  // return function conditional upon isGuessed state
  this.returnCharacter = function() {
    if (this.isGuessed === true) {
      return this.letter;
    }
    else {
      return "_";
    }
  }
  // checks if user guessed correctly
  this.checkGuess = function(guess) {
    if (guess === this.letter) {
      this.isGuessed = true;
    }
  }
}

module.exports = Letter;