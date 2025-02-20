// src/screens/HomeScreen.tsx
import { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import * as Location from "expo-location";
import { CurrentWeather } from "../components/weather/CurrentWeather";
import { getCurrentWeather } from "../services/weatherService";
import type { WeatherData } from "../types/weather";
import type { TabParamList } from "../types/navigation";
import { SIZES } from "../constants/sizes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const HomeScreen = ({}: NativeStackScreenProps<
  TabParamList,
  "Home"
>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(undefined);

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      // Get current location with platform-specific options
      const locationOptions = Platform.select({
        android: {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000,
          distanceInterval: 0
        },
        ios: {
          accuracy: Location.Accuracy.High
        },
        default: {
          accuracy: Location.Accuracy.Balanced
        }
      });

      const location = await Location.getCurrentPositionAsync(locationOptions);

      console.log("Location retrieved:", {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy
      });

      // Fetch weather data
      const weather = await getCurrentWeather(
        location.coords.latitude,
        location.coords.longitude
      );

      setWeatherData(weather);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Could not fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      <CurrentWeather
        loading={loading}
        error={error}
        data={weatherData}
        onRetry={fetchWeatherData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.SPACING_M
  }
});
