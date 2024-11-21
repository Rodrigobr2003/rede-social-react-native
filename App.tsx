import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";

export default function App() {
  const [fonteCarregada] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fonteCarregada) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titulo}>Conectando</Text>
        <Text style={styles.titulo}>o mundo em</Text>
        <Text style={styles.titulo}>uma esfera de</Text>
        <Text style={styles.titulo}>possibilidades</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D1D",
    alignItems: "center",
    paddingTop: 60,
  },

  titulo: {
    color: "#fff",
    fontSize: 26,
    textAlign: "center",
    fontFamily: "PressStart2P_400Regular",
  },
});
