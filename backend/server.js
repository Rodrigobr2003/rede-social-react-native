require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

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

app.use(
  cors({
    origin: "http://10.0.2.2:3008", // Defina a origem do frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.post("/registrar", (req, res) => {
  try {
    // Processamento do cadastro aqui
    res.status(200).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

app.on("connection", () => {
  server.listen(3008, () => {
    console.log("Servidor ligado");
  });
});
