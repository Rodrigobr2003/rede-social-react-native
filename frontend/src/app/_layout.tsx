import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { UserProvider } from "./includes/UserProvider";

import { Stack, useSegments } from "expo-router";

import Header from "./includes/header";

export default function Layout() {
  const segments = useSegments();
  const [headerVisible, setHeaderStyle] = useState(false);

  useEffect(() => {
    const currentPath = segments.join("/");

    if (currentPath !== "") {
      setHeaderStyle(true);
    } else {
      setHeaderStyle(false);
    }
  }, [segments]);

  return (
    <>
      <Header
        display={headerVisible ? styles.visibleHeader : styles.hiddenHeader}
      ></Header>

      <UserProvider>
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
      </UserProvider>
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
