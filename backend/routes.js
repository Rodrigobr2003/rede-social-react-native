const express = require("express");
const routes = express.Router();

//Requires
const UserController = require("./src/controllers/userController");

routes.get("/");
routes.post("/registrar", UserController.cadastrarUsuario);
routes.post("/login", UserController.login);
routes.get("/getUserData", UserController.getUserData);
routes.get("/pesquisarPerfil/:nomepesquisado", UserController.pesquisarPerfil);

module.exports = routes;
