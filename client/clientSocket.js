var io = require("socket.io-client");
var socket = io('http://localhost:5000');

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

function setUsername(username) {
	// let username = document.getElementById("usernameInput").value;
	socket.emit('setUsername', username);
}

function submitGuess(letter) {
	// let letter = document.getElementById("guessInput").value;
	socket.emit('newGuess', letter);
}

function updateGameState(data) {
	secretWord.innerHTML = data.blankword;
	userGuesses.innerHTML = 'Guesses: ' + data.guesses;
}

socket.on('playersOnline', function(count){
	onlinePlayers.innerHTML = count;
});

socket.on('gameInformation', (data) => {
	updateGameState(data);
});

socket.on('repeatGuess', (data) => {
	gameMessage.innerHTML = "That letter has already been guessed. Try again!";
});

socket.on('incorrectGuess', (data) => {
	console.log(data);
	updateGameState(data);
	gameMessage.innerHTML = data.guesser + ' guessed incorrectly. There are ' + (6 - data.incorrect) + ' guesses left.';
});

socket.on('correctGuess', (data) => {
	console.log(data);
	updateGameState(data);
	gameMessage.innerHTML = data.guesser + ' guessed correctly!';
});

socket.on('victory', (data) => {
	updateGameState(data);
	gameMessage.innerHTML = '<span style="color: green">' + data.guesser + ' guessed correctly to win the game! Victory!</span>';
});

socket.on('gameOver', (data) => {
	updateGameState(data);
	gameMessage.innerHTML = '<span style="color: red">' + data.guesser + ' guessed wrong. Game Over!</span>';
});

socket.on('newGame', (data) => {
	updateGameState(data);
	gameMessage.innerHTML = 'New game has started!';
});