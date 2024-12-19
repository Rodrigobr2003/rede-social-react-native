const User = require("../models/UserModel");

exports.cadastrarUsuario = async (req, res) => {
  try {
    const user = new User(req.body);

    return await user.registrar();
  } catch (error) {
    console.log("Erro ao cadastrar usuário");
  }
};

exports.login = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.login();

    if (user.errors.length > 0) {
      return res.status(400).json({ message: user.errors });
    }
    return res.status(200).json({ message: "Login realizado com sucesso" });
  } catch (error) {
    console.log("Erro ao logar usuário", error);
  }
};
