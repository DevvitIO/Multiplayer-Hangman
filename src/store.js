export function Build() {
    return new Promise((resolve, reject) => {
        getStore()
            .then((store) => { 
                resolve(store);
            });
    })
    .then((newStore) => {
        return(newStore);
    })
}

    function getStore() {
        return new Promise((resolve, reject) => {
            var file = ('./dist/words-alpha.txt');
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file);
            rawFile.onreadystatechange = function () {
                if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status == 0) {
                        let store = new Store();
                        let wordsArray = rawFile.responseText.split("\n");
                        let length = wordsArray.length;
                        let word = wordsArray[Math.floor(Math.random() * length) + 1];
                        store.secretString = word;
                        store.secretWord = word.split(""); 
                        store.currentProgress = word.replace(/./g, "_").split(""); 
                        store.userGuesses = [];
                        store.remainingGuesses = 6;
                        store.correctLetters = 0;
                        resolve(store);
                    }
                }
            }
            rawFile.send();
        });
    }

export class Store{
	constructor(){
		console.log("Store added");
		this.secretString = "";
		this.secretWord = this.secretString.split(""); 
		this.currentProgress = this.secretString.replace(/./g, "_").split(""); 
		this.userGuesses = [];
		this.remainingGuesses = 6;
        this.correctLetters = 0;
    }

	/**
	 *	Saves the user's recent guess, checks to see if it is a correct guess
	 * @param {string} guess
	 * @param {function} callBack - controller.updateSecretWord
	 */
	saveGuess(guess, callBack){
		console.log("Store.saveGuess", guess);

		this.gameMessage = document.getElementById('game-message');
		this.gameMessage.innerHTML = '';
		if(!/^([a-zA-Z]{1})$/.test(guess)){
			console.log("Invalid guess", guess);
			this.gameMessage.innerHTML = `<p class="error">Not valid expression <strong>`+ guess + `</strong>. Only one letter is allowed</p>`;
			return false;
		} 

		if(this.userGuesses.indexOf(guess) > -1){
			console.log("Repeat guess", guess);
			this.gameMessage.innerHTML = `<p class="error"> Duplicated letter <strong>`+ guess + `</strong></p>`;
			return false;
		}

		//save the user guess into the array
		this.userGuesses.push(guess);
		console.log("Store userGuesses", this.userGuesses);
		
		if(this.secretWord.indexOf(guess) == -1){
			//since user submitted guess, take away a guess
			this.remainingGuesses--;

			//updating image
			this.gameImage = document.getElementById('game-view');
			this.gameImage.setAttribute('src', require('./assets/img/'+this.remainingGuesses+'.jpg'));

		}
		console.log("Store remainingGuesses", this.remainingGuesses);
		//if it was a correct guess
		if(this.secretWord.includes(guess)){
			console.log("the word does include:", guess);
			this.count = 0;
			//replace the underscore with correct guess
			this.secretWord.map((letter, index) =>{
				if (guess === letter){
					this.currentProgress[index] = guess;
					this.count++;
				}
			});
			this.correctLetters +=this.count;
			this.gameMessage.innerHTML = `<p class="correct">Letter ` + guess +` found `+ this.count +` times. Come on!</p>`;
			if(this.correctLetters === this.secretWord.length){
				this.gameMessage.innerHTML = `<p class="correct">Congratulations! You WIN :)</p>`;
				document.getElementById('secret-word-container').className += 'correct';
				document.getElementById("guessInput").disabled = true;
				document.getElementById("guess-submit").disabled = true;
			}

		} else {
			console.log("Sorry, incorrect guess!");
			this.gameMessage.innerHTML = `<p class="warn">Letter ` + guess +` not found, you have `+this.remainingGuesses+` more guesses</p>`;
		}
		// If this.remainingGuesses === 0 disabled input & submit button to stop user from guessing
		// Can remove the "guessInput".disabled line to just disable submit button to prevent user from submitting a guess
		if(this.remainingGuesses === 0) {
			console.log('no more guesses remaining');
			document.getElementById("guessInput").disabled = true;
			document.getElementById("guess-submit").disabled = true;
			this.gameMessage.innerHTML = `<p class="error">You are dead!!! Correct word was <strong>`+this.secretWord.join("")+`</strong></p>`;
			document.getElementById('secret-word-container').className += 'error';
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
