import * as socket from './clientSocket.js';
var clientDisplay = require('./clientDisplay.js').clientDisplay;
var display = null;
export class clientGame {
    // This code should take a data object from the socket
    // run any logic the client needs, and bounce visual effects
    // to clientDisplay. 

    // Good questions might be 
    // - what if we wanted a specific animation for a specific part
    // - does someone working on the logic have to understand the networking?
    // - Same applies to graphical effects and logic
    constructor(gameInfo) {
        this.bodyParts = ['Head',
                          'Torso', 
                          'Right_Arm', 
                          'Left_Arm', 
                          'Right_leg', 
                          'Left_Leg'
                         ]; // Bodypart ID's, in order of reveal
        this.partIndex = gameInfo.incorrect;
        this.gameState = gameInfo;
        // this.display = new clientDisplay(gameInfo);
        this.loadGame();       
    }



    loadGame() {
        //Initializes clientDisplay
        display = new clientDisplay(this.gameState);
        //Loads hangman model accordingly to game state when you load the page
        if(this.partIndex === 0) return;
        for(var i = 0; i < this.partIndex; i++){
            var currentPartID = this.bodyParts[i];
            var currentPartElem = document.getElementById(currentPartID);
            currentPartElem.style.display = "block";
        }
        //Updates user guesses
        display.userGuesses.innerHTML = this.gameState.guesses;
    }

    revealPart() {
        var currentPartID = this.bodyParts[this.partIndex];
        var currentPartElem = document.getElementById(currentPartID);
        currentPartElem.style.display = "block"; // This should really bounce to another file dedicated to graphics
        this.partIndex += 1;
    }

    reset() {
        this.partIndex = 0;
        for (let part of this.bodyParts) {
            let partElem = document.getElementById(part);
            console.log(partElem);
            partElem.style.display = "none"; // Should bounce to display scripts
        }
    }

    incorrectGuess(data) {
        this.gameState = data;
        display.newGuess(data, 'incorrect');
        // this.display.secretWord.innerHTML = data.blankword;
        // this.display.userGuesses.innerHTML = 'Guesses: ' + data.guesses;
        // this.display.gameMessage.innerHTML = data.guesser + ' guessed incorrectly. There are ' + (6 - data.incorrect) + ' guesses left.';
        this.revealPart();
    }

    correctGuess(data) {
        this.gameState = data;
        display.newGuess(data, 'correct');
        // this.display.secretWord.innerHTML = data.blankword;
        // this.display.userGuesses.innerHTML = 'Guesses: ' + data.guesses;
        // this.display.gameMessage.innerHTML = data.guesser + ' guessed correctly!';
    }

    gameOver(data) {
        this.revealPart();
        display.endGame(data, 'gameOver');
        // this.display.guessSubmit.disabled = true;
        // this.display.secretWord.innerHTML = data.blankword;
        // this.display.userGuesses.innerHTML = 'Guesses: ' + data.guesses;
        // this.display.gameMessage.innerHTML = '<span style="color: red">' + data.guesser + ' guessed wrong. Game Over!</span>';
    }

    victory(data) {
        display.endGame(data, 'victory');
        // this.display.guessSubmit.disabled = true;
        // this.display.secretWord.innerHTML = data.blankword;
        // this.display.userGuesses.innerHTML = 'Guesses: ' + data.guesses;
        // this.display.gameMessage.innerHTML = '<span style="color: green">' + data.guesser + ' guessed correctly to win the game! Victory!</span>';
    }

    newGame(data) {
        display.endGame(data, 'newGame');
        // this.display.guessSubmit.disabled = false;
        // this.display.secretWord.innerHTML = data.blankword;
        // this.display.userGuesses.innerHTML = 'Guesses: ' + data.guesses;
        // this.display.gameMessage.innerHTML = 'New game has started!';
        this.reset();
        this.gameState = data;
    }

    invalidGuess() {
        // this.display.gameMessage.innerHTML = "That is not a valid character to guess, or has already been guessed!";
        display.newGuess(this.gameState, 'invalid');
    }
}