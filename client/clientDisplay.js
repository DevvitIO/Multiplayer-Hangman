import * as socket from './clientSocket.js';//submitGuess(letter); and setUsername(username);

export class clientDisplay {
    //This code alters the visuals/ui of the game.
    //Methods from this class are called from clientGame.js upon game-state changes.
    constructor(gameState) {
        //These DOM calls are temporary, as we will be switching to data-targets!
        this.gameMessage = document.getElementById('game-message');
        this.secretWord = document.getElementById('secret-word-container');
        this.userGuesses = document.getElementById('user-guesses');
        this.onlinePlayers = document.getElementById('onlinePlayers');
        this.guessInput = document.getElementById('guessInput');
        this.usernameInput = document.getElementById('usernameInput');
        this.guessSubmit = document.getElementById('guess-submit');
        this.usernameSubmit = document.getElementById('username-submit');
        this.initDisplay(gameState);      
    }

    initDisplay(gameState) {
        console.log('Display initialized.');
        this.secretWord.innerHTML = gameState.blankword;
        this.userGuesses.innerHTML = gameState.guesses;
        console.log(gameState);
    }

    //Guess will be incorrect, correct, or invalid
    newGuess(data, guess) {
        this.secretWord.innerHTML = data.blankword;
        this.userGuesses.innerHTML = 'Guesses: ' + data.guesses;
        console.log(data);
        if(guess == 'incorrect'){
            this.gameMessage.innerHTML = data.guesser + ' guessed incorrectly. There are ' + (6 - data.incorrect) + ' guesses left.';
        } else if(guess == 'correct'){
            this.gameMessage.innerHTML = data.guesser + ' guessed correctly!';
        } else if(guess == 'invalid'){
            this.gameMessage.innerHTML = "That is not a valid character to guess, or has already been guessed!";
        } else{
            console.log(data);
            console.log('=-=====================');
            console.log(guess);
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
    }

}