const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  data: { type: String, required: true },
  genero: { type: String, required: true },
});

const UserModel = mongoose.model("Usuario", userSchema);

class User {
  nome;
  sobrenome;
  email;
  senha;
  data;
  genero;
  //  descricao
  //    amigos
  //    notificacoes

  constructor(nome, sobrenome, email, senha, data, genero) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.senha = senha;
    this.data = data;
    this.genero = genero;
  }

  async registrar(user) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      console.log("Erro ao registrar usuário: " + error);
    }
  }
}

module.exports = User;