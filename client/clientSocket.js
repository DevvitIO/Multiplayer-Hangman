var io = require("socket.io-client");
var socket = io('http://localhost:5000');
var clientGame = require('./clientGame.js').clientGame;
var game = null;
var onlinePlayers = document.querySelectorAll('*[data-online-players]')[0];

var guessSubmit = document.querySelectorAll('*[data-guess-submit]')[0];
		var guessInput = document.querySelectorAll('[data-guess-input]')[0];
		console.log(guessInput);
        guessSubmit.addEventListener('click', function(){
            submitGuess(guessInput.value);
            guessInput.value = '';
		});
		// Initialize any special keypresses
		document.onkeydown = function(e){ // This isn't the right place for this, but since the guess submit events are hooked in here, and
            if (e.keyCode == 13) {		  // the data isn't available elsewhere, it is temporarily here.
                submitGuess();
			}
			var isLowercaseLetter = 65 < e.keyCode && e.keyCode < 90;
			var isUppercaseLetter = 97 < e.keyCode && e.keyCode < 122;
			if (isLowercaseLetter || isUppercaseLetter ) {
				guessInput.value = e.key;
			}
        }; 

export function setUsername(username) {
	socket.emit('setUsername', username);
}

export function submitGuess() {
	var letter = guessInput.value;
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

// I take it the events below are going to be migrated into the event above ^ and passed to game to handle it's own events
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

