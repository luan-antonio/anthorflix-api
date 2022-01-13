const express = require("express");
const checkToken = require('../checkToken');
const MoviesController = require("../controllers/movies");

class MoviesRoutes {
  #moviesController;
  constructor() {
    this.router = express.Router();
    this.#moviesController = new MoviesController();

    this.#defineRoutes();
  }

  #defineRoutes() {
    this.router.get("/", this.#moviesController.get);
    this.router.get("/:id", this.#moviesController.getById);

    this.router.post("/add", checkToken, this.#moviesController.add);
    this.router.post("/:id/ratings", checkToken, this.#moviesController.addRating);
    this.router.post("/:id/ratings/:ratingId/comments", checkToken, this.#moviesController.addComment);

    this.router.patch("/:id", checkToken, this.#moviesController.edit);

    this.router.delete("/:id", checkToken, this.#moviesController.deleteMovie);
  }
}

module.exports = MoviesRoutes;
