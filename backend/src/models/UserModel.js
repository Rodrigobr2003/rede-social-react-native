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
    this.errors = [];
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

  async login(req) {
    try {
      this.validacao();

      const user = await UserModel.findOne({ email: this.body.email });

      const userSec = {
        id: user._id,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        genero: user.genero,
        descricao: user.descricao,
        amigos: user.amigos,
        notificacoes: user.notificacoes,
      };

      req.session.user = userSec;

      if (user == null) {
        this.errors.push("Usuário não existe");
        return;
      }

      if (!bcrypt.compareSync(this.body.senha, user.senha)) {
        this.errors.push("Senha incorreta");
        return;
      }
    } catch (error) {
      console.log("Erro ao logar usuário: " + error);
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

  async pesquisarPerfil(txtInput) {
    const user = UserModel.find({ nome: txtInput }, { senha: 0 });
    return user;
  }

  async pesquisarUsuario(reqNome, reqSobrenome) {
    const user = UserModel.findOne(
      { nome: reqNome, sobrenome: reqSobrenome },
      { senha: 0 }
    );
    return user;
  }
}

module.exports = User;
