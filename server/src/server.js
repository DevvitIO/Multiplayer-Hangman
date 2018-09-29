const path = require("path");
const express = require("express");

const CLIENT_SOURCE = path.join(__dirname, "..", "..", "client", "dist");

export class Server {
  constructor() {
    this.app = express();

    this.initRoutes();
  }

  initRoutes() {
    console.log("Initializing routes...");
    this.app.use("/", express.static(CLIENT_SOURCE));
  }

  start(port = 5000) {
    this.app.listen(port);
    console.log(`Server is running on port '${port}'!`);
  }
}
