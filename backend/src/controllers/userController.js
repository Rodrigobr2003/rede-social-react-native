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

    await user.login(req);

    if (user.errors.length > 0) {
      return res.status(400).json({ message: user.errors });
    }

    return res.status(200).json({ message: "Login realizado com sucesso" });
  } catch (error) {
    console.log("Erro ao logar usuário", error);
  }
};

exports.logout = async (req, res) => {
  try {
    res.send(req.session.destroy());
  } catch (error) {
    console.log("Erro ao deslogar usuário", error);
  }
};

exports.getUserData = (req, res) => {
  try {
    let user = null;

    if (req.session.user) {
      user = {
        id: req.session.user.id,
        nome: req.session.user.nome,
        sobrenome: req.session.user.sobrenome,
        email: req.session.user.email,
        genero: req.session.user.genero,
        descricao: req.session.user.descricao,
        amigos: req.session.user.amigos,
        notificacoes: req.session.user.notificacoes,
      };
    }

    return res.send(user);
  } catch (error) {
    console.log("Erro ao buscar dados do usuário", error);
  }
};

exports.pesquisarPerfil = async (req, res) => {
  try {
    const txtInput = req.params.nomepesquisado;

    //ALTERAR TRATAMENTO TXT NA PESQUISA!!!!

    const user = new User(req.body);

    const pesquisa = await user.pesquisarPerfil(txtInput);

    res.send(pesquisa);
  } catch (error) {
    console.log("Erro ao pesquisar perfil: ", error);
  }
};

exports.pesquisarUsuario = async (req, res) => {
  try {
    const user = new User(req.body);

    const pesquisa = await user.pesquisarUsuario(
      req.params.nome,
      req.params.sobrenome
    );

    res.send(pesquisa);
  } catch (error) {
    console.log("Erro ao pesquisar usuário: ", error);
  }
};

exports.enviarNotificacao = async (req, res) => {
  try {
    const user = new User(req.body);

    user.enviarPedidoAmizade();
  } catch (error) {
    console.log("Erro ao enviar notificação: ", error);
  }
};

exports.negarNotificacao = async (req, res) => {
  const user = new User(req.body);

  const newSess = await user.negarNotificacao(req);

  req.session.user = newSess;

  res.send(req.session.user);
};

exports.aceitarNotificacao = async (req, res) => {
  const user = new User(req.body);

  user.aceitarNotificacao();
};
