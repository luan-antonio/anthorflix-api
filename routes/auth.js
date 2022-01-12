const express = require("express");
const AuthController = require("../controllers/auth");

class AuthRoutes {
  #authController;
  constructor() {
    this.router = express.Router();
    this.#authController = new AuthController();

    this.#defineRoutes();
  }

  #defineRoutes() {
    this.router.post("/register", this.#authController.register);
    this.router.post("/login", this.#authController.login);
  }
}

module.exports = AuthRoutes;
