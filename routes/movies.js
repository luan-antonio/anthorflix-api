const express = require("express");
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

    this.router.post("/add", this.#moviesController.add);
    this.router.post("/:id/ratings", this.#moviesController.addRating);
    this.router.post("/:id/ratings/:ratingId/comments", this.#moviesController.addComment);

    this.router.patch("/:id", this.#moviesController.edit);

    this.router.delete("/:id", this.#moviesController.deleteMovie);
  }
}

module.exports = MoviesRoutes;
