import * as socket from './clientSocket.js'; //submitGuess(letter); and setUsername(username);

export class clientDisplay {
  // This code alters the visuals/ui of the game.
  // Methods from this class are called from clientGame.js upon game-state changes.
  // The display does have access to the gameState data directly

  constructor(gameState) {
    this.gameMessage = document.querySelectorAll('*[data-game-message]')[0]; // These indexes mean there's no flexibility for now, as we need to wrap
    this.secretWord = document.querySelectorAll('[data-secret-word-display]')[0]; // Visible to user
    this.userGuesses = document.querySelectorAll('*[data-user-guesses]')[0];
    this.onlinePlayers = document.querySelectorAll('*[data-online-players]')[0];
    this.guessDisplay = document.querySelectorAll('*[data-guess-display]')[0];
    this.usernameInput = document.querySelectorAll('*[data-username-input]')[0];
    this.usernameSubmit = document.querySelectorAll('*[data-username-submit]')[0];
    this.playerList = document.querySelectorAll('*[data-player-list]')[0];
    var onlinePlayers = document.querySelectorAll('*[data-online-players]')[0];
    this.bodyParts = ['Head', 'Torso', 'Right_Arm', 'Left_Arm', 'Right_leg', 'Left_Leg']; // Bodypart ID's, in order of reveal
    this.gameState = gameState;
    this.reset();
    this.loadGame();
  }

  incorrectGuess() {
    // display actions for an incorrect guess
    this.gameMessage.innerHTML = this.gameState.guesser + ' guessed incorrectly. There are ' + (6 - this.gameState.incorrect) + ' guesses left.';
    this.revealPart();
  }

  invalidGuess() {
    // display actions for an invalid guess
    this.gameMessage.innerHTML = 'That is not a valid character to guess, or has already been guessed!';
    this.revealPart();
  }

  correctGuess() {
    // display actions for a correct guess
    this.gameMessage.innerHTML = this.gameState.guesser + ' guessed correctly!';
    this.updateSecretWord();
  }

  victory() {
    // display actions for a victory game case
    this.gameMessage.innerHTML = '<span style="color: green">' + data.guesser + ' guessed correctly to win the game! Victory!</span>';
  }

  newGame() {
    // display actions for a new game case
    this.gameMessage.innerHTML = 'New game has started!';
  }

  defeat() {
    // Display actions for a defeat case
    this.gameMessage.innerHTML = '<span style="color: red">' + this.gameState.guesser + ' guessed wrong. Game Over!</span>';
  }

  revealPart() {
    // Reveal a bodypart
    var currentPartID = this.bodyParts[this.gameState.incorrect - 1];
    var currentPartElem = document.getElementById(currentPartID);
    currentPartElem.style.opacity = '1'; // This function should live in clientDisplay
  }

  hidePart(partElement) {
    // Hide a bodypart
    partElement.style.opacity = '0';
  }

  loadGame(guessStage) {
    //Loads hangman model accordingly to game state when you load the page
    var incorrectGuesses = this.gameState.incorrect;
    if (incorrectGuesses === 0) return;
    for (var i = 0; i < incorrectGuesses; i++) {
      var currentPartID = this.bodyParts[i];
      var currentPartElem = document.getElementById(currentPartID);
      currentPartElem.style.opacity = '1';
    }
  }

  reset() {
    // Everything needed to reset the game board fully
    for (let part of this.bodyParts) {
      let partElement = document.getElementById(part);
      this.hidePart(partElement);
    }
    this.userGuesses.innerHTML = '';
    this.updateSecretWord();
  }

  updatePastGuesses() {
    // Display previously guessed letters
    this.userGuesses.innerHTML = 'Guesses: ' + this.gameState.guesses;
  }

  updatePlayers(playerNames) {
    // Accepts an array of players
    this.onlinePlayers.innerHTML = playerNames.count;
    this.playerList.innerHTML = playerNames.players;
  }

  updateSecretWord() {
    //
    var secretWordContainer = this.secretWord;
    this.secretWord.innerHTML = '';
    this.gameState.blankword.split(' ').forEach(function(l) {
      secretWordContainer.innerHTML += '<span class="guess-letter">' + l.toUpperCase() + '</span>';
    });
  }

  showGuess(letter) {
    // Shows the current letter a user has selected
    this.guessDisplay.innerHTML = letter;
  }
}
