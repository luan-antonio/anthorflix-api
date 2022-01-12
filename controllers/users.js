const mongoose = require("mongoose");
const User = require("../models/User");

class UsersController {
  constructor() {}
  async addToWatchedMovies(req, res) {
    const id = req.params.id;
    let { movieId } = req.body;
    movieId = mongoose.Types.ObjectId(movieId);

    if (!movieId) {
      res.status(400);
      json({ msg: "O id do filme é obrigatório" });
      return;
    }

    const user = User.findById(id);
    if (!user) {
      res.status(404).json({ msg: "O usuário não foi encontrado" });
      return;
    }

    if (user.watchedMovies) {
      user.watchedMovies.push(movieId);
    } else {
      user.watchedMovies = [movieId];
    }

    try {
      const updatedUser = await User.updateOne(
        { _id: id },
        { $set: { watchedMovies: user.watchedMovies } }
      );
      if (updatedUser.matchedCount === 0) {
        res.status(404).json({ msg: "O usuário não foi encontrado" });
        return;
      }

      res.status(200).json({
        msg: "Lista de filmes assistidos atualizada",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao tentar atualizar a lista de filmes assistidos, tente novamente mais tarde",
      });
    }
  }
}

module.exports = UsersController;
