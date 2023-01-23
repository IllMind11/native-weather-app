import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Searchbar, List, useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";

import fetchWithHeaders from "../utility/fetchWithHeaders";
import routes from "../navigation/routes";

export default function AddCityPage({ navigation }) {
  const theme = useTheme();

  const [search, setSearch] = useState("");

  const searchQuery = useQuery({
    queryKey: ["search"],
    queryFn: () => fetchWithHeaders(`${search}`, undefined, "search"),
    enabled: false,
  });

  function handleSubmit() {
    searchQuery.refetch();
  }

  function handlePress(latitude, longitude) {
    navigation.navigate(routes.MAIN, {
      coords: {
        latitude: latitude,
        longitude: longitude,
      },
    });

    searchQuery.remove();
  }

  return (
    <ScrollView>
      <Searchbar
        style={{ marginVertical: 15 }}
        elevation={1}
        placeholder="Search for a city..."
        value={search}
        onChangeText={(text) => setSearch(text)}
        onEndEditing={handleSubmit}
        loading={searchQuery.isFetching}
      />

      <List.Section>
        {searchQuery.data && <List.Subheader>Matches</List.Subheader>}

        {searchQuery.data && searchQuery.data.length !== 0
          ? searchQuery.data.map((data, i) => (
              <List.Item
                title={data.name}
                description={data.country + ` (${data.region})`}
                key={i}
                onPress={() => handlePress(data.lat, data.lon)}
              />
            ))
          : searchQuery.data?.length === 0 && (
              <List.Item
                style={{ color: theme.colors.error }}
                title="Nothing Found ¯\_(ツ)_/¯"
                description="Try Again"
              />
            )}
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
