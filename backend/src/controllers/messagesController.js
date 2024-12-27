const Mensagem = require("../models/MessagesModel");
const moment = require("moment");
// const User = require("../models/UserModel");

exports.salvaMensagens = async (req, res) => {
  const momento = moment().format("DD/MM HH:mm");

  req.body.message.tempo = momento;

  if (req.body.message.texto === "") return;

  const idUser = req.session.user.id;

  const mensagem = new Mensagem(req.body.message);

  await mensagem.registrarMensagem(req.body.chatRoom, idUser);

  //   enviarNotf(req.body.chatRoom, req, 2, req.body.idUserMsg);
};
