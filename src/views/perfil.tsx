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

export default function Perfil() {
  return (
    <View style={styles.feedDefault}>
      <View style={styles.topFeedPerfil}>
        <View style={{ height: "60%" }}>
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
                <Ionicons name="pencil" size={20}></Ionicons>

                <TextInput
                  placeholder="Adicionar descrição"
                  placeholderTextColor={"#000"}
                  style={{ fontSize: 15 }}
                >
                  <Text></Text>
                </TextInput>
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

  editBtn: {
    position: "relative",
    bottom: 40,
    backgroundColor: "#5D5F60",
    width: "35%",
    marginLeft: "auto",
    marginRight: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  profilePic: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "25%",
    padding: 15,
    borderRadius: 180,
    textAlign: "center",
    bottom: -30,
    left: 40,
  },

  changePic: {
    position: "absolute",
    backgroundColor: "#51ADE5",
    width: "14%",
    padding: 5,
    textAlign: "center",
    borderRadius: 180,
    bottom: -35,
    left: 20,
    borderWidth: 8,
    borderColor: "#fff",
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
  },

  desc: {
    borderBottomWidth: 1,
    width: "95%",
    marginHorizontal: "auto",
    flexDirection: "row",
    paddingLeft: "auto",
    alignItems: "center",
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
