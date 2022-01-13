const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');
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
    this.app.use("/movies", this.#checkToken, new MoviesRoutes().router);
    this.app.use("/users", this.#checkToken, new UsersRoutes().router);

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

  #checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Acesso negado!" });
    }

    try {
      const secret = process.env.SECRET;
      jwt.verify(token, secret);
      next();
    } catch (error) {
      res.status(400).json({ msg: "Token inválido" });
    }
  }
}

module.exports = Server;
