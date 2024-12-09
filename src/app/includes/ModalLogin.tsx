import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { router } from "expo-router";

export default function ModalLogin({ visibleModLog, setVisibleModLog }) {
  function login() {
    router.navigate("/home");
  }

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visibleModLog}>
        <View style={styles.modal}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "auto",
            }}
          >
            <Pressable style={{ marginVertical: 5, width: "15%" }}>
              <Ionicons
                name="chevron-back"
                size={30}
                onPress={() => setVisibleModLog(false)}
              ></Ionicons>
            </Pressable>

            <Text style={{ fontSize: 30 }}>Entrar no Orbee</Text>
          </View>

          <TextInput style={styles.txtInput} placeholder="E-mail"></TextInput>
          <TextInput
            style={styles.txtInput}
            placeholder="Senha"
            secureTextEntry={true}
          ></TextInput>

          <Pressable
            style={styles.logBtn}
            onPress={() => {
              setVisibleModLog(false);

              return login();
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Faça Login
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

  logBtn: {
    marginHorizontal: "auto",
    width: "45%",
    backgroundColor: "#51ADE5",
    paddingVertical: 5,
    marginTop: 15,
    borderRadius: 12,
  },
});
