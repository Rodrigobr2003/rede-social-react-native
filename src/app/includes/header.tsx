import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useSegments } from "expo-router";

export default function Header({ display }: { display: any }) {
  function navigate() {
    router.navigate("/telaPesquisa");
  }

  const segments = useSegments();
  const currentPath = segments.join("/");

  return (
    <View style={[styles.container, display]}>
      <Pressable
        style={[
          styles.backButton,
          currentPath == "home" ? { display: "none" } : { display: "flex" },
        ]}
        onPress={() => {
          router.back();
        }}
      >
        <Text>
          <Ionicons name="chevron-back" size={40} color={"#2B378F"} />
        </Text>
      </Pressable>

      <TextInput
        placeholder="Pesquise no Orbee..."
        style={[
          styles.input,
          currentPath == "home"
            ? { width: 300 }
            : { width: 350, marginLeft: "auto" },
        ]}
        onPress={() => {
          navigate();
        }}
      ></TextInput>

      <Pressable
        style={[
          styles.burguerButton,
          currentPath == "home" ? { display: "flex" } : { display: "none" },
        ]}
      >
        <Text>
          <Ionicons name="menu-outline" size={40} color={"#2B378F"} />
        </Text>
      </Pressable>
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

  backButton: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
