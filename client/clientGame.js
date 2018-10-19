import * as socket from './clientSocket.js';
var clientDisplay = require('./clientDisplay.js').clientDisplay;
var display = null;

export class clientGame {
  // This code should take a data object from the socket
  // run any logic the client needs, and bounce visual effects
  // to clientDisplay.

  constructor(gameInfo) {
    this.gameState = gameInfo;
    this.display = new clientDisplay(this.gameState);
    this.guessInput = document.querySelectorAll('*[data-guess-input]')[0];
    this.loadGame();
    this.initKeyboard();
  }

  useDisplay(function_name) {
    // Use this to send any events to the display for rendering/user visible events.
    this.display.gameState = this.gameState;
    this.display[function_name]();
  }

  loadGame() {
    //Initializes clientDisplay
    this.useDisplay('loadGame', this.gameState.incorrect );
  }

  incorrectGuess(data, status) {
    // In response to the server sending an incorrect guess event
    if (status === 'invalidGuess'){
      this.useDisplay('invalidGuess');
    } else if (status === 'incorrectGuess') {
      this.useDisplay('incorrectGuess');
    } else if (status === 'repeatGuess') {
      this.useDisplay('invalidGuess');
    }
    this.useDisplay('updatePastGuesses');
    this.useDisplay('revealPart');
  }

  correctGuess(data) {
    // In response to the server sending a correct guess event
    this.gameState = data;
    this.useDisplay('correctGuess');
  }

  endGame(data, status) {
    // In response to the server sending a finished game event
    this.useDisplay('updateSecretWord');
    this.useDisplay('updatePastGuesses');
    if (status === 'victory') {
      this.useDisplay('victory');
      this.useDisplay('reset');
    } else if (status === 'gameOver') {
      this.useDisplay('defeat');
      this.useDisplay('reset');
    } else if (status === 'newGame') {
      this.useDisplay('newGame');
      this.useDisplay('reset');
      this.gameState = data;
    }
  }

  updatePlayers(data) {
    // Update the player list
    this.display.updatePlayers(data);
  }

  submitGuess(letter, gameState=null) {
    // Submit a guess to the server ( if it passes client side validation )
    var isAValidCharacter = /^[a-zA-Z]*$/.test(letter) === true && letter != '';
    var isAnInvalidCharacter = /^[a-zA-Z]*$/.test(letter) === false || letter == '';
    if (isAValidCharacter) {
      let guessFound = this.gameState.guesses.find(guess => {
        return guess === letter;
      });
      if (guessFound === letter) {
        this.useDisplay('updateSecretWord');
        return;
      }
      socket.sendToServer('newGuess', letter);
    } else if (isAnInvalidCharacter) {
        this.display.newGuess(this.gameState, 'invalid');
      return;
    }
  }

  initKeyboard() {
    // Initialize any special keypresses
    var self = this;
    var display = this.display;
    var gameState = this.gameState;
    var guessInput = this.guessInput;
    document.onkeydown = function(e) {
      if (e.keyCode == 13) { // Enter
        self.submitGuess(guessInput.value); // Refers to a hidden input element
      }
      var isLowercaseLetter = 65 <= e.keyCode && e.keyCode <= 90; // Only lowercase seems to be necessary due to onkeydown
      if (isLowercaseLetter) {
        guessInput.value = e.key;
        display.showGuess(e.key);
      }
    };
  }
}
