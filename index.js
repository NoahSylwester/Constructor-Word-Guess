var Word = require('./word.js');
var inquirer = require('inquirer');

var words = ['miguel', 'sucks', 'penis'];

var chosenWord = new Word(words[Math.floor(Math.random() * words.length)]);

function start() {
  inquirer.prompt([{
    name: "guess",
    message: "Guess a letter, chump."
  }]).then(function (guess) {
    chosenWord.checkGuess(guess.guess);
    console.log(chosenWord.returnWord());
    if (chosenWord.returnWord().search("_") !== -1) {
      start();
    }
    else {
      console.log("You win!");
    }
  });
};

start();