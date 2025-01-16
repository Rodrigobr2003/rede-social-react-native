import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { UserContext } from "./includes/UserProvider";

import * as ImagePicker from "expo-image-picker";
import ModalPhoto from "./includes/ModalPhoto";

export default function Perfil() {
  const data = useContext(UserContext); //DADOS DO USER

  const [user, setUser] = useState(null);
  const [dispConfirm, setDispConfirm] = useState(false);
  const [desc, setDesc] = useState(user?.descricao);
  const textInputRef = useRef(null);
  const [photoSelec, setPhotoSelec] = useState("");
  const [visibleModPho, setVisibleModPho] = useState(false);

  useEffect(() => {
    setUser(data?.user);
  }, [data]);

  let descricao = null;

  if ((user?.descricao ?? "").length <= 0) {
    descricao = (
      <TextInput
        ref={textInputRef}
        placeholder="Adicionar descrição"
        placeholderTextColor={"#000"}
        style={{
          fontSize: 15,
          width: "85%",
          marginHorizontal: 10,
        }}
        onFocus={() => {
          setDispConfirm(true);
        }}
        onBlur={() => setDispConfirm(false)}
        onChangeText={(txt) => {
          setDesc(txt);
        }}
      ></TextInput>
    );
  } else {
    descricao = (
      <TextInput
        ref={textInputRef}
        placeholder={user?.descricao}
        value={desc}
        placeholderTextColor={"#000"}
        style={{
          fontSize: 15,
          width: "85%",
          marginHorizontal: 10,
        }}
        onFocus={() => {
          setDispConfirm(true);
        }}
        onBlur={() => setDispConfirm(false)}
        onChangeText={(txt) => {
          setDesc(txt);
        }}
      ></TextInput>
    );
  }

  const salvarDesc = async () => {
    const response = await fetch("http://10.0.2.2:3008/salvarDesc", {
      method: "PUT",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: user?.id, desc: desc }),
    });

    const dados = await response.json();

    setUser(dados);
    data?.setUser(dados);
    data?.fetchUserData();

    setDispConfirm(false);
    textInputRef.current.blur();
  };

  const uploadImage = async (typePhoto: number) => {
    try {
      let result = {};

      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      Alert.alert(
        "Confirmação",
        "Você deseja adicionar esta foto como foto de perfil?",
        [
          {
            text: "Não",
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: () => salvarFoto(),
          },
        ],
        { cancelable: true }
      );

      async function salvarFoto() {
        const uri = result.assets[0].uri;

        try {
          const response = await fetch(uri);
          const blob = await response.blob();

          const reader = new FileReader();

          const base64 = await new Promise((resolve, reject) => {
            reader.onload = () => {
              resolve(reader.result?.toString());
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(blob);
          });

          const respImage = await fetch("http://10.0.2.2:3008/salvarImagem", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              "access-control-allow-origin": "*",
            },
            body: JSON.stringify({
              idUser: data?.user?.id,
              base64: base64,
              type: typePhoto,
            }),
          });

          const dados = await respImage.json();

          if (typePhoto == 1) {
            setUser((prevUser) => {
              if (!prevUser) return null;

              return {
                ...prevUser,
                PicturesConfig: {
                  profilePicture: dados.picturesConfig.profilePicture,
                },
              };
            });

            data?.setUser((prevUser) => {
              if (!prevUser) return null;

              return {
                ...prevUser,
                PicturesConfig: {
                  profilePicture: {
                    image: String,
                  },
                },
              };
            });

            data?.fetchUserData();
          }

          if (typePhoto == 2) {
          }

          if (typePhoto == 3) {
          }

          reader.onerror = (error) => {
            console.log("Erro:", error);
          };

          reader.readAsDataURL(blob);
        } catch (error) {
          console.log("Erro ao carregar imagem:", error);
        }
      }
    } catch (error) {
      console.log("Erro imagem no front: ", error);
    }
  };

  const exibirFotos = () => {
    if (!data?.user?.PicturesConfig?.pictures) return null;
    const groupedPhotos = data.user.PicturesConfig.pictures.reduce(
      (result, foto, index) => {
        if (index % 3 === 0) result.push([]);
        result[result.length - 1].push(foto);
        return result;
      },
      []
    );
    return groupedPhotos.map((group, groupIndex) => (
      <View key={groupIndex} style={styles.row}>
        {group.map((foto, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setPhotoSelec(foto);
                setVisibleModPho(true);
              }}
            >
              <Image
                style={styles.imgPosted}
                source={
                  foto.image
                    ? { uri: foto.image }
                    : require("../../assets/images/default-image.png")
                }
              />
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.feedDefault}>
      <ModalPhoto
        visibleModPho={visibleModPho}
        setVisibleModPho={setVisibleModPho}
        photo={photoSelec}
        idUser={data?.user?.id}
        nomeUser={data?.user?.nome}
        sobrenomeUser={data?.user?.sobrenome}
        photoUser={data?.user?.PicturesConfig.profilePicture.image}
      ></ModalPhoto>

      <View style={styles.topFeedPerfil}>
        <View style={{ height: "60%" }}>
          <Image
            style={styles.bgTopImage}
            source={
              user?.PicturesConfig.profilePicture.image
                ? { uri: user?.PicturesConfig.bgPicture.image }
                : require("../../assets/images/default-image.png")
            }
          ></Image>

          <Pressable
            style={styles.editBtn}
            onPress={() => {
              uploadImage(3);
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff", fontSize: 17 }}>
              Editar Foto
            </Text>
          </Pressable>

          <View style={styles.container}>
            <Image
              style={styles.profilePic}
              source={
                user?.PicturesConfig.profilePicture.image
                  ? { uri: user?.PicturesConfig.profilePicture.image }
                  : require("../../assets/images/default-avatar.png")
              }
            />
          </View>

          <Ionicons
            name="camera"
            size={25}
            style={styles.changePic}
            onPress={() => {
              uploadImage(1);
            }}
          ></Ionicons>

          <View>
            <View style={styles.userInfo}>
              <Text
                style={[
                  {
                    fontSize: 18,
                    textAlign: "justify",
                  },
                  styles.userText,
                ]}
              >
                {user?.nome} {user?.sobrenome}
              </Text>

              <Text
                style={[
                  {
                    fontSize: 14,
                  },
                  styles.userText,
                ]}
              >
                {user?.amigos.length} amigos
              </Text>

              <View style={styles.desc}>
                <Ionicons name="pencil" size={20}></Ionicons>

                {descricao}

                <Ionicons
                  name="send"
                  size={20}
                  style={
                    dispConfirm ? { display: "flex" } : { display: "none" }
                  }
                  onPress={salvarDesc}
                ></Ionicons>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.bottomFeedPerfil}>
        {exibirFotos()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  feedDefault: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    width: "90%",
    height: "85%",
    marginHorizontal: "auto",
  },

  topFeedPerfil: {
    paddingBottom: 15,
    width: "100%",
    height: "40%",
    position: "relative",
  },

  bgTopImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  editBtn: {
    position: "relative",
    bottom: 40,
    backgroundColor: "#5D5F60",
    width: "35%",
    marginLeft: "auto",
    marginRight: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 180,
    bottom: 0,
    left: 45,
    width: 100,
    height: 100,
    resizeMode: "cover",
  },

  changePic: {
    position: "absolute",
    backgroundColor: "#51ADE5",
    width: "14%",
    padding: 5,
    textAlign: "center",
    borderRadius: 180,
    bottom: -35,
    left: 20,
    borderWidth: 8,
    borderColor: "#fff",
  },

  userInfo: {
    bottom: 30,
    width: "100%",
    marginLeft: "auto",
    paddingHorizontal: 5,
  },

  userText: {
    width: "60%",
    marginLeft: "auto",
  },

  desc: {
    borderBottomWidth: 1,
    width: "95%",
    marginHorizontal: "auto",
    flexDirection: "row",
    paddingLeft: "auto",
    alignItems: "center",
  },

  bottomFeedPerfil: {
    width: "100%",
    height: "100%",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    height: "30%",
    width: "100%",
  },

  imgPosted: {
    marginHorizontal: 2,
    width: "31%",
    height: "100%",
  },
});
