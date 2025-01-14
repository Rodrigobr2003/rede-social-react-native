import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Modal, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { UserContext } from "./UserProvider";

export default function ModalPhoto({
  visibleModPho,
  setVisibleModPho,
  photo,
}: any) {
  const data = useContext(UserContext);

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
              marginBottom: 10,
            }}
          >
            <Ionicons name="person" size={36}></Ionicons>

            <Text style={{ paddingLeft: 5, width: "80%", fontSize: 17 }}>
              {data?.user?.nome} {data?.user?.sobrenome}
            </Text>

            <Ionicons
              name="close"
              size={36}
              onPress={() => setVisibleModPho(false)}
            ></Ionicons>
          </View>

          <Image style={styles.photo} source={{ uri: photo }}></Image>
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
    height: 400,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
});
