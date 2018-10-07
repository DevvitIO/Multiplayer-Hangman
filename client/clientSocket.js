var io = require("socket.io-client");
var socket = io('http://localhost:5000');
var clientGame = require('./clientGame.js').clientGame;
var game = null;

let gameMessage = document.getElementById('game-message');
let secretWord = document.getElementById('secret-word-container');
let userGuesses = document.getElementById('user-guesses');
let onlinePlayers = document.getElementById('onlinePlayers');
let guessInput = document.getElementById('guessInput');
let usernameInput = document.getElementById('usernameInput');
let guessSubmit = document.getElementById('guess-submit');
let usernameSubmit = document.getElementById('username-submit');

guessSubmit.addEventListener('click', function(){
    submitGuess(guessInput.value);
    guessInput.value = '';
});

usernameSubmit.addEventListener('click', function(){
    setUsername(usernameInput.value);
});

export function setUsername(username) {
	socket.emit('setUsername', username);
}

export function submitGuess(letter) {
	let guessFound = userGuesses.innerHTML.split(',').find((guess) => {
      return guess === letter;
    });
    if(guessFound === letter){
    	gameMessage.innerHTML = "That letter has already been guessed!";
    	return;
    }
	socket.emit('newGuess', letter);
}

export function updateGameState(data) {
	secretWord.innerHTML = data.blankword;
	// console.log(data);
	userGuesses.innerHTML = 'Guesses: ' + data.guesses;
}

socket.on('playersOnline', function(count){
	onlinePlayers.innerHTML = count;
});

socket.on('gameInformation', (data) => {
	game = new clientGame(data.incorrect, data);
	updateGameState(data);
});

socket.on('repeatGuess', (data) => {
	gameMessage.innerHTML = "That letter has already been guessed!";
});

socket.on('invalidCharacter', (data) => {
	gameMessage.innerHTML = "That letter has invalid";
});


socket.on('incorrectGuess', (data) => {
	game.gameStateUpdate(data);
	// updateGameState(data);
	gameMessage.innerHTML = data.guesser + ' guessed incorrectly. There are ' + (6 - data.incorrect) + ' guesses left.';
	game.revealPart();
});

socket.on('correctGuess', (data) => {
	game.gameStateUpdate(data);
	// updateGameState(data);
	gameMessage.innerHTML = data.guesser + ' guessed correctly!';
});

socket.on('victory', (data) => {
	guessSubmit.disabled = true;
	updateGameState(data);
	gameMessage.innerHTML = '<span style="color: green">' + data.guesser + ' guessed correctly to win the game! Victory!</span>';
});

socket.on('gameOver', (data) => {
	guessSubmit.disabled = true;
	updateGameState(data);
	gameMessage.innerHTML = '<span style="color: red">' + data.guesser + ' guessed wrong. Game Over!</span>';
	game.revealPart();
});

socket.on('newGame', (data) => {
	guessSubmit.disabled = false;
	updateGameState(data);
	gameMessage.innerHTML = 'New game has started!';
	game.reset();
});