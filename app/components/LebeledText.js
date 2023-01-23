import { StyleSheet, View } from "react-native";
import React from "react";
import AppText from "./AppText";
import { useTheme } from "react-native-paper";

export default function LebeledText({ lebel, text }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <AppText
        variant="labelSmall"
        style={{ color: theme.colors.onSecondaryContainer }}
      >
        {lebel}
      </AppText>

      <AppText
        style={{ color: theme.colors.onPrimaryContainer, fontWeight: "bold" }}
        variant="titleLarge"
      >
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
