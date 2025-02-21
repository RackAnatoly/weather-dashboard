import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AutocompleteSearch } from "./AutocompleteSearch";
import { getCurrentWeather } from "../services/weatherService";
import { COLORS, WEATHER_GRADIENTS } from "../constants/colors";
import { SIZES } from "../constants/sizes";
import type { CitySearchResult, WeatherData } from "../types/weather";

type WeatherDisplayProps = {
  weather: WeatherData;
  onWeatherUpdate?: (weather: WeatherData) => void;
};

const getWeatherIcon = (condition: string): keyof typeof Ionicons.glyphMap => {
  switch (condition) {
    case "Clear":
      return "sunny";
    case "Clouds":
      return "cloudy";
    case "Rain":
      return "rainy";
    case "Snow":
      return "snow";
    case "Thunderstorm":
      return "thunderstorm";
    default:
      return "partly-sunny";
  }
};

export const WeatherDisplay = ({
  weather,
  onWeatherUpdate
}: WeatherDisplayProps) => {
  const handleCitySelect = async (city: CitySearchResult) => {
    try {
      const weatherData = await getCurrentWeather(city.lat, city.lon);
      onWeatherUpdate?.(weatherData);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data for selected city.");
    }
  };

  const gradientColors =
    WEATHER_GRADIENTS[weather.condition as keyof typeof WEATHER_GRADIENTS] ||
    WEATHER_GRADIENTS.default;

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <View style={styles.searchContainer}>
        <AutocompleteSearch onSelectCity={handleCitySelect} />
      </View>
      <View style={styles.weatherInfo}>
        <Text style={styles.city}>{weather.city}</Text>
        <Ionicons
          name={getWeatherIcon(weather.condition)}
          size={SIZES.ICON_LARGE * 2}
          color={COLORS.white}
          style={styles.icon}
        />
        <Text style={styles.temperature}>{weather.temperature}°C</Text>
        <Text style={styles.condition}>{weather.condition}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    zIndex: 1,
    marginVertical: SIZES.SPACING_XL
  },
  weatherInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0
  },
  city: {
    fontSize: SIZES.FONT_XXL,
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: SIZES.SPACING_M
  },
  icon: {
    marginVertical: SIZES.SPACING_M
  },
  temperature: {
    fontSize: SIZES.FONT_XL * 2,
    color: COLORS.white,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: SIZES.SPACING_M
  },
  condition: {
    fontSize: SIZES.FONT_L,
    color: COLORS.white,
    textTransform: "uppercase",
    textAlign: "center"
  }
});
