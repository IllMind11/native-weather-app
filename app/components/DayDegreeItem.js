import React, { useState, memo, useEffect } from "react";
import { ScrollView, StyleSheet, View, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import { List, useTheme, ActivityIndicator } from "react-native-paper";

import HourDegreeItem from "./HourDegreeItem";
import AppText from "./AppText";
import findIcon from "../utility/findIcon";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default memo(function DayDegreeItem({
  date,
  condition,
  minTemp,
  maxTemp,
  sunrise,
  sunset,
  style,
  hourlyWeatherData,
}) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredEvens, setFilteredEvens] = useState([]);

  const weekDay = new Date(date * 1000).getDay();
  const day = daysOfWeek[weekDay];

  function handlePress() {
    setIsExpanded((prev) => !prev);
  }

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        setFilteredEvens(hourlyWeatherData?.filter((item, i) => i % 2 === 0));
      }, 100);
    } else setFilteredEvens([]);
  }, [isExpanded]);

  return (
    <View style={style}>
      <View style={styles.dayDegreeItem}>
        <View style={styles.dayDegreeText}>
          <LottieView
            autoPlay
            style={{
              width: 50,
              height: 50,
              marginRight: 7,
            }}
            source={findIcon(condition, "09:00", sunset, sunrise)}
          />
          <AppText
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{ flex: 1, paddingRight: 10 }}
          >
            <AppText style={{ fontWeight: "bold" }}>{day}</AppText>: {condition}
          </AppText>
        </View>
        <AppText style={{ fontWeight: "bold" }}>
          {Math.round(maxTemp)}° / {Math.round(minTemp)}°
        </AppText>
      </View>

      {hourlyWeatherData && (
        <List.Accordion
          style={{
            backgroundColor: theme.colors.primaryContainer,
          }}
          descriptionStyle={{
            borderBottomEndRadius: theme.roundness,
          }}
          title="Hourly Weather"
          expanded={isExpanded}
          onPress={handlePress}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredEvens}
            renderItem={({ item }) => (
              <HourDegreeItem
                windDegree={item.wind_degree}
                temp={item.temp_c}
                condition={item.condition.text}
                windSpeed={item.wind_kph}
                date={item.time}
                sunset={sunset}
                sunrise={sunrise}
              />
            )}
            keyExtractor={(item) => item.time}
            initialNumToRender={3}
            ListEmptyComponent={() => (
              <View style={styles.loaderContainer}>
                <ActivityIndicator />
              </View>
            )}
          />
        </List.Accordion>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  dayDegreeItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 5,
  },

  dayDegreeText: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  loaderContainer: {
    width: 400,
    padding: 20,
  },
});
