import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Slot, Stack } from "expo-router";

import Header from "./includes/header";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "none",
  },
});
