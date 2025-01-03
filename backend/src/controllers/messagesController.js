const Mensagem = require("../models/MessagesModel");
const User = require("../models/UserModel");
const moment = require("moment");
// const User = require("../models/UserModel");

exports.salvaMensagens = async (req, res) => {
  const momento = moment().format("DD/MM HH:mm");

  req.body.message.tempo = momento;

  if (req.body.message.texto === "") return;

  const idUser = req.session.user.id;

  const mensagem = new Mensagem(req.body.message);

  await mensagem.registrarMensagem(req.body.chatRoom, idUser);

  enviarNotf(req);
};

exports.carregaMensagens = async (req, res) => {
  const mensagem = new Mensagem(req.params.room);

  const response = await mensagem.carregaMensagens();

  res.send(response);
};

exports.curtirMensagem = async (req, res) => {
  const mensagem = new Mensagem(req.body);

  res.send(await mensagem.curtirMensagem());

  enviarNotf(req);
};

exports.descurtirMensagem = async (req, res) => {
  const mensagem = new Mensagem(req.body);

  res.send(await mensagem.descutirMensagem());
};

exports.compartilharMensagem = async (req, res) => {
  const momento = moment().format("DD/MM HH:mm");

  req.body.user.tempo = momento;

  const mensagem = new Mensagem(req.body);

  await mensagem.compartilhar();

  enviarNotf(req);
};

exports.comentar = async (req, res) => {
  const momento = moment().format("DD/MM HH:mm");

  req.body.user.tempo = momento;

  if (req.body.user.texto === "") return;

  const mensagem = new Mensagem(req.body);

  res.send(await mensagem.comentar());

  enviarNotf(req);
};

async function enviarNotf(req) {
  try {
    console.log(req.body);

    const user = new User(req.body);

    user.enviarNotificacao();
  } catch (error) {
    console.log("Erro ao enviar notificação: ", error);
  }
}
