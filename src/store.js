export default class Store{
	constructor(){
		console.log("Store added");
		let secretString = "applejacks"; //only hard coded temporally
		this.secretWord = secretString.split(""); 
		this.currentProgress = secretString.replace(/./g, "_").split(""); 
		this.userGuesses = [];
		this.remainingGuesses = 6;
	}

	/**
	 *	Saves the user's recent guess, checks to see if it is a correct guess
	 * @param {string} guess
	 * @param {function} callBack - controller.updateSecretWord
	 */
	saveGuess(guess, callBack){
		console.log("Store.saveGuess", guess);
		//don't add a repeat guess to our list
		if (this.userGuesses.indexOf(guess) >= 0) {
			return console.log("Repeat guess", guess);
		} else {
			//save the user guess into the array
			this.userGuesses.push(guess);
			console.log("Store userGuesses", this.userGuesses);
		}
		
		//if it was a correct guess
		if(this.secretWord.includes(guess)){
			console.log("the word does include:", guess);

			//replace the underscore with correct guess
			this.secretWord.map((letter, index) =>{
				if (guess === letter){
					this.currentProgress[index] = guess;
				}
			});

		} else {
			console.log("Sorry, incorrect guess!");
			//since user submitted guess, take away a guess
			this.remainingGuesses--;
			console.log("Store remainingGuesses", this.remainingGuesses);
		}
		// If this.remainingGuesses === 0 disabled input & submit button to stop user from guessing
		// Can remove the "guessInput".disabled line to just disable submit button to prevent user from submitting a guess
		if(this.remainingGuesses === 0) {
			console.log('no more guesses remaining');
			document.getElementById("guessInput").disabled = true;
			document.getElementById("guess-submit").disabled = true;
		}
		if(callBack){
			const gameUpdate = {
				remainingGuesses: this.remainingGuesses,
				userGuesses: this.userGuesses,
			};

			//controller.updateSecretWord
			callBack(this.currentProgress.join(' '), gameUpdate);
		}
	}
}