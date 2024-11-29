import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.feedDefault}>
      <View style={styles.topFeedPerfil}>
        <View style={{ borderWidth: 1, height: "60%" }}>
          <Image
            style={styles.bgTopImage}
            source={require("../../assets/images/default-image.png")}
          ></Image>

          <Pressable style={styles.editBtn}>
            <Text style={{ textAlign: "center", color: "#fff", fontSize: 17 }}>
              Editar Foto
            </Text>
          </Pressable>

          <Ionicons
            name="person"
            size={60}
            style={styles.profilePic}
          ></Ionicons>

          <Ionicons name="camera" size={25} style={styles.changePic}></Ionicons>

          <View>
            <Text>Nome do usuário</Text>
          </View>
        </View>
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
    height: "80%",
  },

  topFeedPerfil: {
    paddingBottom: 15,
    width: "100%",
  },

  bgTopImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },

  editBtn: {
    bottom: 40,
    backgroundColor: "#5D5F60",
    width: "35%",
    marginLeft: "auto",
    marginRight: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },

  profilePic: {
    backgroundColor: "#fff",
    width: "25%",
    padding: 15,
    borderRadius: 180,
    textAlign: "center",
    bottom: 85,
    left: 40,
  },

  changePic: {
    backgroundColor: "#51ADE5",
    width: "14%",
    padding: 5,
    textAlign: "center",
    borderRadius: 180,
    bottom: 125,
    left: 25,
    borderWidth: 8,
    borderColor: "#fff",
  },
});
