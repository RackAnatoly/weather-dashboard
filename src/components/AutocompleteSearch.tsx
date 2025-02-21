import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  FlatList
} from "react-native";
import { SearchInput } from "./SearchInput";
import { searchCities } from "../services/weatherService";
import { COLORS } from "../constants/colors";
import { SIZES } from "../constants/sizes";
import { CitySearchResult } from "../types/weather";

type AutocompleteSearchProps = {
  onSelectCity: (city: CitySearchResult) => void;
};

export const AutocompleteSearch = ({
  onSelectCity
}: AutocompleteSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true);
        const cities = await searchCities(query);
        setResults(cities);
        setShowDropdown(true);
        setLoading(false);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleSelectCity = (city: CitySearchResult) => {
    onSelectCity(city);
    setQuery("");
    setShowDropdown(false);
  };

  const renderItem = ({ item: city }: { item: CitySearchResult }) => (
    <Pressable style={styles.resultItem} onPress={() => handleSelectCity(city)}>
      <Text style={styles.cityName}>{city.name}</Text>
      <Text style={styles.countryName}>{city.country}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        onSubmit={() => {}}
        placeholder="Search for a city..."
      />
      {showDropdown && (
        <View style={styles.dropdown}>
          {loading ? (
            <ActivityIndicator style={styles.loader} color={COLORS.primary} />
          ) : results.length > 0 ? (
            <FlatList
              data={results}
              renderItem={renderItem}
              keyExtractor={(city, index) =>
                `${city.name}-${city.country}-${index}`
              }
              style={styles.list}
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled"
            />
          ) : query.length >= 3 ? (
            <Text style={styles.noResults}>No cities found</Text>
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: SIZES.SPACING_M,
    right: SIZES.SPACING_M,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 200
  },
  list: {
    maxHeight: 200
  },
  resultItem: {
    padding: SIZES.SPACING_M,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white
  },
  cityName: {
    fontSize: SIZES.FONT_M,
    color: COLORS.text
  },
  countryName: {
    fontSize: SIZES.FONT_S,
    color: COLORS.inactive,
    marginTop: SIZES.SPACING_XS
  },
  noResults: {
    padding: SIZES.SPACING_M,
    textAlign: "center",
    color: COLORS.inactive
  },
  loader: {
    padding: SIZES.SPACING_M
  }
});
