const express = require("express");
const routes = express.Router();

//Requires
const UserController = require("./src/controllers/userController");

routes.get("/", UserController.teste);
routes.post("/registrar", UserController.cadastrarUsuario);

module.exports = routes;
