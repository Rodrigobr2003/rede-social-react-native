import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  data: { type: String, required: true },
  genero: { type: String, required: true },
});

const UserModel = mongoose.model("Usuario", userSchema);

export default class User {
  private nome: String;
  private sobrenome: String;
  private email: String;
  private senha: String;
  private data: String;
  private genero: String;
  // private descricao: String;
  //   private amigos: Array[];
  //   private notificacoes: Array[];

  constructor(
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
    data: String,
    genero: String
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.senha = senha;
    this.data = data;
    this.genero = genero;
  }

  public async registrar(user: User) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      console.log("Erro ao registrar usuário: " + error);
    }
  }
}
