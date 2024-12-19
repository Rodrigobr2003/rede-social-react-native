const User = require("../models/UserModel");

exports.cadastrarUsuario = (req, res) => {
  try {
    const user = new User(
      req.body.nome,
      req.body.sobrenome,
      req.body.email,
      req.body.senha,
      req.body.data,
      req.body.genero
    );

    return user.registrar(user);
  } catch (error) {
    console.log("Erro ao cadastrar usuário");
  }
};

exports.teste = (req, res) => {
  console.log("aaaaa");
};
