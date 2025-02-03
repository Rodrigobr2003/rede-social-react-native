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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserProvider";

export default function ModalLogin({ visibleModLog, setVisibleModLog }: any) {
  const userContext = useContext(UserContext);
  const fetchUserData = userContext?.fetchUserData;

  useEffect(() => {
    async function obterIpPublico() {
      const resposta = await fetch("https://api.ipify.org?format=json");
      const dados = await resposta.json();
    }

    obterIpPublico();
  });

  const loginSchema = yup.object({
    email: yup.string().email("Email inválido").required("Informe seu email"),
    senha: yup
      .string()
      .min(4, "A senha deve ter no mínimo 4 caracteres")
      .required("Informe sua senha"),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const login = async (formData: any) => {
    try {
      const response = await fetch("http://192.168.15.10:3008/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (fetchUserData) {
          await fetchUserData();
        }
        setVisibleModLog(false);
        router.navigate("/home");
      } else {
        console.log("Erro no login: ", data.message);

        if (data.message[0].includes("Senha")) {
          setError("senha", {
            type: "manual",
            message: data.message,
          });
        } else {
          setError("email", {
            type: "manual",
            message: data.message,
          });
        }
      }
    } catch (error) {
      console.log("Erro ao enviar dados para login: " + error);
    }
  };

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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.txtInput}
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
              ></TextInput>
            )}
          />
          {errors.email && (
            <Text style={styles.errorMsg}>{errors.email?.message}</Text>
          )}

          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.txtInput}
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={onChange}
                value={value}
              ></TextInput>
            )}
          />
          {errors.senha && (
            <Text style={styles.errorMsg}>{errors.senha?.message}</Text>
          )}

          <Pressable style={styles.logBtn} onPress={handleSubmit(login)}>
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
  errorMsg: {
    color: "red",
    textAlign: "center",
  },
});
