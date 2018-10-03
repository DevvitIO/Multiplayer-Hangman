const path = require("path");
const express = require("express");
const Game = require("./game.js").Game;

const CLIENT_SOURCE = path.join(__dirname, "..", "..", "client", "dist");

export class Server {
  constructor() {
    this.app = express();
    this.serv = require('http').createServer(this.app);
    this.io = require('socket.io')(this.serv);
    this.app.set('socketio', this.io);
    this.initRoutes();
    this.initGame();
  }

  initRoutes() {
    console.log("Initializing routes...");
    this.app.use("/", express.static(CLIENT_SOURCE));
  }



  initGame() {
    console.log("Initializing Game...");
    var game = new Game();
    var onlinePlayers = 0;
    this.io.on('connection', function(socket){
      onlinePlayers++;
      socket.emit('gameInformation', {
        blankword: game.blankWord,
            guesses: game.guesses,
            correct: game.correct,
            incorrect: game.incorrect,
            guesser: socket.username
          });
      socket.emit('playersOnline', onlinePlayers);
      socket.broadcast.emit('playersOnline', onlinePlayers);
      //Emit to socket that connected AND broadcast to all sockets on connection
      //so all clients have accurate player count.
      socket.username = "User";

      socket.on('setUsername', function(username){
        socket.username = username;
        console.log('User set their name to ' + username);
      });

      socket.on('newGuess', function(letter){
        console.log(socket.username + `'s ` + 'Guess: ' + letter);
        let guess = game.newGuess(letter);
        if(guess === 'repeatGuess'){
          socket.emit('repeatGuess', letter);
        } else if(guess === 'incorrectGuess'){
          if(game.incorrect >= 6){
            socket.emit('gameOver', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect,
              guesser: socket.username
            });
            socket.broadcast.emit('gameOver', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect,
              guesser: socket.username
            });
            setTimeout(function() {
              game = new Game();
              socket.emit('newGame', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect
            });
            socket.broadcast.emit('newGame', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
               incorrect: game.incorrect
              });
            }, 5000);
          } else {
            socket.broadcast.emit('incorrectGuess', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect,
              guesser: socket.username
            });
            socket.emit('incorrectGuess', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect,
              guesser: socket.username
            });
          }
        } else if(guess === 'correctGuess'){
          if(game.blankWord.split(' ').join('') === game.word){
            socket.emit('victory', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect,
              guesser: socket.username
            });
            socket.broadcast.emit('victory', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect,
              guesser: socket.username
            });
            setTimeout(function() {
              game = new Game();
              socket.emit('newGame', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect
            });
            socket.broadcast.emit('newGame', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
               incorrect: game.incorrect
              });
            }, 5000);
            
          } else {
            socket.broadcast.emit('correctGuess', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect,
              guesser: socket.username
            });
            socket.emit('correctGuess', {
              blankword: game.blankWord,
              guesses: game.guesses,
              correct: game.correct,
              incorrect: game.incorrect,
              guesser: socket.username
            });
          }
        }
      });

      socket.on('disconnect', function(){
        onlinePlayers--;
        socket.broadcast.emit('playersOnline', onlinePlayers);
      });
    });
  }

  start(port = 5000) {
    this.serv.listen(port);
    console.log(`Server is running on port '${port}'!`);
  }
}
