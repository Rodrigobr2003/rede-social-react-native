import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { UserContext } from "./includes/UserProvider";

export default function Amigos() {
  const data = useContext(UserContext);

  let amigos = null;

  if ((data?.user?.amigos || "").length <= 0) {
    amigos = (
      <Text style={{ fontSize: 17, marginTop: 10 }}>
        Você ainda não tem amigos...
      </Text>
    );
  } else {
    //UTILIZAR FOR
  }

  return (
    <View style={{ alignItems: "center", height: "90%" }}>
      <View style={styles.feedDefault}>
        <View style={styles.topFeedPerfil}>
          <Ionicons name="chevron-back" size={32} />

          <Text style={styles.subtitulo}>Todos seus amigos</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ alignItems: "center", width: 320 }}
        >
          {amigos}

          {/* <Pressable style={styles.btnAmigo}>
            <Ionicons
              name="person"
              size={40}
              style={{ marginVertical: 5, marginHorizontal: 15 }}
            ></Ionicons>
            <Text style={{ fontSize: 17 }}>Nome do usuário</Text>
          </Pressable> */}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedDefault: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    width: "90%",
    height: "90%",
  },

  topFeedPerfil: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },

  subtitulo: {
    fontWeight: "bold",
    fontSize: 35,
    width: "85%",
    textAlign: "center",
  },

  btnAmigo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
});
