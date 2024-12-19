import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function ModalCadastro({
  visibleModCad,
  setVisibleModCad,
}: any) {
  const UserSchema = yup.object({
    nome: yup
      .string()
      .required("Informe seu nome")
      .min(2, "Seu nome deve ter no mínimo 2 caracteres"),
    sobrenome: yup
      .string()
      .required("Informe seu sobrenome")
      .min(2, "Seu sobrenome deve ter no mínimo 2 caracteres"),
    email: yup.string().email("Email inválido").required("Informe seu email"),
    senha: yup
      .string()
      .min(4, "A senha deve ter no mínimo 4 caracteres")
      .required("Informe sua senha"),
    data: yup.string().required("Informe sua data de nascimento"),
    genero: yup.string().required("Informe seu gênero"),
  });

  const cadastrarUsuario = async (formData: any) => {
    const user = new User(
      formData.nome,
      formData.sobrenome,
      formData.email,
      formData.senha,
      formData.data,
      formData.genero
    );

    reset();

    user.registrar(user);

    return setVisibleModCad(false);
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

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
            <View style={{ width: "45%" }}>
              <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.txtInput, { width: "100%" }]}
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                  ></TextInput>
                )}
              />
              {errors.nome && (
                <Text style={styles.errorMsg}>{errors.nome?.message}</Text>
              )}
            </View>

            <View style={{ width: "45%" }}>
              <Controller
                control={control}
                name="sobrenome"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.txtInput, { width: "100%" }]}
                    placeholder="Sobrenome"
                    onChangeText={onChange}
                    value={value}
                  ></TextInput>
                )}
              />
              {errors.sobrenome && (
                <Text style={styles.errorMsg}>{errors.sobrenome?.message}</Text>
              )}
            </View>
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
          {errors.data && (
            <Text style={styles.errorMsg}>{errors.data?.message}</Text>
          )}

          <View>
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
            {errors.genero && (
              <Text style={styles.errorMsg}>{errors.genero?.message}</Text>
            )}
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

  errorMsg: {
    color: "red",
    textAlign: "center",
  },
});
