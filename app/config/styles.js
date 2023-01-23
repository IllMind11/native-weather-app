import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";

import colors from "./colors";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const paperLightTheme = {
  ...MD3LightTheme,
  colors: colors.lightTheme.colors,
};

const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: colors.darkTheme.colors,
};

const navigationLightTheme = {
  ...NavigationDefaultTheme,
  colors: colors.lightTheme.colors,
};

const navigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: colors.darkTheme.colors,
};

const CombinedDefaultTheme = merge(paperLightTheme, navigationLightTheme);
const CombinedDarkTheme = merge(paperDarkTheme, navigationDarkTheme);

export { CombinedDarkTheme, CombinedDefaultTheme };
