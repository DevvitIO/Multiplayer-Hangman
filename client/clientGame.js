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
    this.gameState = gameInfo;
    this.display = new clientDisplay(this.gameState);

    this.loadGame();
  }

  setDisplay(function_name) {
    // Use to run any display functions. Passes an up to date copy of gameState.
    this.display.gameState = this.gameState;
    this.display[function_name]();
  }

  loadGame() {
    //Initializes clientDisplay
    this.display.partIndex = this.gameState.incorrect; // Tell display to render parts based on failed guesses
    this.setDisplay('loadGame');
  }

  reset() {
    this.setDisplay('reset');
  }

  incorrectGuess(data) {
    this.gameState = data;
    this.display.newGuess(data, 'incorrect');
    this.setDisplay('revealPart');
  }

  correctGuess(data) {
    this.gameState = data;
    this.display.newGuess(data, 'correct');
  }

  invalidGuess() {
    this.display.newGuess(this.gameState, 'invalid');
  }

  gameOver(data) {
    this.setDisplay('reset');
    this.display.endGame(data, 'gameOver');
  }

  victory(data) {
    this.display.endGame(data, 'victory');
  }

  newGame(data) {
    this.display.endGame(data, 'newGame');
    this.reset();
    this.gameState = data;
  }
}
