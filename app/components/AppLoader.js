import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { ActivityIndicator } from "react-native-paper";

export default function AppLoader() {
  return (
    <View style={styles.animationContainer}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
