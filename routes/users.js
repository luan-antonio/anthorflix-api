const express = require("express");
const UsersController = require("../controllers/users");

class UsersRoutes {
  #usersController;
  constructor() {
    this.router = express.Router();
    this.#usersController = new UsersController();

    this.#defineRoutes();
  }

  #defineRoutes() {
    this.router.put("/:id/watchedMovies", this.#usersController.addToWatchedMovies);
  }
}

module.exports = UsersRoutes;
