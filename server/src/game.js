export class Game {
  constructor() {
    this.words = ["melon", "car", "airplane", "pig", "piano"];
    this.word = this.words[Math.floor(Math.random() * this.words.length)].toLowerCase();
    this.blankWord = this.word.replace(/\w/g, '_').split('').join(' ');
    this.guesses = [];
    this.correct = 0;
    this.incorrect = 0;
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
      for(let i = 0; i < this.word.split('').length; i++){
        const displayedLetter = this.word.split('')[i];
          if(displayedLetter === letter){
            blankWordArray[i] = displayedLetter;
          }
        }
        this.blankWord = blankWordArray.join(' ');
      if(prevBlank === this.blankWord){
        this.incorrect++;
        console.log(this.blankWord);
        return 'incorrectGuess';
      } else {
        this.correct++;
        console.log(this.blankWord);
        return 'correctGuess';
      }

    }
    
  }

  announceGame() {
    console.log('New game started: ' + this.word + ' ' + this.blankWord);
  }

}
