require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");

const express = require("express");

const app = express();
const server = http.createServer(app);

mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    app.emit("connection");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao bd: " + err);
  });

app.on("connection", () => {
  server.listen(3008, () => {
    console.log("Servidor ligado");
  });
});
