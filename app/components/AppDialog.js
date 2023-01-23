import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Provider,
  Text,
  RadioButton,
} from "react-native-paper";
import AppText from "./AppText";

export default function AppDialog({
  isDialogVisible,
  hideDialog,
  disMissDialog,
  title,
  value,
  setValue,
  options,
}) {
  return (
    <Portal>
      <Dialog visible={isDialogVisible} onDismiss={disMissDialog}>
        <Dialog.Title>{title}</Dialog.Title>

        <Dialog.Content>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            {options.map((option, i) => (
              <RadioButton.Item
                label={option.title}
                value={option.value}
                key={i}
              />
            ))}
          </RadioButton.Group>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  optionsItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});
