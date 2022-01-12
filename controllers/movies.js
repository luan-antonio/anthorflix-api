const Movie = require("../models/Movie");
const Rating = require("../models/Rating");
const Comment = require("../models/Comment");

class MoviesController {
  constructor() {}

  async add(req, res) {
    const {
      title,
      originalTitle,
      status,
      originalLang,
      budget,
      revenue,
      certification,
      release,
      runtime,
      overview,
      directors,
      writers,
    } = req.body;

    if (!originalTitle) {
      return res.status(400).json({ msg: "O nome original é obrigatório" });
    }

    const movieExists = await Movie.findOne({ originalTitle });

    if (movieExists) {
      return res
        .status(400)
        .json({ msg: "O filme informado já está cadastrado" });
    }

    const movie = new Movie({
      title,
      originalTitle,
      status,
      originalLang,
      budget,
      revenue,
      certification,
      release,
      runtime,
      overview,
      directors,
      writers,
    });

    try {
      await movie.save();
      res.status(201).json({ msg: "Filme adicionado com sucesso" });
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao tentar adicionar o filme, tente novamente mais tarde",
      });
    }
  }

  async addRating(req, res) {
    const id = req.params.id;
    const { userId, content = "", score } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "O id do usuário é obrigatório" });
    }
    if (!score) {
      return res.status(400).json({ msg: "A pontuação é obrigatória" });
    }

    const rating = new Rating({
      author: userId,
      content,
      refersTo: id,
      score,
    });

    const movie = Movie.findById(id);
    if (movie.ratings) {
      movie.ratings.push(rating._id);
    } else {
      movie.ratings = [rating._id];
    }

    try {
      await rating.save();
      const updatedMovie = await Movie.updateOne(
        { _id: id },
        { $set: { ratings: movie.ratings } }
      );
      if (updatedMovie.matchedCount === 0) {
        res.status(404).json({ msg: "O Filme não foi encontrado" });
        return;
      }
      res.status(201).json({ msg: "Avaliação adicionada com sucesso" });
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao tentar adicionar a avaliação, tente novamente mais tarde",
      });
    }
  }

  async addComment(req, res) {
    const { ratingId } = req.params;
    const { userId, content } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "O id do usuário é obrigatório" });
    }
    if (!content) {
      return res
        .status(400)
        .json({ msg: "O conteúdo do comentário é obrigatório" });
    }

    const comment = new Comment({
      author: userId,
      content,
      refersTo: ratingId,
    });

    const rating = Rating.findById(ratingId);
    if (rating.comments) {
      rating.comments.push(comment._id);
    } else {
      rating.comments = [comment._id];
    }

    try {
      await comment.save();
      const updatedRating = await Rating.updateOne(
        { _id: ratingId },
        { $set: { comments: rating.comments } }
      );
      if (updatedRating.matchedCount === 0) {
        res.status(404).json({ msg: "A avaliação não foi encontrada" });
        return;
      }
      res.status(201).json({ msg: "Comentário adicionado com sucesso" });
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao tentar adicionar o comentário, tente novamente mais tarde",
      });
    }
  }

  async edit(req, res) {
    const id = req.params.id;
    const {
      title,
      originalTitle,
      status,
      originalLang,
      budget,
      revenue,
      certification,
      release,
      runtime,
      overview,
      directors,
      writers,
    } = req.body;

    const movie = {
      title,
      originalTitle,
      status,
      originalLang,
      budget,
      revenue,
      certification,
      release,
      runtime,
      overview,
      directors,
      writers,
    };

    try {
      const updatedMovie = await Movie.updateOne({ _id: id }, movie);
      if (updatedMovie.matchedCount === 0) {
        res.status(404).json({ msg: "O filme não foi encontrado" });
        return;
      }

      res.status(200).json({ movie, msg: "Filme atualizado" });
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao tentar atualizar o filme, tente novamente mais tarde",
      });
    }
  }

  async deleteMovie(req, res) {
    const id = req.params.id;

    const movie = await Movie.findById(id);

    if (!movie) {
      res.status(404).json({ msg: "O filme não foi encontrado" });
      return;
    }

    try {
      await Movie.deleteOne({ _id: id });

      res.status(200).json({ message: "Filme removido" });
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao tentar excluir o filme, tente novamente mais tarde",
      });
    }
  }

  async get(req, res) {
    try {
      const movies = await Movie.find();

      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao tentar carregar os filmes, tente novamente mais tarde",
      });
    }
  }

  async getById(req, res) {
    const id = req.params.id;

    try {
      const movie = await Movie.findById(id);
      if (!movie) {
        res.status(404).json({ message: "O filme não foi encontrado" });
        return;
      }

      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao tentar carregar o filme, tente novamente mais tarde",
      });
    }
  }
}

module.exports = MoviesController;
