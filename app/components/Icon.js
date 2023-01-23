import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { IconButton, useTheme } from "react-native-paper";

export default function Icon({
  name,
  size = 25,
  mode = "",
  iconColor = "",
  backgroundColor = "",
  onPress,
  style,
}) {
  const theme = useTheme();
  // console.log(theme.colors.primary);
  return (
    <IconButton
      mode={mode}
      icon={name}
      // iconColor={theme.colors.onBackground}
      size={size}
      onPress={onPress}
      // containerColor={theme.colors.primaryContainer}
      style={[{ padding: 0, margin: 0 }, style]}
    />
  );
}
