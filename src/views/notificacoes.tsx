import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";

export default function Notificacoes() {
  return (
    <View style={{ alignItems: "center", height: "90%" }}>
      <View style={styles.feedDefault}>
        <View style={styles.topFeedPerfil}>
          <Ionicons name="chevron-back" size={32} />

          <Text style={styles.subtitulo}>Todas suas notificações</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ alignItems: "center", width: 320 }}
        >
          <Text style={{ fontSize: 17, marginTop: 10 }}>
            Você não tem nenhuma notificação...
          </Text>

          {/* <Pressable style={styles.btnNotificacao}>
            <Ionicons
              name="person"
              size={40}
              style={{ marginVertical: 5, marginHorizontal: 10 }}
            ></Ionicons>
            <View style={{ flexDirection: "column", width: "80%" }}>
              <Text style={{ fontSize: 17 }}>
                Nome fez um pedido de amizade
              </Text>

              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Pressable
                  style={[styles.btnInteracao, { backgroundColor: "#51ADE5" }]}
                >
                  <Text style={styles.texto}>Aceitar</Text>
                </Pressable>

                <Pressable
                  style={[styles.btnInteracao, { backgroundColor: "#B5B5B5" }]}
                >
                  <Text style={styles.texto}>Negar</Text>
                </Pressable>
              </View>
            </View>
          </Pressable> */}

          {/* <Pressable style={styles.btnNotificacao}>
            <Ionicons
              name="person"
              size={40}
              style={{ marginVertical: 5, marginHorizontal: 10 }}
            ></Ionicons>
            <View style={{ flexDirection: "row", width: "80%" }}>
              <Text style={{ fontSize: 17 }}>Nome te enviou mensagem!</Text>

              <Ionicons
                name="close"
                size={25}
                style={{ marginLeft: 10 }}
              ></Ionicons>
            </View>
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

  btnNotificacao: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },

  btnInteracao: {
    width: "40%",
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 5,
  },

  texto: {
    textAlign: "center",
    color: "#000",
    fontSize: 16,
  },
});
