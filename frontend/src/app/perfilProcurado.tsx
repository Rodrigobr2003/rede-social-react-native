import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { UserContext } from "./includes/UserProvider";
import React from "react";

export default function PerfilProcurado() {
  const route = useRoute();
  const [data, setData] = useState<
    {
      __v: 0;
      _id: string;
      amigos: [];
      data: string;
      descricao: string;
      email: string;
      genero: string;
      nome: string;
      notificacoes: [];
      sobrenome: string;
      PicturesConfig: {
        profilePicture: {
          image: string;
        };
        bgPicture: {
          image: string;
        };
        pictures: string[];
      };
    }[]
  >([]);
  const [photoSelec, setPhotoSelec] = useState("");
  const [visibleModPho, setVisibleModPho] = useState(false);
  const dataUser = useContext(UserContext);

  useEffect(() => {
    if (route.params) {
      const dataRoute = JSON.parse(route.params.data);

      setData(dataRoute);
    }
  }, [route.params]);

  const numAmigos = () => {
    if (!data || !data.amigos) {
      return "0 amigos";
    }
    if (data.amigos.length == 1) {
      return "1 amigo";
    } else {
      return `${data.amigos.length} amigos`;
    }
  };

  const amigo = () => {
    while (data.length == 0) {
      return;
    }

    if (data.amigos.length == 0) {
      return (
        <Pressable style={styles.btnInteract} onPress={adicionarAmigo}>
          <Ionicons
            style={{ textAlign: "center", color: "#fff" }}
            name="person-add"
            size={23}
          />
        </Pressable>
      );
    }

    return (
      <>
        {data?.amigos.map((obj: any) => {
          if (obj.id !== dataUser?.user?.id) {
            return (
              <Pressable
                key={obj.id}
                style={styles.btnInteract}
                onPress={adicionarAmigo}
              >
                <Ionicons
                  style={{ textAlign: "center", color: "#fff" }}
                  name="person-add"
                  size={23}
                />
              </Pressable>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  };

  async function adicionarAmigo() {
    await fetch("http://10.0.2.2:3008/enviarNotificacao", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tipo: 1,
        message: {
          nome: dataUser?.user?.nome,
          sobrenome: dataUser?.user?.sobrenome,
        },
        idUserMsg: dataUser?.user?.id,
        idPerfil: data._id,
      }),
    });
  }

  const exibirFotos = () => {
    if (!data?.picturesConfig?.pictures) return null;

    const groupedPhotos = data.picturesConfig.pictures.reduce(
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
                  foto
                    ? { uri: foto }
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
      <View style={styles.topFeedPerfil}>
        <View style={{ height: "60%" }}>
          <Image
            style={styles.bgTopImage}
            source={
              data?.picturesConfig.profilePicture.image
                ? { uri: data?.picturesConfig.bgPicture.image }
                : require("../../assets/images/default-avatar.png")
            }
          ></Image>

          <View style={styles.container}>
            <Image
              style={styles.profilePic}
              source={
                data?.picturesConfig.profilePicture.image
                  ? { uri: data?.picturesConfig.profilePicture.image }
                  : require("../../assets/images/default-avatar.png")
              }
            />
          </View>

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
                {data?.nome} {data?.sobrenome}
              </Text>

              <Text
                style={[
                  {
                    fontSize: 14,
                  },
                  styles.userText,
                ]}
              >
                {numAmigos()}
              </Text>

              <View style={styles.desc}>
                <Text
                  style={{
                    marginLeft: 15,
                    marginBottom: 5,
                    width: "65%",
                  }}
                >
                  {data?.descricao}
                </Text>
              </View>

              <View style={styles.interact}>
                {amigo()}

                <Pressable
                  style={styles.btnInteract}
                  onPress={() => {
                    router.push({
                      pathname: "/chatProfile",
                      params: { data: JSON.stringify(data) },
                    });
                  }}
                >
                  <Ionicons
                    style={{ textAlign: "center", color: "#fff" }}
                    name="chatbubble-ellipses"
                    size={23}
                  ></Ionicons>
                </Pressable>
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

  profilePic: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 180,
    bottom: -30,
    left: 45,
    width: 100,
    height: 100,
    resizeMode: "cover",
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
    top: 35,
  },

  desc: {
    borderBottomWidth: 1,
    width: "95%",
    marginHorizontal: "auto",
    flexDirection: "row",
    paddingLeft: "auto",
    alignItems: "center",
    top: 55,
  },

  interact: {
    width: "30%",
    marginLeft: "auto",
    flexDirection: "row",
  },

  btnInteract: {
    marginHorizontal: 5,
    padding: 9,
    backgroundColor: "#51ADE5",
    borderRadius: 80,
  },

  bottomFeedPerfil: {
    width: "100%",
    height: "100%",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 2,
    height: "30%",
  },

  imgPosted: {
    marginHorizontal: 2,
    width: "31%",
    height: "100%",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
