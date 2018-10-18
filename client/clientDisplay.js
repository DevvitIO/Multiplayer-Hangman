import * as socket from './clientSocket.js'; //submitGuess(letter); and setUsername(username);

export class clientDisplay {
  //This code alters the visuals/ui of the game.
  //Methods from this class are called from clientGame.js upon game-state changes.
  constructor(gameState) {
    //These DOM calls are temporary, as we will be switching to data-targets!
    this.gameMessage = document.querySelectorAll('*[data-game-message]')[0]; // These indexes mean there's no flexibility for now, as we need to wrap
    this.secretWord = document.querySelectorAll('[data-secret-word-display]')[0]; // Visible to user
    this.userGuesses = document.querySelectorAll('*[data-user-guesses]')[0];
    this.onlinePlayers = document.querySelectorAll('*[data-online-players]')[0];
    this.guessInput = document.querySelectorAll('*[data-guess-input]')[0];
    this.guessDisplay = document.querySelectorAll('*[data-guess-display]')[0];
    this.usernameInput = document.querySelectorAll('*[data-username-input]')[0];
    this.usernameSubmit = document.querySelectorAll('*[data-username-submit]')[0];
    this.playerList = document.querySelectorAll('*[data-player-list]')[0];
    var onlinePlayers = document.querySelectorAll('*[data-online-players]')[0];
    this.bodyParts = [
      'Head',
      'Torso',
      'Right_Arm',
      'Left_Arm',
      'Right_leg',
      'Left_Leg'
    ]; // Bodypart ID's, in order of reveal
    // this.secretWord = ""; // Don't think we need an HTML element when this will do.
    this.gameState = gameState;
    this.initDisplay();

  }

  initDisplay(gameState) {
    console.log(gameState);
    this.secretWord.innerHTML = this.gameState.blankword;
    this.userGuesses.innerHTML = this.gameState.guesses;

    //Updates styled Mystery Word
    var secretWordContainer = this.secretWord;
    this.secretWord.innerHTML = '';
    this.gameState.blankword.split(' ').forEach(function(l) {
      secretWordContainer.innerHTML +=
        '<span class="guess-letter">' + l.toUpperCase() + '</span>';
    });
    console.log('Display initialized.');
  }

  //Guess will be incorrect, correct, or invalid
  newGuess(data, guess) {
    this.secretWord.innerHTML = data.blankword;
    var secretWordContainer = this.secretWord;
    this.secretWord.innerHTML = '';
    data.blankword.split(' ').forEach(function(l) {
      secretWordContainer.innerHTML +=
        '<span class="guess-letter">' + l.toUpperCase() + '</span>';
    });
    this.userGuesses.innerHTML = 'Guesses: ' + data.guesses;
    console.log(data);
    if (guess == 'incorrect') {
      this.gameMessage.innerHTML =
        data.guesser +
        ' guessed incorrectly. There are ' +
        (6 - data.incorrect) +
        ' guesses left.';
    } else if (guess == 'correct') {
      this.gameMessage.innerHTML = data.guesser + ' guessed correctly!';
    } else if (guess == 'invalid') {
      this.gameMessage.innerHTML =
        'That is not a valid character to guess, or has already been guessed!';
    }
  }



  victory(){
      this.gameMessage.innerHTML =
        '<span style="color: green">' +
        data.guesser +
        ' guessed correctly to win the game! Victory!</span>';
  }

  newGame(){
      this.gameMessage.innerHTML = 'New game has started!';
  }

  defeat(){ 
      this.gameMessage.innerHTML =
        '<span style="color: red">' +
        data.guesser +
        ' guessed wrong. Game Over!</span>';
  }

  revealPart() {
    var currentPartID = this.bodyParts[this.gameState.incorrect - 1];
    var currentPartElem = document.getElementById(currentPartID);
    currentPartElem.style.opacity = '1'; // This function should live in clientDisplay
  }

  loadGame(guessStage) {
    //Loads hangman model accordingly to game state when you load the page
    var incorrectGuesses = this.gameState.incorrect;
    if (incorrectGuesses === 0) return;
    for (var i = 0; i < incorrectGuesses - 1; i++) {
      var currentPartID = this.bodyParts[i];
      var currentPartElem = document.getElementById(currentPartID);
      currentPartElem.style.opacity = '0';
    }
  }

  populatePlayers(playerNames) {
    // Accepts an array of players
    this.onlinePlayers.innerHTML = playerNames.count;
    this.playerList.innerHTML = playerNames.players;
  }

  showSecretWord(){
    var secretWordContainer = this.secretWord;
    this.secretWord.innerHTML = '';
    data.blankword.split(' ').forEach(function(l) {
      secretWordContainer.innerHTML +=
        '<span class="guess-letter">' + l.toUpperCase() + '</span>';
    });
  }

  reset() {
    // Reset the game
    console.log(this.gameState.incorrect);
    for (let part of this.bodyParts) {
      let partElem = document.getElementById(part);
      partElem.style.opacity = '0'; // This function should live in clientDisplay
    }
  }

  showGuess(letter){
    this.guessDisplay.innerHTML = letter;
  }

}
