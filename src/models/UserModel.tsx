import AsyncStorage from "@react-native-async-storage/async-storage";

export default class User {
  private nome: String;
  private sobrenome: String;
  private email: String;
  private senha: String;
  // private data: Date;
  private genero: String;
  // private descricao: String;
  //   private amigos: Array[];
  //   private notificacoes: Array[];

  constructor(
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
    // data: Date
    genero: String
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.senha = senha;
    // this.data = data;
    this.genero = genero;
  }

  public async registrar(user: User) {
    try {
      let newId = user.gerarID();

      return await AsyncStorage.setItem(
        (await newId).toString(),
        JSON.stringify(user)
      );
    } catch (error) {
      console.log("Erro ao registrar usuário: " + error);
    }
  }

  public async gerarID() {
    const keys = await AsyncStorage.getAllKeys();

    if (keys.length === 0) {
      return 1;
    } else {
      return keys.length + 1;
    }
  }
}
