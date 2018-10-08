var io = require("socket.io-client");
var socket = io('http://localhost:5000');
var clientGame = require('./clientGame.js').clientGame;
var game = null;
var onlinePlayers = document.getElementById('onlinePlayers');

var guessSubmit = document.getElementById('guess-submit');
        var guessInput = document.getElementById('guessInput');
        guessSubmit.addEventListener('click', function(){
            submitGuess(guessInput.value);
            guessInput.value = '';
        });

export function setUsername(username) {
	socket.emit('setUsername', username);
}

export function submitGuess(letter) {
	if(/^[a-zA-Z]*$/.test(letter) === true && letter != ''){
		let guessFound = game.gameState.guesses.find((guess) => {
	      return guess === letter;
	    });
	    if(guessFound === letter){
	    	game.invalidGuess();
	    	return;
	    }
		socket.emit('newGuess', letter);
	} else if(/^[a-zA-Z]*$/.test(letter) === false || letter == ''){
		game.invalidGuess();
		return;
	}
	
}

socket.on('playersOnline', function(count){
	onlinePlayers.innerHTML = count;
});

socket.on('gameInformation', (data) => {
	game = new clientGame(data); //passing data allows correct rendering of current games hangman
});

socket.on('repeatGuess', (data) => {
	game.invalidGuess();
});

socket.on('invalidCharacter', (data) => {
	game.invalidGuess();
});


socket.on('incorrectGuess', (data) => {
	game.incorrectGuess(data);
});

socket.on('correctGuess', (data) => {
	game.correctGuess(data);
});

socket.on('victory', (data) => {
	game.victory(data);
});

socket.on('gameOver', (data) => {
	game.gameOver(data);
});

socket.on('newGame', (data) => {
	game.newGame(data);
});