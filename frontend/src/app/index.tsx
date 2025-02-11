import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import { useState } from "react";

import ModalCadastro from "./includes/ModalCadastro";
import ModalLogin from "./includes/ModalLogin";

export default function Index() {
  const [visibleModCad, setVisibleModCad] = useState(false);
  const [visibleModLog, setVisibleModLog] = useState(false);

  const [fonteCarregada] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fonteCarregada) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ModalCadastro
          visibleModCad={visibleModCad}
          setVisibleModCad={setVisibleModCad}
        ></ModalCadastro>

        <ModalLogin
          visibleModLog={visibleModLog}
          setVisibleModLog={setVisibleModLog}
        ></ModalLogin>

        <View style={{ marginTop: 40 }}>
          <Text style={styles.titulo}>Conectando</Text>
          <Text style={styles.titulo}>o mundo em</Text>
          <Text style={styles.titulo}>uma esfera de</Text>
          <Text style={styles.titulo}>possibilidades</Text>
        </View>

        <View>
          <Image
            style={styles.imagem}
            source={require("../../assets/images/marca.png")}
          ></Image>
        </View>

        <View style={styles.interacao}>
          <Text style={styles.subtitulo}>Inscreva-se hoje</Text>

          <TouchableHighlight
            style={[styles.button, { backgroundColor: "#2c3892" }]}
            onPress={() => setVisibleModCad(true)}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              Criar conta!
            </Text>
          </TouchableHighlight>

          <Text style={styles.politicas}>
            Ao inscrever-se, você concorda com os
            <Text style={styles.politicasLink}>Termos de Serviço</Text> e a
            <Text style={styles.politicasLink}>Política de Privacidade</Text>,
            incluindo o<Text style={styles.politicasLink}>Uso de Cookies</Text>.
          </Text>

          <View style={styles.secCadastro}>
            <Text style={[styles.subtitulo, styles.subTitSecCad]}>
              Já tem uma conta?
            </Text>

            <TouchableHighlight
              style={[styles.button, styles.buttonEntrar]}
              onPress={() => setVisibleModLog(true)}
            >
              <Text style={[styles.buttonText, { color: "#2c3892" }]}>
                Entrar
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1D1D1D",
  },

  titulo: {
    color: "#fff",
    fontSize: 26,
    textAlign: "center",
    fontFamily: "PressStart2P_400Regular",
  },

  imagem: {
    width: 350,
    height: 350,
    marginTop: 20,
    marginBottom: 20,
  },

  interacao: {
    display: "flex",
    alignItems: "center",
  },

  subtitulo: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 5,
  },

  button: {
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 18,
    width: 200,
    alignItems: "center",
    marginBottom: 8,
  },

  buttonText: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
  },

  politicas: {
    color: "#fff",
    width: 350,
    textAlign: "center",
  },

  politicasLink: {
    color: "#4998C8",
  },

  secCadastro: {
    marginTop: 20,
    alignItems: "center",
  },

  subTitSecCad: {
    fontSize: 20,
  },

  buttonEntrar: {
    backgroundColor: "#1D1D1D",
    borderWidth: 1,
    borderColor: "#4998C8",
    width: 150,
  },
});
