import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useTheme, Appbar } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import LottieView from "lottie-react-native";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import { useLocation } from "../hooks/useLocation";
import AppLoader from "../components/AppLoader";
import fetchWithHeaders from "../utility/fetchWithHeaders";
import DayDegreeItem from "../components/DayDegreeItem";
import findIcon from "../utility/findIcon";
import HourDegreeItem from "../components/HourDegreeItem";
import LebeledText from "../components/LebeledText";
import cache from "../utility/cache";

export default function MainScreen({ navigation, route }) {
  const params = route.params;
  const theme = useTheme();

  const { location, errorMsg } = useLocation();

  let coords = {
    latitude: location?.coords?.latitude || "",
    longitude: location?.coords?.longitude || "",
  };

  const weatherQuery = useQuery({
    queryKey: ["weather", params?.coords],
    queryFn: () => fetchWithHeaders(`q=${coords.latitude},${coords.longitude}`),
    staleTime: 1000 * 60 * 30,
    enabled: !!location || !!params?.coords,
  });

  if (params !== undefined) {
    (coords.latitude = params.coords.latitude),
      (coords.longitude = params.coords.longitude);

    saveLocation();
  }

  async function saveLocation() {
    try {
      await cache.store("location", { coords });
    } catch (error) {
      console.error("Couldn not save the location in cache", error);
    }
  }

  const sunrise = weatherQuery.data?.forecast.forecastday[0].astro.sunrise;
  const sunset = weatherQuery.data?.forecast.forecastday[0].astro.sunset;

  const hour = new Date().getHours();

  const mainWeatherIcon = findIcon(
    weatherQuery.data?.current.condition.text,
    undefined,
    sunset,
    sunrise
  );

  if (weatherQuery.isFetching) return <AppLoader />;
  if (!weatherQuery.data)
    return (
      <Screen>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <Appbar.Header mode="center-aligned" style={{ width: "100%" }}>
            <Appbar.Action
              icon="plus"
              iconColor={theme.colors.primary}
              size={28}
              onPress={() => navigation.navigate(routes.ADDCITY)}
            />
            <Appbar.Content
              title={weatherQuery.data?.location.name || "City Name"}
            />
            <Appbar.Action
              icon="cog-outline"
              iconColor={theme.colors.primary}
              size={28}
              onPress={() => navigation.navigate(routes.SETTINGS)}
            />
          </Appbar.Header>

          <View
            style={[
              styles.addIconContainer,
              { height: "100%", margin: 0, padding: 0 },
            ]}
            onPress={() => navigation.navigate(routes.ADDCITY)}
          >
            <Pressable onPress={() => navigation.navigate(routes.ADDCITY)}>
              <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                }}
                source={require("../assets/animated/add-animation.json")}
              />
            </Pressable>

            <AppText>Add a city</AppText>
          </View>
        </ScrollView>
      </Screen>
    );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <Appbar.Header mode="center-aligned" style={{ width: "100%" }}>
          <Appbar.Action
            icon="plus"
            iconColor={theme.colors.primary}
            size={28}
            onPress={() => navigation.navigate(routes.ADDCITY)}
          />
          <Appbar.Content title={weatherQuery.data.location.name || "?"} />
          <Appbar.Action
            icon="cog-outline"
            iconColor={theme.colors.primary}
            size={28}
            onPress={() => navigation.navigate(routes.SETTINGS)}
          />
        </Appbar.Header>

        {/* --------------------------------------------------------------- */}

        <View style={styles.mainDegreeContainer}>
          <LottieView
            autoPlay
            style={{
              width: 180,
              height: 180,
            }}
            source={mainWeatherIcon}
          />

          <AppText style={{ fontWeight: "bold" }} variant="displayLarge">
            {Math.round(weatherQuery.data.current.temp_c)}°ᶜ
          </AppText>
          <AppText style={{ textAlign: "center" }}>
            {weatherQuery.data.current.condition.text}
          </AppText>
        </View>

        {/* --------------------------------------------------------------- */}

        <View style={styles.dayDegreeContainer}>
          {weatherQuery.data.forecast.forecastday.slice(0, 3).map((f, i) => (
            <DayDegreeItem
              key={i}
              date={f.date_epoch}
              condition={f.day.condition.text}
              maxTemp={f.day.maxtemp_c}
              minTemp={f.day.mintemp_c}
              sunset={sunset}
              sunrise={sunrise}
            />
          ))}
        </View>

        <AppButton
          labelStyle={{ padding: 5 }}
          style={styles.button}
          mode="contained-tonal"
          onPress={() =>
            navigation.navigate(routes.DAYSFORECAST, {
              data: weatherQuery.data,
              sunset: sunset,
              sunrise: sunrise,
            })
          }
        >
          Get 5 day forecast
        </AppButton>

        {/* --------------------------------------------------------------- */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          style={styles.hourDegreeContainer}
          data={weatherQuery.data.forecast.forecastday[0].hour
            .slice(hour)
            .concat(
              weatherQuery.data.forecast.forecastday[1].hour.slice(0, hour)
            )}
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
        />

        {/* --------------------------------------------------------------- */}

        <View
          style={[
            styles.infoContainer,
            {
              backgroundColor: theme.colors.primaryContainer,
              borderRadius: theme.roundness,
            },
          ]}
        >
          <View style={styles.infoItemContainer}>
            <LebeledText
              lebel="Feels like"
              text={`${weatherQuery.data.current.feelslike_c}°C`}
            />

            <LebeledText
              lebel="Humidity"
              text={`${weatherQuery.data.current.humidity}%`}
            />

            <LebeledText
              lebel="Rain possibility"
              text={`${Math.round(weatherQuery.data.current.precip_in)}%`}
            />
          </View>

          <View style={styles.infoItemContainer}>
            <LebeledText
              lebel="Pressure"
              text={`${weatherQuery.data.current.pressure_mb}`}
            />

            <LebeledText
              lebel="Wind Speed"
              text={`${weatherQuery.data.current.wind_kph}km/h`}
            />

            <LebeledText lebel="UV index" text={weatherQuery.data.current.uv} />
          </View>
        </View>

        {/* --------------------------------------------------------------- */}

        <View
          style={[
            styles.infoContainer,
            {
              backgroundColor: theme.colors.primaryContainer,
              borderRadius: theme.roundness,
            },
          ]}
        >
          <View style={styles.infoItemContainer}>
            <LebeledText
              lebel="Air quality index"
              text={`${weatherQuery.data.current.air_quality["us-epa-index"]}`}
            />

            <LebeledText lebel="Sunset" text={sunset} />

            <LebeledText lebel="Sunrise" text={sunrise} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  addIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 140,
  },

  screenContainer: {
    display: "flex",
    alignItems: "center",
  },

  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  mainDegreeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },

  dayDegreeContainer: {
    width: "100%",
    display: "flex",
  },

  button: {
    marginTop: 20,
    width: "90%",
  },

  hourDegreeContainer: {
    marginVertical: 35,
  },

  infoContainer: {
    width: "97%",
    padding: 10,
    marginBottom: 15,
  },

  infoItemContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
