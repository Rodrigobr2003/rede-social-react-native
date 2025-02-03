import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { io } from "socket.io-client";
import { UserContext } from "./includes/UserProvider";

export default function ChatProfile() {
  const [chat, setChat] = useState<
    { id: number; type: string; content: any }[]
  >([]);
  const chatRef = useRef(null);

  const route = useRoute();
  const [data, setData] = useState(JSON.parse(route.params?.data));
  const dataUser = useContext(UserContext);
  const [room, setRoom] = useState(criarRoom(data?._id, dataUser?.user?.id));
  const idMsg = dataUser?.user?.id;
  //Chat
  const socket = io();

  const [txtMsg, setTxtMsg] = useState("");

  const [mensagens, setMensagens] = useState<
    {
      chatRoom: string;
      message: { texto: string };
      idUserMsg: string | undefined;
    }[]
  >([]);

  useEffect(() => {
    carregaMensagem();

    //Entrar no chat
    const username = dataUser?.user?.nome;
    socket.emit("joinChat", { username, room }); //AQ PD DAR ERRO

    socket.on("enviaId", () => {
      socket.on("message", (msg: any, idMsg: any) => {
        const msgObj = {
          chatRoom: room,
          message: { texto: msg },
          idUserMsg: idMsg,
        };

        setMensagens((prevMensagens) => [...prevMensagens, msgObj]);
      });
    });
  }, []);

  //Função de criar room
  function criarRoom(userId1: any, userId2: any) {
    // Ordena os IDs dos usuários
    const ordenarIds = [userId1, userId2].sort();

    // Cria a room com IDs ordenados
    const room = `${ordenarIds[0]}${ordenarIds[1]}`;

    return room;
  }

  async function carregaMensagem() {
    const response = await fetch(
      `http://192.168.15.10:3008/carregaMensagens/${room}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "content-type": "application/json" },
      }
    );

    const mensagensCarregadas = await response.json();

    const mensagensFormatadas = mensagensCarregadas.map((mensagem: any) => ({
      chatRoom: room, // Adicionando o chatRoom manualmente
      message: { texto: mensagem.texto },
      idUserMsg: mensagem.idUser,
    }));

    setMensagens(mensagensFormatadas);
  }

  async function enviarMensagem() {
    try {
      let msgObj = {
        chatRoom: room,
        tipo: 2,
        message: {
          texto: txtMsg,
          nome: dataUser?.user?.nome,
          sobrenome: dataUser?.user?.sobrenome,
        },
        idUserMsg: dataUser?.user?.id,
        idPerfil: data._id,
      };

      setMensagens((prevMensagens) => [...prevMensagens, msgObj]);

      await fetch("http://192.168.15.10:3008/salvaMensagens", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(msgObj),
      });

      socket.emit("chatMessage", txtMsg, idMsg);
    } catch (error) {
      console.log("Erro ao enviar dados msg: ", error);
    }
  }

  return (
    <View style={styles.feedDefault}>
      <View style={[styles.feedTop, styles.feedDetails]}>
        <Ionicons
          name="chevron-back"
          size={26}
          style={{ paddingLeft: 10 }}
          onPress={() => {
            router.back();
          }}
        />

        <Ionicons name="person" size={32} style={styles.profilePic}></Ionicons>

        <Text style={{ fontSize: 20 }}>
          {data?.nome} {data?.sobrenome}
        </Text>
      </View>

      <ScrollView style={{ width: "100%" }} ref={chatRef}>
        {mensagens.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.msgDefault,
              msg.idUserMsg == dataUser?.user?.id
                ? styles.msgUser
                : styles.msgAmigo,
            ]}
          >
            <Text style={styles.textoMsg}>{msg.message.texto}</Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={[
          styles.feedDetails,
          styles.feedBottom,
          { flexDirection: "row" },
        ]}
      >
        <TextInput
          style={styles.input}
          value={txtMsg}
          onChangeText={(txt) => {
            setTxtMsg(txt);
          }}
        ></TextInput>

        <Ionicons
          name="send"
          size={34}
          style={{ paddingRight: 10 }}
          onPress={() => {
            enviarMensagem();
            setTxtMsg("");
          }}
        ></Ionicons>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedDefault: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    width: "90%",
    height: "85%",
    marginHorizontal: "auto",
  },

  feedDetails: {
    backgroundColor: "#DDD",
    width: "100%",
    paddingVertical: 5,
  },

  feedTop: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  profilePic: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 180,
  },

  msgDefault: {
    width: "75%",
    marginTop: 2,
    marginBottom: 8,
    padding: 7,
    borderRadius: 6,
  },

  msgUser: {
    marginLeft: "auto",
    backgroundColor: "#51ADE5",
    marginRight: 5,
  },

  msgAmigo: {
    marginRight: "auto",
    backgroundColor: "#2C3892",
    marginLeft: 5,
  },

  textoMsg: {
    color: "#fff",
    fontSize: 15,
  },

  feedBottom: {
    borderStartEndRadius: 10,
    borderEndEndRadius: 10,
    justifyContent: "space-between",
  },

  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: "auto",
  },
});
