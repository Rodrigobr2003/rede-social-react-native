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
  picturesConfig: {
    profilePicture: {
      image: { type: String, required: false, default: "" },
    },
    bgPicture: {
      image: { type: String, required: false, default: "" },
    },
    pictures: [{ type: String, required: false }],
  },
});
//tipo 1 -> profpic
//tipo 2 -> genpics
//tipo 3 -> bgpic

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

      if (user == null) {
        this.errors.push("Usuário não existe");
        return;
      }

      if (!bcrypt.compareSync(this.body.senha, user.senha)) {
        this.errors.push("Senha incorreta");
        return;
      }

      const userSec = {
        id: user._id,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        genero: user.genero,
        descricao: user.descricao,
        amigos: user.amigos,
        notificacoes: user.notificacoes,
        picturesConfig: user.picturesConfig,
      };

      req.session.user = userSec;
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
    const user = await UserModel.find(
      {
        $or: [
          { nome: { $regex: new RegExp(`^${txtInput}`, "i") } },
          { sobrenome: { $regex: new RegExp(`^${txtInput}`, "i") } },
        ],
      },
      { senha: 0 } // Exclui o campo senha do resultado
    ).limit(50);
    return user;
  }

  async pesquisarUsuario(reqNome, reqSobrenome) {
    const user = UserModel.findOne(
      { nome: reqNome, sobrenome: reqSobrenome },
      { senha: 0 }
    );
    return user;
  }

  async negarNotificacao() {
    try {
      const user = await UserModel.findOneAndUpdate(
        {
          _id: this.body.user.id,
        },
        {
          $pull: { notificacoes: { id: this.body.perfil.id } },
        },
        { new: true }
      );

      return user;
    } catch (error) {
      console.log("Erro ao negar notificação: " + error);
    }
  }

  async aceitarNotificacao() {
    await this.negarNotificacao();

    const user = await UserModel.findOneAndUpdate(
      {
        _id: this.body.user.id,
      },
      { amigos: [this.body.perfil] },
      { new: true }
    );

    await UserModel.findOneAndUpdate(
      {
        _id: this.body.perfil.id,
      },
      {
        amigos: [this.body.user],
      },
      { new: true }
    );

    return user;
  }

  async removerAmigo() {
    const user = await UserModel.findOneAndUpdate(
      {
        _id: this.body.id,
      },
      {
        $pull: { amigos: { id: this.body.amigoId } },
      },
      { new: true }
    );

    await UserModel.findOneAndUpdate(
      {
        _id: this.body.amigoId,
      },
      {
        $pull: { amigos: { id: this.body.id } },
      },
      { new: true }
    );

    return user;
  }

  async enviarNotificacao() {
    return await UserModel.findOneAndUpdate(
      {
        _id: this.body.idPerfil,
      },
      {
        $addToSet: {
          notificacoes: {
            id: this.body.idUserMsg,
            tipo: this.body.tipo,
            nome: this.body.message.nome,
            sobrenome: this.body.message.sobrenome,
          },
        },
      },
      { new: true }
    );
  }

  async salvarDescricao() {
    const user = await UserModel.findByIdAndUpdate(
      this.body.id,
      {
        descricao: this.body.desc,
      },
      { senha: 0 }
    );

    return user;
  }

  async salvarImagem() {
    let images = null;

    if (this.body.base64 == "") return;

    if (this.body.type == 1) {
      images = await UserModel.findOneAndUpdate(
        { _id: this.body.idUser },
        {
          $set: {
            "picturesConfig.profilePicture.image": this.body.base64,
          },
        },
        { new: true, projection: { senha: 0 } }
      );
    } else if (this.body.type == 2) {
      images = await UserModel.findOneAndUpdate(
        { _id: this.body.idUser },
        {
          $addToSet: {
            "picturesConfig.pictures": this.body.base64,
          },
        },
        { new: true, projection: { senha: 0 } }
      );
    } else if (this.body.type == 3) {
      images = await UserModel.findOneAndUpdate(
        { _id: this.body.idUser },
        {
          $set: {
            "picturesConfig.bgPicture.image": this.body.base64,
          },
        },
        { new: true, projection: { senha: 0 } }
      );
    }

    return images;
  }
}

module.exports = User;
