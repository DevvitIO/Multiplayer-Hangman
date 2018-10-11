const Server = require('./src/server.js').Server;
const port = process.env.PORT || 5000;

const server = new Server();
server.start(port);
