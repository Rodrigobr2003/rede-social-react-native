import { SafeAreaView, StyleSheet } from "react-native";
import Index from "./src/views";
import Header from "./src/views/includes/header";
import Home from "./src/views/home";
import Amigos from "./src/views/amigos";
import Notificacoes from "./src/views/notificacoes";
import ChatProfile from "./src/views/chatProfile";
import Perfil from "./src/views/perfil";
import PerfilProcurado from "./src/views/perfilProcurado";

export default function App() {
  // return <Index />;

  return (
    <SafeAreaView style={styles.container}>
      <Header></Header>
      <PerfilProcurado></PerfilProcurado>
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
