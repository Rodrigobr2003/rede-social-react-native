import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View, Text } from "react-native";

export default function TelaPesquisa() {
  return (
    <ScrollView style={{ backgroundColor: "#fff", borderTopWidth: 1 }}>
      {/* <View style={styles.profileSec}>
        <Ionicons
          name="person"
          size={45}
          style={{ width: "20%", paddingHorizontal: 10 }}
        ></Ionicons>

        <Text style={styles.nomeUser}>Nome do Usuário</Text>

        <Ionicons
          name="ellipsis-horizontal"
          size={30}
          style={{ width: "20%", paddingHorizontal: 20 }}
        ></Ionicons>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileSec: {
    width: "90%",
    marginHorizontal: "auto",
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  nomeUser: {
    fontSize: 20,
    fontWeight: "bold",
    width: "60%",
  },
});
