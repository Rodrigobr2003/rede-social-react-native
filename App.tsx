import { SafeAreaView, StyleSheet } from "react-native";
import Index from "./src/views";

export default function App() {
  // return <Index />;

  return (
    <SafeAreaView style={styles.container}>
      <Index></Index>
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
});
