import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";

import { usePreferencesContext } from "../context/PreferencesContext";
import AppDialog from "../components/AppDialog";

const themeSettings = [
  {
    title: "Appearance",
  },
  {
    title: "Dark",
    value: "dark",
  },
  {
    title: "Light",
    value: "light",
  },
  {
    title: "Follow System",
    value: "system",
  },
];

export default function SettingsScreen() {
  const { themePreference, toggleTheme } = usePreferencesContext();

  const initialSettingValue = themePreference.system
    ? "system"
    : themePreference.mode;

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [settingValue, setSettingValue] = useState(initialSettingValue);

  function showDialog() {
    setIsDialogVisible(true);
  }

  function hideDialog() {
    setIsDialogVisible(false);

    toggleTheme(settingValue);
  }

  function disMissDialog() {
    setIsDialogVisible(false);
  }

  return (
    <View>
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          titleStyle={styles.title}
          style={styles.listItem}
          title="Theme"
          description={
            themePreference.system ? "Follow System" : themePreference.mode
          }
          left={() => <List.Icon icon="theme-light-dark" />}
          onPress={showDialog}
        />
      </List.Section>

      <AppDialog
        isDialogVisible={isDialogVisible}
        hideDialog={hideDialog}
        disMissDialog={disMissDialog}
        title={themeSettings[0].title}
        value={settingValue}
        setValue={setSettingValue}
        options={themeSettings.slice(1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 20,
  },
});
