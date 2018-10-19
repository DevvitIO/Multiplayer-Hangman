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
  newGuess(guess) {
    var secretWordContainer = this.secretWord;
    this.secretWord.innerHTML = '';
    this.gameState.blankword.split(' ').forEach(function(l) {
      secretWordContainer.innerHTML +=
        '<span class="guess-letter">' + l.toUpperCase() + '</span>';
    });
    this.userGuesses.innerHTML = 'Guesses: ' + this.gameState.guesses;
  }

  incorrectGuess(){
      this.gameMessage.innerHTML = this.gameState.guesser + ' guessed incorrectly. There are ' + (6 - this.gameState.incorrect) + ' guesses left.';
      this.revealPart();
  }

  invalidGuess(){
      this.gameMessage.innerHTML =
        'That is not a valid character to guess, or has already been guessed!';
        this.revealPart();
  }

  correctGuess(){
      this.gameMessage.innerHTML = this.gameState.guesser + ' guessed correctly!';
      
  }

  victory(){
      this.gameMessage.innerHTML =
        '<span style="color: green">' +
        data.guesser +
        ' guessed correctly to win the game! Victory!</span>';
  }

  newGame(){
      this.gameMessage.innerHTML = 'New game has started!';
      this.reset();
  }

  defeat(){ 
      this.gameMessage.innerHTML =
        '<span style="color: red">' +
        this.gameState.guesser +
        ' guessed wrong. Game Over!</span>';
      this.reset();
  }

  revealPart() {
    var currentPartID = this.bodyParts[this.gameState.incorrect - 1];
    var currentPartElem = document.getElementById(currentPartID);
    currentPartElem.style.opacity = '1'; // This function should live in clientDisplay
  }

  loadGame(guessStage) {
    //Loads hangman model accordingly to game state when you load the page
    console.log("Guess stage: " , this.gameState.incorrect);
    var incorrectGuesses = this.gameState.incorrect;
    if (incorrectGuesses === 0) return;
    for (var i = 0; i < incorrectGuesses - 1; i++) {
      console.log(i);
      var currentPartID = this.bodyParts[i];
      var currentPartElem = document.getElementById(currentPartID);
      currentPartElem.style.opacity = '1';
    }
  }



  showSecretWord(){
    var secretWordContainer = this.secretWord;
    this.secretWord.innerHTML = '';
    this.gameState.blankword.split(' ').forEach(function(l) {
      secretWordContainer.innerHTML +=
        '<span class="guess-letter">' + l.toUpperCase() + '</span>';
    });
  }

  reset() {
    // Everything that needs to be done to reset the game board fully
    console.log(this.gameState.incorrect);
    for (let part of this.bodyParts) {
      let partElem = document.getElementById(part);
      partElem.style.opacity = '0'; // This function should live in clientDisplay
    }
    this.userGuesses.innerHTML = "";
    this.showSecretWord();
    this.updateBlankWord(); 
  }

  updatePastGuesses(){
    this.userGuesses.innerHTML = 'Guesses: ' + this.gameState.guesses;
  }

  updateBlankWord(){
    var secretWordContainer = this.secretWord;
    this.gameState.blankword .split(' ').forEach(function(l) {
      secretWordContainer.innerHTML +=
        '<span class="guess-letter">' + l.toUpperCase() + '</span>';
    });
  }

  updatePlayers(playerNames) {
    // Accepts an array of players
    this.onlinePlayers.innerHTML = playerNames.count;
    this.playerList.innerHTML = playerNames.players;
  }

  showGuess(letter){
    this.guessDisplay.innerHTML = letter;
  }

  invalidGuess(){
    console.log("invalid guess");
    // Display invalid guess notice
  }



}
