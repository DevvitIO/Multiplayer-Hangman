export default class Controller {
	constructor(store, view) {
		this.store = store;
		this.view = view;

		this.view.setSecretWordDisplay(this.store.secretWord);
		view.bindSaveUserGuess(this.saveUserGuess.bind(this));
	}

	/**
	 * Receives guess input from view, tells store to save it and then call updateSecretWord
	 * @param {string} guess - single character guess made by the user
	 */
	saveUserGuess(guess){
		this.store.saveGuess(guess, (update) => {
			this.updateSecretWord(update);
		});
	}

	/**
	 *
	 * @param {string} secretWordUpdate - A string containing correct user guesses and remaining letters as underscores
	 */
	updateSecretWord(secretWordUpdate){
		this.view.updateSecretWordDisplay(secretWordUpdate);
	}

}