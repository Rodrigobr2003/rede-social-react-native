import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { Stack, useSegments } from "expo-router";

import Header from "./includes/header";

export default function Layout() {
  const segments = useSegments();
  const [headerVisible, setHeaderStyle] = useState(false);
  const [user, setUSer] = useState(null);

  useEffect(() => {
    const currentPath = segments.join("/");

    if (currentPath !== "") {
      setHeaderStyle(true);

      const fetchUserData = async () => {
        try {
          const response = await fetch("http://10.0.2.2:3008/getUserData", {
            method: "GET",
            mode: "cors",
            headers: {
              "content-type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Erro na resposta do servidor: ${response.status}`);
          }

          const data = await response.json();
          setUSer(data);
        } catch (error) {
          console.log("Erro ao buscar dados no fetch: ", error);
        }
      };

      fetchUserData();
    } else {
      setHeaderStyle(false);
    }
  }, [segments]);

  return (
    <>
      <Header
        display={headerVisible ? styles.visibleHeader : styles.hiddenHeader}
      ></Header>

      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="telaPesquisa"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="amigos"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="notificacoes"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="perfil"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="perfilProcurado"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="chatProfile"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  hiddenHeader: {
    display: "none",
  },
  visibleHeader: {
    display: "flex",
  },
});
