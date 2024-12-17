import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import User from "../../models/UserModel";

export default function ModalCadastro({ visibleModCad, setVisibleModCad }) {
  const cadastrarUsuario = async () => {
    const user = new User("user", "3", "email3", "5678", "ind");

    return user.registrar(user);
  };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("3");
      alert(data);
    } catch (error) {
      console.log("Erro ao dar get: " + error);
    }
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visibleModCad}>
        <View style={styles.modal}>
          <Pressable style={{ marginVertical: 5 }}>
            <Ionicons
              name="chevron-back"
              size={30}
              onPress={() => setVisibleModCad(false)}
            ></Ionicons>
          </Pressable>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TextInput
              style={[styles.txtInput, { width: "45%" }]}
              placeholder="Nome"
              id="nome"
            ></TextInput>
            <TextInput
              style={[styles.txtInput, { width: "45%" }]}
              placeholder="Sobrenome"
            ></TextInput>
          </View>

          <TextInput style={styles.txtInput} placeholder="E-mail"></TextInput>
          <TextInput
            style={styles.txtInput}
            placeholder="Senha"
            secureTextEntry={true}
          ></TextInput>

          <TextInput style={styles.txtInput} placeholder="Data"></TextInput>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Pressable style={[styles.txtInput, { width: "45%" }]}>
              <Text>Masculino</Text>
            </Pressable>

            <Pressable style={[styles.txtInput, { width: "45%" }]}>
              <Text>Feminino</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.cadBtn}
            onPress={() => {
              return setVisibleModCad(false);
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18 }}
              onPress={cadastrarUsuario}
            >
              Cadastre-se
            </Text>
          </Pressable>

          <Pressable
            style={[styles.cadBtn, { backgroundColor: "red" }]}
            onPress={getData}
          >
            <Text style={{ textAlign: "center", fontSize: 18, color: "#fff" }}>
              DEBUG
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    width: "90%",
    marginHorizontal: "auto",
    marginVertical: "auto",
    borderRadius: 12,
    padding: 10,
  },

  txtInput: {
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: "auto",
    width: "95%",
    height: 40,
    justifyContent: "center",
    paddingLeft: 10,
    fontSize: 15,
  },

  cadBtn: {
    marginHorizontal: "auto",
    width: "45%",
    backgroundColor: "#51ADE5",
    paddingVertical: 5,
    marginTop: 15,
    borderRadius: 12,
  },
});
