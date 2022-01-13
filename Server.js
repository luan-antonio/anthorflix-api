const express = require("express");
const cors = require('cors');
const checkToken = require('./checkToken');
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/auth");
const MoviesRoutes = require("./routes/movies");
const UsersRoutes = require("./routes/users");

class Server {
  constructor(port, dbUser, dbPass) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use("/auth", new AuthRoutes().router);
    this.app.use("/movies", new MoviesRoutes().router);
    this.app.use("/users", checkToken, new UsersRoutes().router);

    mongoose
      .connect(
        `mongodb+srv://${dbUser}:${dbPass}@anthorflix0.2kegr.mongodb.net/anthorflix?retryWrites=true&w=majority`
      )
      .then(
        this.app.listen(port, () => {
          console.log(`App listening at http://localhost:${port}`);
          console.log("Connected to the Database");
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Server;
