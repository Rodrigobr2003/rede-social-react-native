import * as yup from "yup";

export const UserSchema = yup.object({
  nome: yup
    .string()
    .required("Informe seu nome")
    .min(2, "Seu nome deve ter no mínimo 2 caracteres"),
  sobrenome: yup
    .string()
    .required("Informe seu sobrenome")
    .min(2, "Seu sobrenome deve ter no mínimo 2 caracteres"),
  email: yup.string().email("Email inválido").required("Informe seu email"),
  senha: yup
    .string()
    .min(4, "A senha deve ter no mínimo 4 caracteres")
    .required("Informe sua senha"),
  data: yup.string().required("Informe sua data de nascimento"),
  genero: yup.string().required("Informe seu gênero"),
});

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
