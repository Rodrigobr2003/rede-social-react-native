import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useSegments } from "expo-router";
import { useContext, useState } from "react";
import TelaPesquisa from "@/telaPesquisa";
import React from "react";
import { SearchContext } from "./SearchProvider";
import { UserContext } from "./UserProvider";

export default function Header({ display }: { display: any }) {
  const searchContext = useContext(SearchContext);
  const dataUser = useContext(UserContext);
  if (!searchContext) {
    throw new Error("SearchContext = null");
  }
  const { setSearchResults } = searchContext;
  const { searchBar } = searchContext;
  const { setSearchBar } = searchContext;

  function navigate() {
    router.navigate("/telaPesquisa");
  }

  function closeNav() {
    setVisibleNav(false);
  }

  const [resultado, setResultado] = useState(null);

  async function pesquisarPerfil(perfilPesq: string) {
    try {
      if (perfilPesq == "") {
        return setSearchResults([]);
      }

      const response = await fetch(
        `http://192.168.15.10:3008/pesquisarPerfil/${perfilPesq}`,
        {
          method: "GET",
          mode: "cors",
        }
      );

      const data = await response.json();

      setSearchResults(data);
    } catch (error) {
      console.log("Erro ao enviar dados para buscar perfil : " + error);
    }
  }

  const [visibleNav, setVisibleNav] = useState(false);

  const segments = useSegments();
  const currentPath = segments.join("/");

  async function logout() {
    setSearchBar("");

    try {
      const response = await fetch("http://192.168.15.10:3008/logout", {
        method: "POST",
        mode: "cors",
      });

      if (response.ok) {
        dataUser?.setUser(null);
        dataUser?.setUserNull();

        setSearchResults([]);

        router.navigate("/");
        closeNav();
      }
    } catch (error) {
      console.log("Erro ao fazer logout : " + error);
    }
  }

  return (
    <>
      <View style={[styles.container, display]}>
        {/*Back BTN*/}
        <Pressable
          style={[
            styles.backButton,
            currentPath == "telaPesquisa" || currentPath == "perfilProcurado"
              ? { display: "flex" }
              : { display: "none" },
          ]}
          onPress={() => {
            router.back();
          }}
        >
          <Text>
            <Ionicons name="chevron-back" size={40} color={"#2B378F"} />
          </Text>
        </Pressable>

        <TextInput
          placeholder="Pesquise no Orbee..."
          value={searchBar}
          style={[
            styles.input,
            currentPath == "telaPesquisa"
              ? { width: 300, marginLeft: "auto" }
              : { width: 280 },
            currentPath == "perfilProcurado" ? { width: 240 } : {},
          ]}
          onFocus={() => {
            setVisibleNav(false);
            navigate();
          }}
          onChangeText={(txt) => {
            pesquisarPerfil(txt);
            setSearchBar(txt);
          }}
        ></TextInput>

        {/*Nav BTN*/}
        <Pressable
          style={[
            styles.burguerButton,
            currentPath == "telaPesquisa" || visibleNav
              ? { display: "none" }
              : { display: "flex" },
          ]}
          onPress={() => {
            closeNav();
          }}
          onPressOut={() => {
            setVisibleNav(true);
          }}
        >
          <Text>
            <Ionicons name="menu-outline" size={40} color={"#2B378F"} />
          </Text>
        </Pressable>

        {/*Close BTN*/}
        <Pressable
          style={[
            styles.burguerButton,
            currentPath == "telaPesquisa"
              ? { display: "flex" }
              : { display: "none" },
            visibleNav ? { display: "flex" } : { display: "none" },
          ]}
          onPress={() => {
            setVisibleNav(false);
          }}
        >
          <Text>
            <Ionicons name="close-outline" size={40} color={"#2B378F"} />
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          visibleNav ? { display: "flex" } : { display: "none" },
          styles.nav,
        ]}
      >
        <Pressable
          onPress={() => {
            router.navigate("/home");
            closeNav();
          }}
        >
          <Text style={styles.navItem}>Home</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            router.navigate("/amigos");
            closeNav();
          }}
        >
          <Text style={styles.navItem}>Amigos</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            router.navigate("/notificacoes");
            closeNav();
          }}
        >
          <Text style={styles.navItem}>Notificações</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            router.navigate("/perfil");
            closeNav();
          }}
        >
          <Text style={styles.navItem}>Perfil</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            logout();
          }}
        >
          <Text style={[styles.navItem, { color: "red" }]}>Sair</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },

  input: {
    width: 300,
    backgroundColor: "#F0F2F5",
    marginVertical: 20,
    marginHorizontal: "5%",
    padding: 10,
    borderRadius: 18,
    color: "#000",
    fontSize: 20,
  },

  burguerButton: {
    marginVertical: 20,
  },

  backButton: {
    marginVertical: 20,
    marginHorizontal: 10,
  },

  nav: {
    position: "absolute",
    backgroundColor: "#fff",
    marginTop: 80,
    zIndex: 1,
    width: "100%",
  },

  navItem: {
    textAlign: "center",
    fontSize: 40,
    marginVertical: 5,
    fontWeight: "700",
  },
});
