var socket = io('http://localhost:5000');

document.getElementById('guess-submit').addEventListener('click', function(){
    submitGuess(document.getElementById('guessInput').value);
    document.getElementById('guessInput').value = '';
});

document.getElementById('username-submit').addEventListener('click', function(){
    setUsername(document.getElementById('usernameInput').value);
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
	document.getElementById('secret-word-container').innerHTML = data.blankword;
	document.getElementById('user-guesses').innerHTML = 'Guesses: ' + data.guesses;
}

socket.on('playersOnline', function(count){
	document.getElementById('onlinePlayers').innerHTML = count;
});

socket.on('gameInformation', (data) => {
	updateGameState(data);
});

socket.on('repeatGuess', (data) => {
	document.getElementById('game-message').innerHTML = "That letter has already been guessed. Try again!";
});

socket.on('incorrectGuess', (data) => {
	console.log(data);
	updateGameState(data);
	document.getElementById('game-message').innerHTML = data.guesser + ' guessed incorrectly. There are ' + (6 - data.incorrect) + ' guesses left.';
});

socket.on('correctGuess', (data) => {
	console.log(data);
	updateGameState(data);
	document.getElementById('game-message').innerHTML = data.guesser + ' guessed correctly!';
});

socket.on('victory', (data) => {
	updateGameState(data);
	document.getElementById('game-message').innerHTML = '<span style="color: green">' + data.guesser + ' guessed correctly to win the game! Victory!</span>';
});

socket.on('gameOver', (data) => {
	updateGameState(data);
	document.getElementById('game-message').innerHTML = '<span style="color: red">' + data.guesser + ' guessed wrong. Game Over!</span>';
});

socket.on('newGame', (data) => {
	updateGameState(data);
	document.getElementById('game-message').innerHTML = 'New game has started!';
});