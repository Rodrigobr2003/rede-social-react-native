const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  data: { type: String, required: true },
  genero: { type: String, required: true },
  descricao: { type: String, required: false, default: "" },
  amigos: { type: Array, required: false, default: [] },
  notificacoes: { type: Array, required: false, default: [] },
});

const UserModel = mongoose.model("Usuario", userSchema);

class User {
  constructor(body) {
    this.body = body;
  }

  async registrar() {
    try {
      this.validacao();

      const salt = bcrypt.genSaltSync();
      this.body.senha = bcrypt.hashSync(this.body.senha, salt);

      return await UserModel.create(this.body);
    } catch (error) {
      console.log("Erro ao registrar usuário: " + error);
    }
  }

  validacao() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      senha: this.body.senha,
      data: this.body.data,
      genero: this.body.genero,
      descricao: this.body.descricao,
      amigos: this.body.amigos,
      notificacoes: this.body.notificacoes,
    };
  }
}

module.exports = User;
