var Word = require('./word.js');
var inquirer = require('inquirer');
const words = require('an-array-of-english-words')

var currentWord = new Word(words[Math.floor(Math.random() * words.length)]);
var guessesRemaining = 10;
var guessedLetters = [];

// prompts user to play again at game end
var playAgain = function() {
  inquirer.prompt([{
    type: "confirm",
    name: "answer",
    message: "Play again?"
  }]).then(function(response){
    if (response.answer === true) {
      guessesRemaining = 10;
      guessedLetters = [];
      currentWord = new Word(words[Math.floor(Math.random() * words.length)]);
      start();
    }
  });
}

var validateInput = function(input) {
  if (input.length === 1 && input.toLowerCase() !== input.toUpperCase()) {
    if (!guessedLetters.includes(input)) {
      return true;
    }
    else {
      return "Already guessed"
    }
  }
  else {
    return "Input must be a single letter";
  }
}

function start() {
  inquirer.prompt([{
    name: "guess",
    message: `Guess a letter!\nGuesses remaining: ${guessesRemaining}\n${currentWord.returnWord()}\n:`,
    validate: validateInput
  }]).then(function (guess) {
    // stores letter as guessed
    guessedLetters.push(guess.guess);
    // stores the state (with blanks) of the current word
    var currentWordState = currentWord.returnWord();
    // checks guess against letter object array
    currentWord.checkGuess(guess.guess);
    // checks to see if incorrect guess
    if (currentWordState === currentWord.returnWord()) {
      // reduces guessesRemaining
      guessesRemaining --;
      if (guessesRemaining === 0) {
        // lose if no guesses left, show word
        console.log(currentWord.returnFullWord());
        console.log("You lose!");
        playAgain();
      }
      // else continue game
      else {
        start();
      }
    }
    // if there are guesses remaining and also un-guessed letters, continue game
    else if (currentWord.returnWord().search("_") !== -1) {
      start();
    }
    // else user wins
    else {
      console.log(currentWord.returnWord());
      console.log("You win!");
      playAgain();
    }
  });
};

start();