import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  TextInput,
  ScrollView,
} from "react-native";

export default function PerfilProcurado() {
  return (
    <View style={styles.feedDefault}>
      <View style={styles.topFeedPerfil}>
        <View style={{ height: "60%" }}>
          <Image
            style={styles.bgTopImage}
            source={require("../../assets/images/default-image.png")}
          ></Image>

          <Ionicons
            name="person"
            size={60}
            style={styles.profilePic}
          ></Ionicons>

          <View>
            <View style={styles.userInfo}>
              <Text
                style={[
                  {
                    fontSize: 18,
                    textAlign: "justify",
                  },
                  styles.userText,
                ]}
              >
                Nome do usuário
              </Text>

              <Text
                style={[
                  {
                    fontSize: 14,
                  },
                  styles.userText,
                ]}
              >
                0 amigos
              </Text>

              <View style={styles.desc}>
                <Text
                  style={{
                    marginLeft: 15,
                    marginBottom: 5,
                    width: "65%",
                  }}
                >
                  Descrição do perfil...
                </Text>
              </View>

              <View style={styles.interact}>
                <Pressable style={styles.btnInteract}>
                  <Ionicons
                    style={{ textAlign: "center", color: "#fff" }}
                    name="person-add"
                    size={23}
                  ></Ionicons>
                </Pressable>

                <Pressable style={styles.btnInteract}>
                  <Ionicons
                    style={{ textAlign: "center", color: "#fff" }}
                    name="chatbubble-ellipses"
                    size={23}
                  ></Ionicons>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.bottomFeedPerfil}>
        <View style={styles.row}>
          <Image
            style={styles.imgPosted}
            source={require("../../assets/images/default-image.png")}
          ></Image>

          <Image
            style={styles.imgPosted}
            source={require("../../assets/images/default-image.png")}
          ></Image>

          <Image
            style={styles.imgPosted}
            source={require("../../assets/images/default-image.png")}
          ></Image>
        </View>

        <View style={styles.row}>
          <Image
            style={styles.imgPosted}
            source={require("../../assets/images/default-image.png")}
          ></Image>

          <Image
            style={styles.imgPosted}
            source={require("../../assets/images/default-image.png")}
          ></Image>

          <Image
            style={styles.imgPosted}
            source={require("../../assets/images/default-image.png")}
          ></Image>
        </View>

        <View style={styles.row}>
          <Image
            style={styles.imgPosted}
            source={require("../../assets/images/default-image.png")}
          ></Image>

          <Image
            style={styles.imgPosted}
            source={require("../../assets/images/default-image.png")}
          ></Image>

          <Image
            style={styles.imgPosted}
            source={require("../../assets/images/default-image.png")}
          ></Image>
        </View>
      </ScrollView>
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
    height: "40%",
    position: "relative",
  },

  bgTopImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  profilePic: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "25%",
    padding: 15,
    borderRadius: 180,
    textAlign: "center",
    bottom: -40,
    left: 30,
  },

  userInfo: {
    bottom: 30,
    width: "100%",
    marginLeft: "auto",
    paddingHorizontal: 5,
  },

  userText: {
    width: "60%",
    marginLeft: "auto",
    top: 35,
  },

  desc: {
    borderBottomWidth: 1,
    width: "95%",
    marginHorizontal: "auto",
    flexDirection: "row",
    paddingLeft: "auto",
    alignItems: "center",
    top: 55,
  },

  interact: {
    width: "30%",
    marginLeft: "auto",
    flexDirection: "row",
  },

  btnInteract: {
    marginHorizontal: 5,
    padding: 9,
    backgroundColor: "#51ADE5",
    borderRadius: 80,
  },

  bottomFeedPerfil: {
    width: "100%",
    height: "100%",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 2,
    height: "30%",
  },

  imgPosted: {
    marginHorizontal: 2,
    width: "31%",
    height: "100%",
  },
});
