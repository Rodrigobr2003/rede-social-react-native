import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

export default function TelaPesquisa({ res }: any) {
  const [resultadoPesquisa, setResultadoPesquisa] = useState<any[]>([]);

  useEffect(() => {
    console.log("Dados recebidos:", res); // Verifique o que está sendo passado para o componente
    if (res && Array.isArray(res)) {
      setResultadoPesquisa(res);
    }
  }, [res]);

  const exibirResultados = () => {
    return resultadoPesquisa.map((element: any, index: number) => (
      <View
        key={index}
        style={styles.profileSec}
        onTouchStart={() => router.navigate("/perfilProcurado")}
      >
        <Ionicons
          name="person"
          size={45}
          style={{ width: "20%", paddingHorizontal: 10 }}
        />
        <Text style={styles.nomeUser}>{element.nome || "Nome do Usuário"}</Text>
        <Ionicons
          name="ellipsis-horizontal"
          size={30}
          style={{ width: "20%", paddingHorizontal: 20 }}
        />
      </View>
    ));
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff", borderTopWidth: 1 }}>
      {exibirResultados()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileSec: {
    width: "90%",
    marginHorizontal: "auto",
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  nomeUser: {
    fontSize: 20,
    fontWeight: "bold",
    width: "60%",
  },
});
