require("dotenv").config();
const Server = require("./Server");

class App {
  constructor() {
    this.app = new Server(process.env.PORT, process.env.DB_USER, process.env.DB_PASS);
  }
}

const app = new App();

module.exports = app;