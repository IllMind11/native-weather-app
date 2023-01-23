import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function AppButton({
  children,
  style,
  labelStyle,
  mode,
  onPress,
}) {
  return (
    <Button
      mode={mode}
      labelStyle={labelStyle}
      style={[styles.button, style]}
      onPress={onPress}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    // width: "100%",
  },
});
