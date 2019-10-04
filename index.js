var Word = require('./word.js');
const inquirer = require('inquirer');
const words = require('an-array-of-english-words');
const colors = require('colors');

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
  // checks if input is one character, and a letter
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
      console.log(`\nIncorrect!\n`.red)
      guessesRemaining --;
      if (guessesRemaining === 0) {
        // lose if no guesses left, show word
        console.log(currentWord.returnFullWord());
        console.log(`\nYOU LOSE!\n`.bold.brightRed);
        playAgain();
      }
      // else continue game
      else {
        start();
      }
    }
    // if there are guesses remaining and also un-guessed letters, continue game
    else if (currentWord.returnWord().search("_") !== -1) {
      console.log(`\nCorrect!\n`.green)
      start();
    }
    // else user wins
    else {
      console.log(`\nCorrect!\n`.green)
      console.log(currentWord.returnWord());
      console.log(`\nYOU WIN!\n`.bold.brightGreen);
      playAgain();
    }
  });
};

start();