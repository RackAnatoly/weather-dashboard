import { useState, useCallback } from "react";
import { Platform } from "react-native";
import * as Location from "expo-location";
import { getCurrentWeather } from "../services/weatherService";
import type { WeatherData } from "../types/weather";

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const getLocation = async (): Promise<Location.LocationObject> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }

    const locationOptions: Location.LocationOptions = Platform.select({
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

    return Location.getCurrentPositionAsync(locationOptions);
  };

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);

      const location = await getLocation();
      const weather = await getCurrentWeather(
        location.coords.latitude,
        location.coords.longitude
      );

      setWeatherData(weather);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    weatherData,
    fetchWeatherData
  };
};
