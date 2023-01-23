import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function AppText({
  children,
  variant = "titleMedium",
  style,
  ...otherProps
}) {
  return (
    <Text variant={variant} style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});
