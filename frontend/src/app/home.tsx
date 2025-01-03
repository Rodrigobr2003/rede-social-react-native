import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./includes/UserProvider";
import React from "react";

import moment from "moment";

export default function Home() {
  const dataUser = useContext(UserContext); //DADOS DO USER
  const [dispSend, setDispSend] = useState(false);
  const [dispCom, setDispCom] = useState(false);
  const [txtMsg, setTxtMsg] = useState("");
  const [txtCom, setTxtCom] = useState("");
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

  async function publicarMensagem(txtMsg: string) {
    try {
      const msgObj = {
        chatRoom: room,
        message: { texto: txtMsg },
        idUserMsg: dataUser?.user?.id,
        nome: dataUser?.user?.nome || "",
        sobrenome: dataUser?.user?.sobrenome || "",
        data: "",
        curtidas: [],
        comentarios: [],
      };

      setMensagens((prevMsgs) => [...prevMsgs, msgObj]);

      await fetch("http://10.0.2.2:3008/salvaMensagens", {
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
      `http://10.0.2.2:3008/carregaMensagens/${room}`,
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
    const response = await fetch("http://10.0.2.2:3008/curtirMensagem", {
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
    const response = await fetch("http://10.0.2.2:3008/descurtirMensagem", {
      method: "PUT",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ idMsg: msg.idMsg, idUser: dataUser?.user?.id }),
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
    const msgObj = {
      chatRoom: room,
      message: { texto: txtMsg },
      idUserMsg: dataUser?.user?.id,
      nome: dataUser?.user?.nome || "",
      sobrenome: dataUser?.user?.sobrenome || "",
      data: "",
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

    await fetch("http://10.0.2.2:3008/compartilharMensagem", {
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
    const response = await fetch("http://10.0.2.2:3008/comentar", {
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

  useEffect(() => {
    carregaMensagem();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <View style={[styles.feedDefault, styles.feedPerfil]}>
        <View
          style={[
            styles.msgInfos,
            styles.topFeedPerfil,
            { alignItems: "center" },
          ]}
        >
          <Ionicons name="person" size={40}></Ionicons>

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
          <Pressable style={styles.btnAnexo}>
            <Ionicons name="camera" size={40} color={"#D70040"}></Ionicons>
            <Text style={{ fontSize: 25, paddingLeft: 10 }}>Vídeo</Text>
          </Pressable>

          <Pressable style={styles.btnAnexo}>
            <Ionicons name="images" size={40} color={"#2e8b57"}></Ionicons>
            <Text style={{ fontSize: 25, paddingLeft: 10 }}>Foto</Text>
          </Pressable>

          <Pressable style={styles.btnAnexo}>
            <Ionicons name="happy" size={40} color={"#E7DA41"}></Ionicons>
            <Text style={{ fontSize: 25, paddingLeft: 10 }}>Sentimento</Text>
          </Pressable>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {mensagens.map((msg, idx) => {
            let compDisp = null;

            const isShared = () => {
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
                      {msg.isShared?.texto}
                    </Text>
                  </View>
                );
              } else {
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
                      style={[styles.btnAnexo, styles.btnInteracoes]}
                      onPress={() => {
                        curtirMensagem(msg);
                      }}
                    >
                      <Ionicons
                        name="thumbs-up-outline"
                        size={25}
                        color={"#000"}
                      />
                      <Text style={{ fontSize: 12, paddingLeft: 4 }}>
                        Curtir
                      </Text>
                    </Pressable>
                  </>
                );
              }
            };

            const comAberto = () => {
              if (!dispCom) {
                return (
                  <Pressable
                    style={[styles.btnAnexo, styles.btnInteracoes]}
                    onPress={() => {
                      setDispCom(true);
                    }}
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
                    onPress={() => {
                      setDispCom(false);
                    }}
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
                    <Ionicons
                      name="person"
                      size={40}
                      style={{ marginVertical: 5 }}
                    ></Ionicons>

                    <View style={{ width: "80%" }}>
                      <Text style={{ fontSize: 22, fontWeight: "600" }}>
                        {msg.nome} {msg.sobrenome}
                      </Text>

                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textoPequeno}>{msg.data}</Text>
                      </View>
                    </View>
                  </View>

                  {isShared()}
                </View>

                <View style={styles.bottomFeedPerfil}>
                  <Text
                    style={[
                      styles.textoPequeno,
                      { marginRight: "auto", marginLeft: 20 },
                    ]}
                  >
                    {numCurtidas()}
                  </Text>

                  <View style={{ flexDirection: "row", width: "90%" }}>
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
                                    style={{ fontSize: 18, fontWeight: "600" }}
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
                </View>
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
    paddingBottom: 15,
  },

  bottomFeedPerfil: {
    flexDirection: "column",
    alignItems: "center",
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
    marginBottom: 40,
    width: 300,
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

  btnAnexo: {
    width: "85%",
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
