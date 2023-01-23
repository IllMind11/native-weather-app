import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper";

import Icon from "./Icon";
import AppText from "./AppText";
import findIcon from "../utility/findIcon";

export default memo(function HourDegreeItem({
  date,
  condition,
  temp,
  windSpeed,
  windDegree,
  sunset,
  sunrise,
}) {
  const theme = useTheme();

  const time = date.split(" ")[1];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.primaryContainer,
          borderRadius: theme.roundness,
        },
      ]}
    >
      <AppText>{time}</AppText>

      <AppText
        variant="titleLarge"
        style={{
          color: theme.colors.onPrimaryContainer,
          fontWeight: "bold",
        }}
      >
        {Math.round(temp)}°
      </AppText>

      <LottieView
        style={{
          width: 45,
          height: 45,
        }}
        source={findIcon(condition, time, sunset, sunrise)}
      />

      <View style={styles.windContainer}>
        <Icon
          size={15}
          style={{ transform: [{ rotate: `${windDegree}deg` }] }}
          name="navigation"
        />
        <AppText variant="bodyMedium">{windSpeed}km/h</AppText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  windContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 7,
  },
});
