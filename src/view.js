import {addEvent} from "./helpers";

import './styles/game-view.scss';

export default class View{
	constructor(){
		console.log("View loaded");

		this.guessInput = document.getElementById('guessInput');
		this.guessSubmit = document.getElementById('guess-submit');
		this.secretWordContainer = document.getElementById('secret-word-container');
		this.gameViewContainer = document.getElementById('game-view-container');
		this.userGuesses = document.getElementById('user-guesses');
		this.gameMessage = document.getElementById('game-message');
	}

	/**
	 * Sets the game view, should also set the correct pieces of the hangman
	 */
	setGameView(){
		let img = document.createElement('img');
		img.setAttribute('src', require('./assets/img/bg.jpg'));
		img.id = 'game-view';
		this.gameViewContainer.appendChild(img);
		this.guessInput.maxLength = 1;
		
	}
	/**
	 * This displays the secret word as underscores. One underscore per letter.
	 * @param {Array} secretWord
	 */
	setSecretWordDisplay(secretWord){
		console.log("this view setSecretWord:", secretWord);
		let letterPlaces = '_';

		for(let i = 0; i < secretWord.length; i++){
			letterPlaces += ' _';
		}

		this.secretWordContainer.innerHTML = letterPlaces;
	}

	/**
	 *
	 * @param {string} secretWordUpdate - A string containing correct user guesses and remaining letters as underscores
	 * @param {Object} gameUpdate - Contains information on the current status of the game
	 * @param {string} gameUpdate.remainingGuesses - How many more times user can guess
	 * @param {Array} gameUpdate.userGuesses - Contains all of the user guesses
	 */
	updateSecretWordDisplay(secretWordUpdate, gameUpdate){
		this.secretWordContainer.innerHTML = secretWordUpdate;
		console.log("and the game status is..", gameUpdate);
		this.updateUserGuessDisplay(gameUpdate.userGuesses);
	}

	/**
	 * Displays and updates the user guesses on screen
	 * @param userGuesses
	 */
	updateUserGuessDisplay(userGuesses){
		this.userGuesses.innerHTML = `Your guesses so far: <span class='bold'>${userGuesses}</span>`;
	}

	/**
	 * Adds event listener to the submit button. Checks for input then tells controller to add guess
	 * @param {Function} handler
	 */

	bindSaveUserGuess(handler){
		addEvent(this.guessSubmit, 'click', (e) =>{
			const guessedLetter = this.guessInput.value.trim();
			if(guessedLetter){
				handler(this.guessInput.value)
			} else {
				console.log("no value submitted");
			}
		});

		document.addEventListener('keypress', (e) => {
			if (e.which == 13) {
				this.guessSubmit.click();
			}
		});
	}


}