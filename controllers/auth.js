const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthController {
  async register(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const emailRegExp = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    if (!name) {
      return res.status(400).json({ msg: "O nome é obrigatório" });
    }
    if (!email) {
      return res.status(400).json({ msg: "O email é obrigatório" });
    }
    if (!emailRegExp.test(email)) {
      return res.status(400).json({ msg: "O email não é válido" });
    }
    if (!password) {
      return res.status(400).json({ msg: "A senha é obrigatória" });
    }
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ msg: "A confirmação da senha é obrigatória" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "As senhas não conferem" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ msg: "O email informado já está cadastrado" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      await user.save();
      res.status(201).json({ msg: "Usuário criado com sucesso" });
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao tentar registrar o usuário, tente novamente mais tarde",
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    const emailRegExp = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    if (!emailRegExp.test(email)) {
      return res.status(400).json({ msg: "O email não é válido" });
    }

    if (!email) {
      return res.status(400).json({ msg: "O email é obrigatório" });
    }
    if (!password) {
      return res.status(400).json({ msg: "A senha é obrigatória" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ msg: "Senha inválida" });
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user.id,
        },
        secret
      );

      res
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso", token });
    } catch (error) {
      res
        .status(500)
        .json({
          msg: "Ocorreu um erro ao tentar logar o usuário, tente novamente mais tarde",
          r,
        });
    }
  }
}

module.exports = AuthController;
