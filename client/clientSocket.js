var socket = io('http://localhost:5000');

document.getElementById("guess-submit").addEventListener("click", function(){
    submitGuess(document.getElementById("guessInput").value);
});

document.getElementById("username-submit").addEventListener("click", function(){
    setUsername(document.getElementById("usernameInput").value);
});

function setUsername(username) {
	// let username = document.getElementById("usernameInput").value;
	socket.emit('setUsername', username);
}

function submitGuess(letter) {
	// let letter = document.getElementById("guessInput").value;
	socket.emit('newGuess', letter);
}

socket.on('playersOnline', function(count){
	document.getElementById('onlinePlayers').innerHTML = count;
});