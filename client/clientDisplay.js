import * as socket from './clientSocket.js';//submitGuess(letter); and setUsername(username);

export class clientDisplay {
    //This code alters the visuals/ui of the game.
    //Methods from this class are called from clientGame.js upon game-state changes.
    constructor(gameState) {
        //These DOM calls are temporary, as we will be switching to data-targets!
        this.gameMessage = document.getElementById('game-message');
        this.secretWord = document.getElementById('secret-word-container');
        this.testt = document.getElementById('secret-word-container-style');
        this.userGuesses = document.getElementById('user-guesses');
        this.onlinePlayers = document.getElementById('onlinePlayers');
        this.guessInput = document.getElementById('guessInput');
        this.usernameInput = document.getElementById('usernameInput');
        this.guessSubmit = document.getElementById('guess-submit');
        this.usernameSubmit = document.getElementById('username-submit');
        this.initDisplay(gameState);      
    }

    initDisplay(gameState) {
        this.secretWord.innerHTML = gameState.blankword;
        this.userGuesses.innerHTML = gameState.guesses;

        //Updates styled Mystery Word
        var secretWordContainer = this.testt;
        this.testt.innerHTML = '';
        gameState.blankword.split(' ').forEach(function(l){
            secretWordContainer.innerHTML += '<span class="guess-letter">' + l.toUpperCase() + '</span>';
        });
        console.log('Display initialized.');
    }

    //Guess will be incorrect, correct, or invalid
    newGuess(data, guess) {
        this.secretWord.innerHTML = data.blankword;
        var secretWordContainer = this.testt;
        this.testt.innerHTML = '';
        data.blankword.split(' ').forEach(function(l){
            secretWordContainer.innerHTML += '<span class="guess-letter">' + l.toUpperCase() + '</span>';
        });
        this.userGuesses.innerHTML = 'Guesses: ' + data.guesses;
        console.log(data);
        if(guess == 'incorrect'){
            this.gameMessage.innerHTML = data.guesser + ' guessed incorrectly. There are ' + (6 - data.incorrect) + ' guesses left.';
        } else if(guess == 'correct'){
            this.gameMessage.innerHTML = data.guesser + ' guessed correctly!';
        } else if(guess == 'invalid'){
            this.gameMessage.innerHTML = "That is not a valid character to guess, or has already been guessed!";
        }
    }

    //Status will be victory, gameOver, or newGame
    endGame(data, status) {
        this.guessSubmit.disabled = true;
        this.secretWord.innerHTML = data.blankword;
        this.userGuesses.innerHTML = 'Guesses: ' + data.guesses;
        if(status === 'victory'){
            this.gameMessage.innerHTML = '<span style="color: green">' + data.guesser + ' guessed correctly to win the game! Victory!</span>';
        } else if(status === 'gameOver'){
            this.gameMessage.innerHTML = '<span style="color: red">' + data.guesser + ' guessed wrong. Game Over!</span>';
        } else if(status === 'newGame'){
            this.guessSubmit.disabled = false;
            this.gameMessage.innerHTML = 'New game has started!';
        }
        var secretWordContainer = this.testt;
        this.testt.innerHTML = '';
        data.blankword.split(' ').forEach(function(l){
            secretWordContainer.innerHTML += '<span class="guess-letter">' + l.toUpperCase() + '</span>';
        });
    }

}