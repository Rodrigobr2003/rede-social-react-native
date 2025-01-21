import { SafeAreaView, StyleSheet } from "react-native";
import Index from "./src/app";
import Header from "./src/app/includes/header";
import Home from "./src/app/home";
import Amigos from "./src/app/amigos";
import Notificacoes from "./src/app/notificacoes";
import ChatProfile from "./src/app/chatProfile";
import Perfil from "./src/app/perfil";
import PerfilProcurado from "./src/app/perfilProcurado";

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
