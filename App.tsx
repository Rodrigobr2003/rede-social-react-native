import { SafeAreaView, StyleSheet } from "react-native";
import Index from "./src/views";
import Header from "./src/views/includes/header";
import Home from "./src/views/home";

export default function App() {
  // return <Index />;

  return (
    <SafeAreaView style={styles.container}>
      <Header></Header>
      <Home></Home>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DADBDC",
    alignItems: "center",
    paddingTop: 60,
  },
});
