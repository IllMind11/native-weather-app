import { Platform, useColorScheme, Appearance } from "react-native";

export function useTheme() {
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === "dark";

  const colors = isDark
    ? {
        primary: "#5D76FD",
        secondary: "#4ecdc4",
        black: "#000",
        white: "#fff",
        medium: "#858795",
        light: "#F0F1F7",
        dark: "#31384D",
        danger: "#ff5252",
      }
    : {
        primary: "#5D76FD",
        secondary: "#4ecdc4",
        black: "#000",
        white: "#fff",
        medium: "#858795",
        light: "#F0F1F7",
        dark: "#31384D",
        danger: "#ff5252",
      };

  return colors;
}
