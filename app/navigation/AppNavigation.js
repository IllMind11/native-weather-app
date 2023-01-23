import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

import routes from "./routes";
import MainScreen from "../screens/MainScreen";
import AddCityPage from "../screens/AddCityPage";
import SettingsScreen from "../screens/SettingsScreen";
import DaysForecastScreen from "../screens/DaysForecastScreen";
import { usePreferencesContext } from "../context/PreferencesContext";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const theme = useTheme();
  const { themePreference } = usePreferencesContext();

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarStyle: themePreference.mode === "dark" ? "light" : "dark",
        statusBarColor: theme.colors.background,
        animation: "fade_from_bottom",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.colors.elevation.level2,
        },
        headerTintColor: theme.colors.onBackground,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name={routes.MAIN}
        component={MainScreen}
      />

      <Stack.Screen
        options={{
          headerTitle: "Add New City",
        }}
        name={routes.ADDCITY}
        component={AddCityPage}
      />

      <Stack.Screen
        options={{
          headerTitle: "Settings",
        }}
        name={routes.SETTINGS}
        component={SettingsScreen}
      />

      <Stack.Screen
        options={{
          headerTitle: "Forecast for 5 days",
        }}
        name={routes.DAYSFORECAST}
        component={DaysForecastScreen}
      />
    </Stack.Navigator>
  );
}
