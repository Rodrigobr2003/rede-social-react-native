import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ModalSentimento({
  visibleModSen,
  setVisibleModSen,
}: any) {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visibleModSen}>
        <View style={styles.modal}>
          <Ionicons
            name="close"
            size={32}
            onPress={() => setVisibleModSen(false)}
          ></Ionicons>

          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Pressable style={styles.btnSen}>
              <Text style={styles.txtBtn}>😀 Feliz</Text>
            </Pressable>

            <Pressable style={styles.btnSen}>
              <Text style={styles.txtBtn}>😭 Triste</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Pressable style={styles.btnSen}>
              <Text style={styles.txtBtn}>😮 Espantado</Text>
            </Pressable>

            <Pressable style={styles.btnSen}>
              <Text style={styles.txtBtn}>🥹 Emotivo</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Pressable style={styles.btnSen}>
              <Text style={styles.txtBtn}>😠 Bravo</Text>
            </Pressable>

            <Pressable style={styles.btnSen}>
              <Text style={styles.txtBtn}>😡 Furioso</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Pressable style={styles.btnSen}>
              <Text style={styles.txtBtn}>😱 Assustado</Text>
            </Pressable>

            <Pressable style={styles.btnSen}>
              <Text style={styles.txtBtn}>🥰 Amado</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#E9EEF1",
    width: "85%",
    marginHorizontal: "auto",
    marginVertical: "75%",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
  },
  btnSen: {
    flexDirection: "row",
    width: "45%",
    marginHorizontal: "auto",
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtn: {
    fontSize: 25,
    textAlign: "center",
    paddingVertical: 5,
  },
});
