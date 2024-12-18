import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useSegments } from "expo-router";
import { useState } from "react";

export default function Header({ display }: { display: any }) {
  function navigate() {
    router.navigate("/telaPesquisa");
  }

  function closeNav() {
    setVisibleNav(false);
  }

  const [visibleNav, setVisibleNav] = useState(false);

  const segments = useSegments();
  const currentPath = segments.join("/");

  return (
    <>
      <View style={[styles.container, display]}>
        {/*Back BTN*/}
        <Pressable
          style={[
            styles.backButton,
            currentPath == "telaPesquisa"
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
          style={[
            styles.input,
            currentPath == "telaPesquisa"
              ? { width: 350, marginLeft: "auto" }
              : { width: 300 },
          ]}
          onFocus={() => {
            setVisibleNav(false);
            navigate();
          }}
        ></TextInput>

        {/*Nav BTN*/}
        <Pressable
          style={[
            styles.burguerButton,
            currentPath == "telaPesquisa"
              ? { display: "none" }
              : { display: "flex" },
            visibleNav ? { display: "none" } : { display: "flex" },
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
    marginHorizontal: 30,
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
