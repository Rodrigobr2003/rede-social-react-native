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
import { useForm, Controller } from "react-hook-form";

import User from "../../models/UserModel";
import { useState } from "react";

export default function ModalCadastro({ visibleModCad, setVisibleModCad }) {
  const cadastrarUsuario = async (formData: any) => {
    const user = new User(
      formData.nome,
      formData.sobrenome,
      formData.email,
      formData.senha,
      formData.data,
      formData.genero
    );
    return user.registrar(user);
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

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
            <Controller
              control={control}
              name="nome"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.txtInput, { width: "45%" }]}
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                ></TextInput>
              )}
            />

            <Controller
              control={control}
              name="sobrenome"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.txtInput, { width: "45%" }]}
                  placeholder="Sobrenome"
                  onChangeText={onChange}
                  value={value}
                ></TextInput>
              )}
            />
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

          <Controller
            control={control}
            name="data"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.txtInput}
                placeholder="Data"
                onChangeText={onChange}
                value={value}
              ></TextInput>
            )}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Controller
              control={control}
              name="genero"
              render={() => (
                <Pressable
                  style={[styles.txtInput, { width: "45%" }]}
                  onPress={() => {
                    setValue("genero", "Masculino");
                  }}
                >
                  <Text>Masculino</Text>
                </Pressable>
              )}
            />

            <Controller
              control={control}
              name="genero"
              render={() => (
                <Pressable
                  style={[styles.txtInput, { width: "45%" }]}
                  onPress={() => {
                    setValue("genero", "Feminino");
                  }}
                >
                  <Text>Feminino</Text>
                </Pressable>
              )}
            />
          </View>

          <Pressable
            style={styles.cadBtn}
            onPress={() => {
              return setVisibleModCad(false);
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18 }}
              onPress={handleSubmit(cadastrarUsuario)}
            >
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
