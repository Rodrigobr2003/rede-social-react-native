require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const MongoStore = require("connect-mongo");
const express = require("express");
const session = require("express-session");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    app.emit("connection");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao bd: " + err);
  });

const sessionOptions = session({
  secret: process.env.SECRETKEY,
  store: MongoStore.create({ mongoUrl: process.env.CONNECTION }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

io.on("connection", (socket) => {
  const idSocket = socket.id;

  socket.emit("enviaId", idSocket);

  //Join chat
  socket.on("joinChat", ({ username, room }) => {
    socket.join(room);

    //Listener de mensagens
    socket.on("chatMessage", (msg, idMsg) => {
      io.to(room).emit("message", { msg, idMsg });
    });

    socket.on("feedChat", (msg, id, name, tempo) => {
      io.to(room).emit("feedMessage", msg, id, name, tempo);
    });

    //Disconnect chat
    if (!room.includes("feed:")) {
      socket.on("disconnect", () => {
        io.to(room);
      });
    }
  });
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
app.use(sessionOptions);
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
