import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";

export default function ModalCadastro({ visibleModCad, setVisibleModCad }) {
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
              alert("User cadastrado!");

              return setVisibleModCad(false);
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Cadastre-se
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
