import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquise no Orbee..."
        style={styles.input}
      ></TextInput>

      <TouchableHighlight style={styles.burguerButton}>
        <Text>
          <Ionicons name="menu-outline" size={40} color={"#2B378F"} />
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },

  input: {
    width: 300,
    backgroundColor: "#F0F2F5",
    marginVertical: 20,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 18,
    color: "#000",
    fontSize: 20,
  },

  burguerButton: {
    marginVertical: 20,
  },
});
