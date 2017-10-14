import {addEvent} from "./helpers";

export default class View{
	constructor(){
		console.log("View loaded");

		this.guessInput = document.getElementById('guessInput');
		this.guessSubmit = document.getElementById('guess-submit');
		this.secretWordContainer = document.getElementById('secret-word-container');

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
	 * @param {Array} secretWordUpdate - array with correct guess letters filled in
	 */
	updateSecretWordDisplay(secretWordUpdate){
		this.secretWordContainer.innerHTML = secretWordUpdate;
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
	}


}