import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { UserContext } from "./includes/UserProvider";

export default function ChatProfile() {
  const route = useRoute();
  const [data, setData] = useState(JSON.parse(route.params?.data));
  const dataUser = useContext(UserContext);
  const [room, setRoom] = useState(criarRoom(data?._id, dataUser?.user?.id));

  const [txtMsg, setTxtMsg] = useState("");

  const [mensagens, setMensagens] = useState(null);

  useEffect(() => {}, []);

  //Função de criar room
  function criarRoom(userId1: any, userId2: any) {
    // Ordena os IDs dos usuários
    const ordenarIds = [userId1, userId2].sort();

    // Cria a room com IDs ordenados
    const room = `${ordenarIds[0]}${ordenarIds[1]}`;

    return room;
  }

  async function enviarMensagem() {
    console.log(room);
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

      <ScrollView style={{ width: "100%" }}>
        {/* <View style={[styles.msgDefault, styles.msgUser]}>
          <Text style={styles.textoMsg}>Mensagem de teste!</Text>
        </View>

        <View style={[styles.msgDefault, styles.msgAmigo]}>
          <Text style={styles.textoMsg}>Mensagem de teste!</Text>
        </View> */}
      </ScrollView>

      <View
        style={[
          styles.feedDetails,
          styles.feedBottom,
          { flexDirection: "row" },
        ]}
      >
        <Ionicons name="happy" size={34} style={{ paddingLeft: 10 }}></Ionicons>

        <TextInput
          style={styles.input}
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
    marginTop: 8,
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
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
