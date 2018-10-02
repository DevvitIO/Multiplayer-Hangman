const path = require("path");
const express = require("express");

const CLIENT_SOURCE = path.join(__dirname, "..", "..", "client", "dist");

export class Server {
  constructor() {
    this.app = express();
    this.serv = require('http').createServer(this.app);
    this.io = require('socket.io')(this.serv);
    this.app.set('socketio', this.io);
    this.initRoutes();
    this.initSocket();
  }

  initRoutes() {
    console.log("Initializing routes...");
    this.app.use("/", express.static(CLIENT_SOURCE));
  }

  initSocket() {
    console.log("Initializing sockets...");
    var onlinePlayers = 0;
    this.io.on('connection', function(socket){
      onlinePlayers++;
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
