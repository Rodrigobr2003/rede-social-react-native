export class User {
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
    } catch (error) {
      console.log("Erro ao registrar usuário: " + error);
    }
  }
}
