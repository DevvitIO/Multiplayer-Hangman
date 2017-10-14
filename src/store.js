export default class Store{
	constructor(){
		console.log("Store added");

		this.secretWord = ['a', 'p','p','l','e','j','a','c','k','s']; //only hard coded temporally
		this.currentProgress = ['_', '_','_','_','_','_','_','_','_','_']; //only hard coded temporally
		this.userGuesses = [];
		this.remainingGuesses = 6;
	}

	/**
	 *
	 * @param {string}guess
	 * @param {function} callBack
	 */
	saveGuess(guess, callBack){
		console.log("Store.saveGuess", guess);
		//save the user guess into the array
		this.userGuesses.push(guess);
		console.log("Store userGuesses", this.userGuesses);
		//since user submitted guess, take away a guess
		this.remainingGuesses--;
		console.log("Store remainingGuesses", this.remainingGuesses);

		if(this.secretWord.includes(guess)){
			console.log("the word does include:", guess);

			this.secretWord.map((letter, index) =>{
				if (guess === letter){
					this.currentProgress[index] = guess;
				}
			});

			if(callBack){
				callBack(this.currentProgress.join(' '));
			}
		}
	}

}