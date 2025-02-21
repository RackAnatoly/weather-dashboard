import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { WeatherForecast } from "./WeatherForecast";
import {
  CitySearchResult,
  ForecastData,
  WeatherData
} from "../../types/weather";
import { COLORS, WEATHER_GRADIENTS } from "../../constants/colors";
import { AutocompleteSearch } from "../AutocompleteSearch";
import { SIZES } from "../../constants/sizes";

type WeatherDisplayProps = {
  weather: WeatherData;
  forecast: ForecastData[];
  onWeatherUpdate: (lat: number, lon: number) => Promise<void>;
  isFavorite: boolean;
  onToggleFavorite: () => void;
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
  forecast,
  onWeatherUpdate,
  isFavorite,
  onToggleFavorite
}: WeatherDisplayProps) => {
  const handleCitySelect = async (city: CitySearchResult) => {
    try {
      await onWeatherUpdate(city.lat, city.lon);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data for selected city.");
    }
  };

  const gradientColors =
    WEATHER_GRADIENTS[weather.condition as keyof typeof WEATHER_GRADIENTS] ||
    WEATHER_GRADIENTS.default;

  return (
    <LinearGradient colors={gradientColors} style={styles.flex}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <Pressable style={styles.flex} onPress={Keyboard.dismiss}>
          <View style={styles.flex}>
            <View style={styles.searchContainer}>
              <AutocompleteSearch onSelectCity={handleCitySelect} />
            </View>

            <View style={styles.weatherInfo}>
              <View style={styles.cityContainer}>
                <Text style={styles.city}>{weather.city}</Text>
                <Pressable
                  onPress={onToggleFavorite}
                  style={({ pressed }) => [
                    styles.favoriteButton,
                    pressed && styles.favoriteButtonPressed
                  ]}
                >
                  <Ionicons
                    name={isFavorite ? "star" : "star-outline"}
                    size={SIZES.ICON_MEDIUM}
                    color={COLORS.white}
                  />
                </Pressable>
              </View>

              <Ionicons
                name={getWeatherIcon(weather.condition)}
                size={SIZES.ICON_LARGE * 2}
                color={COLORS.white}
                style={styles.icon}
              />
              <Text style={styles.temperature}>{weather.temperature}°C</Text>
              <Text style={styles.condition}>{weather.condition}</Text>
            </View>

            <View style={styles.forecastContainer}>
              <WeatherForecast forecast={forecast} />
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  searchContainer: {
    zIndex: 1,
    marginVertical: SIZES.SPACING_XXL
  },
  weatherInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    paddingBottom: Platform.OS === "ios" ? 0 : SIZES.SPACING_XL
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SIZES.SPACING_M
  },
  city: {
    fontSize: SIZES.FONT_XXL,
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center"
  },
  favoriteButton: {
    marginLeft: SIZES.SPACING_M,
    padding: SIZES.SPACING_M,
    borderRadius: SIZES.SPACING_S
  },
  favoriteButtonPressed: {
    opacity: 0.8
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
  },
  forecastContainer: {
    marginBottom: SIZES.SPACING_L
  }
});
