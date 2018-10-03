export class Game {
  constructor() {
    this.words = ["melon", "car", "airplane", "pig", "piano"];
    this.word = this.words[Math.floor(Math.random() * this.words.length)].toLowerCase();
    this.blankWord = this.word.replace(/\w/g, '_').split('').join(' ');
    this.guesses = [];
    this.correct = 0;
    this.incorrect = 0;
    this.status = 'active';
    this.announceGame();
  }

  newGuess(letter) {
    let prevBlank = this.blankWord;
    let guessFound = this.guesses.find((guess) => {
      return guess === letter;
    });
    if(guessFound === letter){
      return 'repeatGuess';
    } else if(guessFound === undefined){
      this.guesses.push(letter);
      let blankWordArray = this.blankWord.split(' ');
      //Updates mystery/blank word based on guesses
      for(let i = 0; i < this.word.split('').length; i++){
        const displayedLetter = this.word.split('')[i];
        if(displayedLetter === letter){
          blankWordArray[i] = displayedLetter;
        }
      }
      this.blankWord = blankWordArray.join(' ');

      if(prevBlank === this.blankWord){
        return this.incorrectGuess();
        // this.incorrect++;
        // console.log(this.blankWord);
        // return 'incorrectGuess';
      } else {
        return this.correctGuess();
        // this.correct++;
        // console.log(this.blankWord);
        // return 'correctGuess';
      }

    }
    
  }

  incorrectGuess() {
    this.incorrect++;
    if(this.incorrect >= 6) {
      this.status = 'inactive';
      return 'gameOver';
    } else {
      return 'incorrectGuess';
    }
  }

  correctGuess() {
    this.correct++;
    if(this.blankWord.split(' ').join('') === this.word) {
      this.status = 'inactive';
      return 'victory';
    } else {
      return 'correctGuess';
    }
  }

  getState(guesser) {
    let gameState = {
      blankword: this.blankWord,
      guesses: this.guesses,
      correct: this.correct,
      incorrect: this.incorrect,
      status: this.status
    };
    if(guesser){
      gameState = {
        blankword: this.blankWord,
        guesses: this.guesses,
        correct: this.correct,
        incorrect: this.incorrect,
        status: this.status,
        guesser: guesser
      };
    }
    return gameState;
  }

  announceGame() {
    console.log('New game started: ' + this.word + ' ' + this.blankWord);
  }

}
