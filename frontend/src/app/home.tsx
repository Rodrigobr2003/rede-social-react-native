import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./includes/UserProvider";
import React from "react";

import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import ModalSentimento from "./includes/ModalSentimentos";
import { router } from "expo-router";

export default function Home() {
  const dataUser = useContext(UserContext); //DADOS DO USER
  const [dispSend, setDispSend] = useState(false);
  const [dispCom, setDispCom] = useState(null);
  const [txtMsg, setTxtMsg] = useState("");
  const [txtCom, setTxtCom] = useState("");
  const [image, setImage] = useState("");
  const [visibleModSen, setVisibleModSen] = useState(false);
  const room = "feed:1729232020";

  const [mensagens, setMensagens] = useState<
    {
      chatRoom: string;
      message: { texto: string };
      idUserMsg: string | undefined;
      nome: string;
      sobrenome: string;
      data: string;
      curtidas: any[];
      comentarios: any[];
      idMsg?: string;
      isShared?: {
        nome: string | undefined;
        sobrenome: string | undefined;
        texto: string | undefined;
        data: string | undefined;
      };
    }[]
  >([]);

  const toggleComentarios = (id: any) => {
    setDispCom(dispCom === id ? null : id);
  };

  const imagemPerfil = (
    <Image
      source={
        dataUser?.user?.PicturesConfig?.profilePicture?.image
          ? {
              uri: dataUser.user.PicturesConfig.profilePicture.image,
            }
          : require("../../assets/images/default-avatar.png")
      }
      style={styles.profilePic}
    ></Image>
  );

  const imagemOutros = (
    <Image
      source={require("../../assets/images/default-avatar.png")}
      style={styles.profilePic}
    ></Image>
  );

  async function publicarMensagem(txtMsg: string) {
    const momento = moment().format("DD/MM HH:mm");

    try {
      const msgObj = {
        chatRoom: room,
        message: { texto: txtMsg },
        idUserMsg: dataUser?.user?.id,
        nome: dataUser?.user?.nome || "",
        sobrenome: dataUser?.user?.sobrenome || "",
        data: momento,
        curtidas: [],
        comentarios: [],
      };

      setMensagens((prevMsgs) => [...prevMsgs, msgObj]);

      await fetch("http://192.168.15.10:3008/salvaMensagens", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(msgObj),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function carregaMensagem() {
    const response = await fetch(
      `http://192.168.15.10:3008/carregaMensagens/${room}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "content-type": "application/json" },
      }
    );

    const mensagensCarregadas = await response.json();

    const mensagensFormatadas = mensagensCarregadas.map((mensagem: any) => ({
      chatRoom: room, // Adicionando o chatRoom manualmente
      message: { texto: mensagem.texto },
      data: mensagem.tempo,
      nome: mensagem.nome,
      sobrenome: mensagem.sobrenome,
      idUserMsg: mensagem.idUser,
      curtidas: mensagem.curtidas,
      comentarios: mensagem.comentarios,
      idMsg: mensagem._id,
      isShared: {
        nome: mensagem.isShared.nome,
        sobrenome: mensagem.isShared.sobrenome,
        texto: mensagem.isShared.texto,
        data: mensagem.isShared.data,
      },
    }));

    setMensagens(mensagensFormatadas);
  }

  async function curtirMensagem(msg: any) {
    const response = await fetch("http://192.168.15.10:3008/curtirMensagem", {
      method: "PUT",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        idMsg: msg.idMsg,
        idUser: dataUser?.user?.id,
        tipo: 5,
        message: {
          nome: dataUser?.user?.nome,
          sobrenome: dataUser?.user?.sobrenome,
        },
        idUserMsg: dataUser?.user?.id,
        idPerfil: msg.idUserMsg,
      }),
    });

    const mensagensCarregadas = await response.json();
    const mensagensFormatadas = mensagensCarregadas.mensagem.map(
      (mensagem: any) => ({
        chatRoom: room,
        message: { texto: mensagem.texto },
        data: mensagem.tempo,
        nome: mensagem.nome,
        sobrenome: mensagem.sobrenome,
        idUserMsg: mensagem.idUser,
        curtidas: mensagem.curtidas,
        comentarios: mensagem.comentarios,
        idMsg: mensagem._id,
        isShared: {
          nome: msg.isShared.nome || "",
          sobrenome: msg.isShared.sobrenome || "",
          texto: msg.isShared.texto || "",
          data: msg.isShared.data || "",
        },
      })
    );
    setMensagens(mensagensFormatadas);
  }

  async function descurtirMensagem(msg: any) {
    const response = await fetch(
      "http://192.168.15.10:3008/descurtirMensagem",
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ idMsg: msg.idMsg, idUser: dataUser?.user?.id }),
      }
    );

    const mensagensCarregadas = await response.json();

    const mensagensFormatadas = mensagensCarregadas.mensagem.map(
      (mensagem: any) => ({
        chatRoom: room,
        message: { texto: mensagem.texto },
        data: mensagem.tempo,
        nome: mensagem.nome,
        sobrenome: mensagem.sobrenome,
        idUserMsg: mensagem.idUser,
        curtidas: mensagem.curtidas,
        comentarios: mensagem.comentarios,
        isShared: {
          nome: msg.isShared.nome || "",
          sobrenome: msg.isShared.sobrenome || "",
          texto: msg.isShared.texto || "",
          data: msg.isShared.data || "",
        },
      })
    );

    setMensagens(mensagensFormatadas);
  }

  async function compartilhar(
    nome: any,
    sobrenome: any,
    texto: any,
    data: any,
    msg: any
  ) {
    const momento = moment().format("DD/MM HH:mm");

    const msgObj = {
      chatRoom: room,
      message: { texto: txtMsg },
      idUserMsg: dataUser?.user?.id,
      nome: dataUser?.user?.nome || "",
      sobrenome: dataUser?.user?.sobrenome || "",
      data: momento,
      curtidas: [],
      comentarios: [],
      isShared: {
        nome: nome,
        sobrenome: sobrenome,
        texto: texto,
        data: data,
      },
    };

    setMensagens((prevMsgs) => [...prevMsgs, msgObj]);

    await fetch("http://192.168.15.10:3008/compartilharMensagem", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        room: room,
        user: {
          nome: dataUser?.user?.nome,
          sobrenome: dataUser?.user?.sobrenome,
          idUser: dataUser?.user?.id,
        },
        perfil: { nome: nome, sobrenome: sobrenome, texto: texto, data: data },
        tipo: 4,
        message: {
          nome: dataUser?.user?.nome,
          sobrenome: dataUser?.user?.sobrenome,
        },
        idUserMsg: dataUser?.user?.id,
        idPerfil: msg.idUserMsg,
      }),
    });
  }

  async function comentar(msg: any) {
    const response = await fetch("http://192.168.15.10:3008/comentar", {
      method: "PUT",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        idMsg: msg.idMsg,
        user: {
          idUser: dataUser?.user?.id,
          nome: dataUser?.user?.nome,
          sobrenome: dataUser?.user?.sobrenome,
          texto: txtCom,
        },
        tipo: 3,
        message: {
          nome: dataUser?.user?.nome,
          sobrenome: dataUser?.user?.sobrenome,
        },
        idUserMsg: dataUser?.user?.id,
        idPerfil: msg.idUserMsg,
      }),
    });

    const dadosCom = await response.json();

    const mensagensFormatadas = dadosCom.mensagem.map((mensagem: any) => ({
      chatRoom: room,
      message: { texto: mensagem.texto },
      data: mensagem.tempo,
      nome: mensagem.nome,
      sobrenome: mensagem.sobrenome,
      idUserMsg: mensagem.idUser,
      curtidas: mensagem.curtidas,
      comentarios: mensagem.comentarios,
      isShared: {
        nome: msg.isShared.nome || "",
        sobrenome: msg.isShared.sobrenome || "",
        texto: msg.isShared.texto || "",
        data: msg.isShared.data || "",
      },
    }));

    setMensagens(mensagensFormatadas);
  }

  async function excluirPubli(idMsg: any) {
    const response = await fetch("http://192.168.15.10:3008/excluirPubli", {
      method: "PUT",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        room: room,
        idMensagem: idMsg,
      }),
    });

    const mensagensCarregadas = await response.json();
    const mensagensFormatadas = mensagensCarregadas.mensagem.map(
      (mensagem: any) => ({
        chatRoom: room,
        message: { texto: mensagem.texto },
        data: mensagem.tempo,
        nome: mensagem.nome,
        sobrenome: mensagem.sobrenome,
        idUserMsg: mensagem.idUser,
        curtidas: mensagem.curtidas,
        comentarios: mensagem.comentarios,
        idMsg: mensagem._id,
        isShared: {
          nome: "",
          sobrenome: "",
          texto: "",
          data: "",
        },
      })
    );

    setMensagens(mensagensFormatadas);
  }

  useEffect(() => {
    carregaMensagem();
  }, []);

  const uploadImage = async () => {
    try {
      let result = {};

      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
      });

      if (!result.assets || result.canceled) return;

      Alert.alert(
        "Confirmação",
        "Você deseja publicar esta foto?",
        [
          {
            text: "Não",
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: () => salvarFoto(result),
          },
        ],
        { cancelable: true }
      );

      if (!result) return;

      async function salvarFoto(result: any) {
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

          await fetch("http://192.168.15.10:3008/salvarImagem", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              "access-control-allow-origin": "*",
            },
            body: JSON.stringify({
              idUser: dataUser?.user?.id,
              base64: base64,
              type: 2,
            }),
          });

          publicarMensagem(base64 as string);

          dataUser?.setUser((prevUser) => {
            if (!prevUser) return null;

            return {
              ...prevUser,
              PicturesConfig: {
                ...prevUser.PicturesConfig,
                pictures: [
                  ...prevUser.PicturesConfig.pictures,
                  base64 as string,
                ],
              },
              id: prevUser.id,
              nome: prevUser.nome,
              sobrenome: prevUser.sobrenome,
              email: prevUser.email,
              notificacoes: prevUser.notificacoes || [],
            };
          });

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

  async function navegarPerfilProcurado(nome: any, sobrenome: any) {
    try {
      const response = await fetch(
        `http://192.168.15.10:3008/pesquisarPerfil/${nome}/${sobrenome}`,
        {
          method: "GET",
          mode: "cors",
        }
      );

      const dado = await response.json();

      if (dataUser?.user?.id === dado._id) {
        router.navigate("/perfil");
      } else {
        router.push({
          pathname: "/perfilProcurado",
          params: { data: JSON.stringify(dado) },
        });
      }
    } catch (error) {
      console.log("Erro ao enviar dados para buscar perfil : " + error);
    }
  }

  return (
    <View style={{ alignItems: "center" }}>
      <ModalSentimento
        visibleModSen={visibleModSen}
        setVisibleModSen={setVisibleModSen}
      ></ModalSentimento>

      <View style={[styles.feedDefault, styles.feedPerfil]}>
        <View
          style={[
            styles.msgInfos,
            styles.topFeedPerfil,
            { alignItems: "center" },
          ]}
        >
          {imagemPerfil}

          <View style={styles.topFeedInput}>
            <TextInput
              placeholder="Publique algo..."
              value={txtMsg}
              style={{
                height: 50,
                width: "85%",
                right: 5,
              }}
              onPressIn={() => {
                setDispSend(true);
              }}
              onChangeText={(txt) => {
                setTxtMsg(txt);
              }}
              onBlur={() => {
                setDispSend(false);
              }}
            ></TextInput>

            <Ionicons
              name="send"
              size={24}
              style={[
                { marginLeft: "auto" },
                dispSend ? { display: "flex" } : { display: "none" },
              ]}
              onPress={() => {
                publicarMensagem(txtMsg);
                setDispSend(false);
                setTxtMsg("");
              }}
            ></Ionicons>
          </View>
        </View>

        <View style={styles.bottomFeedPerfil}>
          <Pressable
            style={[styles.btnAnexo, { width: "25%" }]}
            onPress={() => {
              alert(
                "Por conta de limitações no banco de dados, é impossível carregar um vídeo..."
              );
            }}
          >
            <Ionicons name="camera" size={25} color={"#D70040"}></Ionicons>
            <Text style={{ fontSize: 15, paddingLeft: 4 }}>Vídeo</Text>
          </Pressable>

          <Pressable
            style={[styles.btnAnexo, { width: "20%" }]}
            onPress={() => uploadImage()}
          >
            <Ionicons name="images" size={25} color={"#2e8b57"}></Ionicons>
            <Text style={{ fontSize: 15, paddingLeft: 4 }}>Foto</Text>
          </Pressable>

          <Pressable
            style={styles.btnAnexo}
            onPress={() => setVisibleModSen(true)}
          >
            <Ionicons name="happy" size={25} color={"#E7DA41"}></Ionicons>
            <Text style={{ fontSize: 15, paddingLeft: 4 }}>Sentimento</Text>
          </Pressable>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
          style={[{ maxHeight: "88%" }]}
          showsVerticalScrollIndicator={false}
        >
          {mensagens
            .slice()
            .reverse()
            .map((msg, idx) => {
              let compDisp = null;

              const isShared = () => {
                if (msg.message.texto == undefined) return;

                if (msg.message.texto == "") {
                  compDisp = false;

                  return (
                    <View style={[styles.sharedPost]}>
                      <View
                        style={[
                          styles.msgInfos,
                          { width: "85%", marginHorizontal: "auto" },
                        ]}
                      >
                        <Ionicons
                          name="person"
                          size={28}
                          style={{ marginVertical: 5 }}
                        ></Ionicons>

                        <View style={{ width: "80%" }}>
                          <Text style={{ fontSize: 18, fontWeight: "600" }}>
                            {msg.isShared?.nome} {msg.isShared?.sobrenome}
                          </Text>

                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.textoPequeno}>
                              {msg.isShared?.data}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: 18,
                          width: "80%",
                          marginHorizontal: "auto",
                        }}
                      >
                        {msg.isShared?.texto &&
                        msg.isShared.texto.length > 200 ? (
                          <Image
                            source={{ uri: msg.isShared.texto }}
                            style={{ width: "100%", height: 300, marginTop: 7 }}
                          />
                        ) : (
                          <Text>{msg.isShared?.texto}</Text>
                        )}
                      </Text>
                    </View>
                  );
                } else if (msg.message.texto.length <= 500) {
                  compDisp = true;

                  return (
                    <Text
                      style={{
                        marginTop: 8,
                        fontSize: 18,
                        width: "95%",
                        marginHorizontal: "auto",
                      }}
                    >
                      {msg.message.texto}
                    </Text>
                  );
                } else {
                  compDisp = true;

                  return (
                    <Image
                      source={{ uri: msg.message.texto }}
                      style={{ width: "100%", height: 300, marginTop: 7 }}
                    ></Image>
                  );
                }
              };

              const isYourPost = () => {
                if (msg.idUserMsg === dataUser?.user?.id) {
                  return (
                    <Ionicons
                      name="trash"
                      size={25}
                      style={{
                        marginRight: 30,
                      }}
                      onPress={() => {
                        excluirPubli(msg.idMsg);
                      }}
                    ></Ionicons>
                  );
                }
              };

              const foiCurtido = () => {
                const isCurtido = msg.curtidas.some(
                  (curtida) => curtida.idUser === dataUser?.user?.id
                );

                if (isCurtido) {
                  return (
                    <>
                      <Pressable
                        style={[styles.btnAnexo, styles.btnInteracoes]}
                        onPress={() => {
                          descurtirMensagem(msg);
                        }}
                      >
                        <Ionicons name="thumbs-up" size={25} color={"#000"} />
                        <Text style={{ fontSize: 12, paddingLeft: 4 }}>
                          Curtido
                        </Text>
                      </Pressable>
                    </>
                  );
                } else {
                  return (
                    <>
                      <Pressable
                        style={[
                          styles.btnAnexo,
                          styles.btnInteracoes,
                          { flexDirection: "column" },
                        ]}
                        onPress={() => {
                          curtirMensagem(msg);
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Ionicons
                            name="thumbs-up-outline"
                            size={25}
                            color={"#000"}
                          />
                          <Text style={{ fontSize: 12, paddingLeft: 4 }}>
                            Curtir
                          </Text>
                        </View>
                      </Pressable>
                    </>
                  );
                }
              };

              const comAberto = () => {
                if (dispCom !== msg.idMsg) {
                  return (
                    <Pressable
                      style={[styles.btnAnexo, styles.btnInteracoes]}
                      onPress={() => toggleComentarios(msg.idMsg)}
                    >
                      <Ionicons
                        name="chatbubble-ellipses-outline"
                        size={25}
                        color={"#000"}
                      ></Ionicons>
                      <Text style={{ fontSize: 12, paddingLeft: 4 }}>
                        Comentar
                      </Text>
                    </Pressable>
                  );
                } else {
                  return (
                    <Pressable
                      style={[styles.btnAnexo, styles.btnInteracoes]}
                      onPress={() => toggleComentarios(msg.idMsg)}
                    >
                      <Ionicons
                        name="chatbubble-ellipses"
                        size={25}
                        color={"#000"}
                      ></Ionicons>
                      <Text style={{ fontSize: 12, paddingLeft: 4 }}>
                        Comentar
                      </Text>
                    </Pressable>
                  );
                }
              };

              const numCurtidas = () => {
                if (!msg || msg.curtidas.length == 0) {
                  return "0 curtidas";
                }
                if (msg.curtidas.length == 1) {
                  return "1 curtida";
                } else {
                  return `${msg.curtidas.length} curtidas`;
                }
              };

              return (
                <View
                  style={[
                    styles.feedDefault,
                    styles.feedPubli,
                    { marginBottom: 20, marginTop: 20 },
                  ]}
                  key={idx}
                >
                  <View style={styles.topFeedPerfil}>
                    <View style={styles.msgInfos}>
                      <View
                        onTouchStart={() => {
                          navegarPerfilProcurado(msg.nome, msg.sobrenome);
                        }}
                      >
                        {isYourPost() ? imagemPerfil : imagemOutros}
                      </View>

                      <View
                        style={
                          msg.idUserMsg == dataUser?.user?.id
                            ? { width: "70%", marginLeft: 10 }
                            : { width: "80%" }
                        }
                      >
                        <Text
                          style={{ fontSize: 22, fontWeight: "600" }}
                          onPress={() => {
                            navegarPerfilProcurado(msg.nome, msg.sobrenome);
                          }}
                        >
                          {msg.nome} {msg.sobrenome}
                        </Text>

                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.textoPequeno}>{msg.data}</Text>
                        </View>
                      </View>

                      {isYourPost()}
                    </View>

                    {isShared()}
                    <Text style={[styles.textoPequeno, { marginTop: "2%" }]}>
                      {numCurtidas()}
                    </Text>
                  </View>

                  <View style={styles.bottomFeedPerfil}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "90%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {foiCurtido()}

                      {comAberto()}

                      <Pressable
                        style={[
                          styles.btnAnexo,
                          styles.btnInteracoes,
                          compDisp ? { display: "flex" } : { display: "none" },
                        ]}
                        onPress={() => {
                          compartilhar(
                            msg.nome,
                            msg.sobrenome,
                            msg.message.texto,
                            msg.data,
                            msg
                          );
                        }}
                      >
                        <Ionicons
                          name="share"
                          size={25}
                          color={"#000"}
                        ></Ionicons>
                        <Text style={{ fontSize: 12, paddingLeft: 4 }}>
                          Compartilhar
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  {dispCom === msg.idMsg && (
                    <View
                      style={[
                        styles.comentarios,
                        { flex: 1 },
                        dispCom ? { display: "flex" } : { display: "none" },
                      ]}
                    >
                      <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                      >
                        <ScrollView
                          nestedScrollEnabled={true}
                          contentContainerStyle={{ flexGrow: 1 }}
                          style={[{ maxHeight: "85%" }]}
                        >
                          {msg.comentarios.map((comentario, idx) => {
                            return (
                              <View
                                key={idx}
                                style={{
                                  marginHorizontal: "auto",
                                  marginVertical: 10,
                                  width: "90%",
                                }}
                              >
                                <View style={{ flexDirection: "row" }}>
                                  <Ionicons
                                    name="person"
                                    size={28}
                                    style={{
                                      marginVertical: 5,
                                      marginHorizontal: 10,
                                    }}
                                  ></Ionicons>

                                  <View style={{ width: "80%" }}>
                                    <Text
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "600",
                                      }}
                                    >
                                      {comentario.nome} {comentario.sobrenome}
                                    </Text>

                                    <View style={{ flexDirection: "row" }}>
                                      <Text style={styles.textoPequeno}>
                                        {comentario.data}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    width: "80%",
                                    marginHorizontal: "auto",
                                  }}
                                >
                                  {comentario.comment}
                                </Text>
                              </View>
                            );
                          })}
                        </ScrollView>
                      </KeyboardAvoidingView>

                      <View
                        style={{
                          bottom: 0,
                          position: "absolute",
                          width: "100%",
                        }}
                      >
                        <View
                          style={[
                            styles.topFeedInput,
                            {
                              width: "90%",
                              marginHorizontal: "auto",
                              marginBottom: 10,
                            },
                          ]}
                        >
                          <TextInput
                            placeholder="Comente algo..."
                            value={txtCom}
                            style={{
                              height: 50,
                              width: "90%",
                              right: 8,
                              marginHorizontal: "auto",
                            }}
                            onPressIn={() => {
                              setDispSend(true);
                            }}
                            onChangeText={(txt) => {
                              setTxtCom(txt);
                            }}
                          ></TextInput>

                          <Ionicons
                            name="send"
                            size={24}
                            style={[
                              { marginLeft: "auto" },
                              dispSend
                                ? { display: "flex" }
                                : { display: "none" },
                            ]}
                            onPress={() => {
                              comentar(msg);
                              setDispSend(false);
                              setTxtCom("");
                            }}
                          ></Ionicons>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  feedDefault: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
  },

  msgInfos: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  topFeedPerfil: {
    borderBottomWidth: 1,
    paddingBottom: 5,
  },

  bottomFeedPerfil: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  textoPequeno: {
    fontSize: 15,
    marginHorizontal: 7,
    fontWeight: "600",
  },

  //#region FEED PERFIL
  feedPerfil: {
    marginTop: 30,
    marginBottom: 10,
    width: 350,
  },

  topFeedInput: {
    backgroundColor: "#F0F2F5",
    borderRadius: 18,
    width: "80%",
    color: "#000",
    padding: 10,
    fontSize: 15,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  btnAnexo: {
    width: "35%",
    height: "100%",
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  //#endregion

  //#region FEED PUBLIS
  feedPubli: {
    width: 350,
  },

  btnInteracoes: {
    width: "30%",
    marginHorizontal: 2,
  },

  sharedPost: {
    backgroundColor: "#b0b0b0",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 7,
  },

  comentarios: {
    width: "100%",
    height: 250,
    backgroundColor: "#d1cfcf",
    borderRadius: 10,
  },

  //#endregion
});
