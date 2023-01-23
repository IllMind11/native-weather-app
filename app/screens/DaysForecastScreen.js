import { StyleSheet, ScrollView, View, InteractionManager } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";

import AppLoader from "../components/AppLoader";
import DayDegreeItem from "../components/DayDegreeItem";

export default function DaysForecastScreen({ route }) {
  const { data, sunset, sunrise } = route.params;
  const theme = useTheme();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 100);
  }, []);

  if (!isReady) return <AppLoader />;

  return (
    <ScrollView style={styles.container}>
      {data.forecast.forecastday.slice(1).map((f, i) => (
        <DayDegreeItem
          key={i}
          date={f.date_epoch}
          condition={f.day.condition.text}
          maxTemp={f.day.maxtemp_c}
          minTemp={f.day.mintemp_c}
          sunset={sunset}
          sunrise={sunrise}
          hourlyWeatherData={f.hour}
          style={{
            backgroundColor: theme.colors.primaryContainer,
            borderRadius: theme.roundness,
            marginVertical: 12,
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },

  dayDegreeContainer: {
    width: "100%",
    display: "flex",
  },
});
