import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.feedDefault}>
      <View style={styles.topFeedPerfil}>
        <Image
          style={styles.bgTopImage}
          source={require("../../assets/images/default-image.png")}
        ></Image>

        <Ionicons name="person" size={60} style={styles.profilePic}></Ionicons>

        <Ionicons name="camera" size={25} style={styles.changePic}></Ionicons>
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
    height: "45%",
    borderRadius: 10,
  },

  profilePic: {
    backgroundColor: "#fff",
    width: "25%",
    padding: 15,
    borderRadius: 180,
    textAlign: "center",
    bottom: 50,
    left: 40,
  },

  changePic: {
    backgroundColor: "#51ADE5",
    width: "10%",
    padding: 5,
    textAlign: "center",
    borderRadius: 180,
    bottom: 90,
    left: 25,
  },
});
