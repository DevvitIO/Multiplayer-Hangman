var io = require('socket.io-client');
var socket = io('http://localhost:5000');
var clientGame = require('./clientGame.js').clientGame;
var game = null;

export function setUsername(username) {
  socket.emit('setUsername', username);
}

export function sendToServer(eventName, data = null) {
  // Can be deleted if we migrate to passing data directly to clientGame.js
  socket.emit(eventName, data);
}

socket.on('playersOnline', data => {
  game.updatePlayers(data);
});

socket.on('gameInformation', data => {
  game = new clientGame(data); //passing data allows correct rendering of current games hangman
});

// I take it the events below are going to be migrated into the event above ^ and passed to game to handle it's own events
socket.on('repeatGuess', data => {
  game.gameState = data;
  game.incorrectGuess(data, 'invalidGuess');
});

socket.on('invalidCharacter', data => {
  console.log("Invalid char: ", data);
  game.gameState = data;
  game.incorrectGuess(data, 'invalidGuess');
});

socket.on('incorrectGuess', data => {
  
  console.log("Incorrect guess sock: ", data);
  game.gameState = data;
  game.incorrectGuess(data, 'incorrectGuess');
});

socket.on('correctGuess', data => {
  game.gameState = data;
  console.log("Correct guess data: ", data);
  game.correctGuess(data);
});

socket.on('victory', data => {
  game.gameState = data;
  game.endGame(data, 'Victory');
});

socket.on('gameOver', data => {
  game.gameState = data;
  game.endGame(data, 'gameOver');
});

socket.on('newGame', data => {
  game.gameState = data;
  game.endGame(data, 'newGame');
});
