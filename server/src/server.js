const path = require('path');
const express = require('express');
const Game = require('./game.js').Game;

const CLIENT_SOURCE = path.join(__dirname, '..', '..', 'client', 'dist');

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
    console.log('Initializing routes...');
    this.app.use('/', express.static(CLIENT_SOURCE));
  }

  initGame() {
    console.log('Initializing Game...');
    var game = new Game();
    var onlinePlayers = 0;
    this.io.on('connection', function(socket) {
      onlinePlayers++;
      socket.username = 'User'; //Default username
      socket.emit('gameInformation', game.getState());

      var playerInfo = { count: onlinePlayers, players : ['bob','jim'] };
      socket.emit('playersOnline', playerInfo);
      socket.broadcast.emit('playersOnline', playerInfo);
      //Emit to socket that connected AND broadcast to all sockets on connection
      //so all clients have accurate player count.

      socket.on('setUsername', function(username) {
        socket.username = username;
      });

      socket.on('newGuess', function(letter) {
        let guess = game.newGuess(letter.toLowerCase());
        socket.emit(guess, game.getState(socket.username));
        socket.broadcast.emit(guess, game.getState(socket.username));
        //On gameOver or Victory, a new game will be created after 5 seconds
        if (guess === 'gameOver' || guess === 'victory') {
          setTimeout(function() {
            game = new Game();
            socket.emit('newGame', game.getState());
            socket.broadcast.emit('newGame', game.getState());
          }, 5000);
        }
      });

      socket.on('disconnect', function() {
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
