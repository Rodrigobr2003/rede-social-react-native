import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={[styles.feedDefault, styles.feedPerfil]}>
        <View style={styles.topFeedPerfil}>
          <Ionicons name="person" size={40}></Ionicons>

          <TextInput
            placeholder="Publique algo..."
            style={styles.topFeedInput}
          ></TextInput>
        </View>

        <View style={styles.bottomFeedPerfil}>
          <Pressable style={styles.btnAnexo}>
            <Ionicons name="camera" size={40} color={"#D70040"}></Ionicons>
            <Text style={{ fontSize: 25, paddingLeft: 10 }}>Vídeo</Text>
          </Pressable>

          <Pressable style={styles.btnAnexo}>
            <Ionicons name="images" size={40} color={"#2e8b57"}></Ionicons>
            <Text style={{ fontSize: 25, paddingLeft: 10 }}>Foto</Text>
          </Pressable>

          <Pressable style={styles.btnAnexo}>
            <Ionicons name="happy" size={40} color={"#E7DA41"}></Ionicons>
            <Text style={{ fontSize: 25, paddingLeft: 10 }}>Sentimento</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.feedDefault, styles.feedPubli]}>
        <View style={styles.topFeedPerfil}>
          <Ionicons
            name="person"
            size={40}
            style={{ marginVertical: 5 }}
          ></Ionicons>

          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>
              Nome do usuário
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textoPequeno}>dd/mm</Text>
              <Text style={styles.textoPequeno}>hh:hh</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomFeedPerfil}>
          <Text
            style={[
              styles.textoPequeno,
              { marginRight: "auto", marginLeft: 20 },
            ]}
          >
            x curtidas
          </Text>

          <View style={{ flexDirection: "row", width: "90%" }}>
            <Pressable style={[styles.btnAnexo, styles.btnInteracoes]}>
              <Ionicons name="thumbs-up" size={25} color={"#000"}></Ionicons>
              <Text style={{ fontSize: 12, paddingLeft: 4 }}>Curtir</Text>
            </Pressable>

            <Pressable style={[styles.btnAnexo, styles.btnInteracoes]}>
              <Ionicons
                name="chatbubble-ellipses"
                size={25}
                color={"#000"}
              ></Ionicons>
              <Text style={{ fontSize: 12, paddingLeft: 4 }}>Comentar</Text>
            </Pressable>

            <Pressable style={[styles.btnAnexo, styles.btnInteracoes]}>
              <Ionicons name="share" size={25} color={"#000"}></Ionicons>
              <Text style={{ fontSize: 12, paddingLeft: 4 }}>Compartilhar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  feedDefault: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
  },

  topFeedPerfil: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },

  bottomFeedPerfil: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },

  textoPequeno: {
    fontSize: 15,
    marginHorizontal: 7,
    fontWeight: "600",
  },

  //#region FEED PERFIL
  feedPerfil: {
    marginTop: 30,
    marginBottom: 40,
    width: 300,
  },

  topFeedInput: {
    backgroundColor: "#F0F2F5",
    borderRadius: 18,
    width: "80%",
    color: "#000",
    padding: 10,
    fontSize: 15,
  },

  btnAnexo: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  //#endregion

  //#region FEED PUBLIS
  feedPubli: {
    width: 350,
  },

  btnInteracoes: {
    width: "30%",
    marginHorizontal: 2,
  },

  //#endregion
});
