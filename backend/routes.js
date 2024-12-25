const express = require("express");
const routes = express.Router();

//Requires
const UserController = require("./src/controllers/userController");

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

module.exports = routes;
