import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Modal, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { UserContext } from "./UserProvider";
import React from "react";

export default function ModalPhoto({
  visibleModPho,
  setVisibleModPho,
  photo,
  idUser,
  nomeUser,
  sobrenomeUser,
  photoUser,
}: any) {
  const data = useContext(UserContext);

  const dadosExibicao = () => {
    if (idUser == data?.user?.id) {
      return (
        <>
          <Image
            source={
              data?.user?.PicturesConfig.profilePicture.image
                ? {
                    uri: data?.user?.PicturesConfig.profilePicture.image,
                  }
                : require("../../../assets/images/default-avatar.png")
            }
            style={styles.profilePic}
          ></Image>

          <Text style={{ paddingLeft: 5, width: "75%", fontSize: 17 }}>
            {data?.user?.nome} {data?.user?.sobrenome}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Image
            source={
              photoUser
                ? {
                    uri: photoUser,
                  }
                : require("../../../assets/images/default-avatar.png")
            }
            style={styles.profilePic}
          ></Image>

          <Text style={{ paddingLeft: 5, width: "75%", fontSize: 17 }}>
            {nomeUser} {sobrenomeUser}
          </Text>
        </>
      );
    }
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visibleModPho}>
        <View style={styles.modal}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 7,
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          >
            {dadosExibicao()}

            <Ionicons
              name="close"
              size={36}
              onPress={() => setVisibleModPho(false)}
            ></Ionicons>
          </View>

          <Image style={styles.photo} source={{ uri: photo }}></Image>
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
    marginVertical: "auto",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
  },
  photo: {
    width: "100%",
    height: 400,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
