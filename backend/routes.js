const express = require("express");
const routes = express.Router();

//Requires
const UserController = require("./src/controllers/userController");
const MessagesController = require("./src/controllers/messagesController");

//Rotas Usuário
routes.get("/");
routes.post("/registrar", UserController.cadastrarUsuario);
routes.post("/login", UserController.login);
routes.post("/logout", UserController.logout);
routes.get("/getUserData", UserController.getUserData);
routes.get("/pesquisarPerfil/:nomepesquisado", UserController.pesquisarPerfil);
routes.get(
  "/pesquisarPerfil/:nome/:sobrenome",
  UserController.pesquisarUsuario
);
routes.post("/enviarNotificacao", UserController.enviarNotificacao);
routes.put("/negarNotificacao", UserController.negarNotificacao);
routes.put("/aceitarNotificacao", UserController.aceitarNotificacao);
routes.put("/removerAmigo", UserController.removerAmigo);

//Rotas mensagens
routes.post("/salvaMensagens", MessagesController.salvaMensagens);

module.exports = routes;
