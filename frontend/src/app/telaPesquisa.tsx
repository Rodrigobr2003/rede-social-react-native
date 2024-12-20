import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { SearchContext } from "./includes/SearchProvider";

export default function TelaPesquisa() {
  const searchContext = useContext(SearchContext);
  const searchResults = searchContext ? searchContext.searchResults : [];

  return (
    <ScrollView style={{ backgroundColor: "#fff", borderTopWidth: 1 }}>
      {searchResults.map((element: any, index: number) => (
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
          <Text style={styles.nomeUser}>
            {element.nome + " " + element.sobrenome}
          </Text>
          <Ionicons
            name="ellipsis-horizontal"
            size={30}
            style={{ width: "20%", paddingHorizontal: 20 }}
          />
        </View>
      ))}
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
