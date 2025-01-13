import { Ionicons } from "@expo/vector-icons";
import { Modal, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

export default function ModalPhoto({ visibleModPho, setVisibleModPho }: any) {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visibleModPho}>
        <View style={styles.modal}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 7,
              borderBottomWidth: 1,
            }}
          >
            <Ionicons name="person" size={36}></Ionicons>

            <Text style={{ paddingLeft: 5, width: "80%", fontSize: 17 }}>
              Username usernick
            </Text>

            <Ionicons
              name="close"
              size={36}
              onPress={() => setVisibleModPho(false)}
            ></Ionicons>
          </View>

          <Image
            style={styles.photo}
            source={require("../../../assets/images/default-image.png")}
          ></Image>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 7,
              borderTopWidth: 1,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "25%",
                alignItems: "center",
                marginHorizontal: 2,
              }}
            >
              <Ionicons name="thumbs-up-outline" size={32} />

              <Text style={{ paddingLeft: 5, width: "80%", fontSize: 17 }}>
                Curtir
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "30%",
                alignItems: "center",
                marginHorizontal: 2,
              }}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={25}
                color={"#000"}
              ></Ionicons>

              <Text style={{ paddingLeft: 5, width: "80%", fontSize: 17 }}>
                Comentar
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "40%",
                alignItems: "center",
                marginHorizontal: 2,
              }}
            >
              <Ionicons
                name="share-outline"
                size={25}
                color={"#000"}
              ></Ionicons>

              <Text style={{ paddingLeft: 5, width: "80%", fontSize: 17 }}>
                Compartilhar
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#E9EEF1",
    width: "85%",
    marginHorizontal: "auto",
    marginVertical: "auto",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
  },
  photo: {
    width: "100%",
    borderBottomWidth: 1,
  },
});
