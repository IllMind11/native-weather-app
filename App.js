import { useEffect, useState } from "react";
import { useColorScheme, Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";

import AppNavigation from "./app/navigation/AppNavigation";
import { CombinedDefaultTheme, CombinedDarkTheme } from "./app/config/styles";
import { PreferencesContextProvider } from "./app/context/PreferencesContext";
import cache from "./app/utility/cache";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const systemTheme = useColorScheme();

  const [themePreference, setThemePreference] = useState({
    mode: systemTheme,
    system: true,
  });

  let theme =
    themePreference.mode === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  async function toggleTheme(value) {
    let newTheme;

    if (value === "system") {
      newTheme = { mode: systemTheme, system: true };
    } else {
      newTheme = { mode: value, system: false };
    }

    setThemePreference(newTheme);
    await cache.store("theme", newTheme);
  }

  async function getThemeFromCache() {
    try {
      const cachedTheme = await cache.get("theme");

      if (cachedTheme) {
        setThemePreference(cachedTheme);
      }
    } catch (error) {
      console.error("Could not get the theme from the cache", error);
    } finally {
      SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    getThemeFromCache();
  }, []);

  if (themePreference.system) {
    Appearance.addChangeListener(({ colorScheme }) => {
      setThemePreference({ mode: colorScheme, system: true });
    });
  }

  return (
    <PreferencesContextProvider value={{ themePreference, toggleTheme }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <QueryClientProvider client={queryClient}>
            <AppNavigation />
          </QueryClientProvider>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContextProvider>
  );
}
