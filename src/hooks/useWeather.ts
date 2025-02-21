import { useState, useCallback } from "react";
import { Platform } from "react-native";
import * as Location from "expo-location";
import { getCurrentWeather, getForecast } from "../services/weatherService";
import type { WeatherData, ForecastData } from "../types/weather";

type WeatherError = {
  location:
    | "Please enable location permissions to see weather in your area"
    | "Unable to get your location. Please check if location services are enabled";
  weather: "Unable to fetch weather data. Please try again";
  unknown: "An unexpected error occurred";
};

type ErrorType = WeatherError[keyof WeatherError];

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>();
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  const getLocation = async (): Promise<Location.LocationObject> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error(
        "Please enable location permissions to see weather in your area" as WeatherError["location"]
      );
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

    try {
      return await Location.getCurrentPositionAsync(locationOptions);
    } catch {
      throw new Error(
        "Unable to get your location. Please check if location services are enabled" as WeatherError["location"]
      );
    }
  };

  const updateWeather = useCallback(async (lat?: number, lon?: number) => {
    try {
      setLoading(true);
      setError(undefined);

      let coordinates;
      if (lat !== undefined && lon !== undefined) {
        coordinates = { coords: { latitude: lat, longitude: lon } };
      } else {
        coordinates = await getLocation();
      }

      const [weather, forecast] = await Promise.all([
        getCurrentWeather(
          coordinates.coords.latitude,
          coordinates.coords.longitude
        ),
        getForecast(coordinates.coords.latitude, coordinates.coords.longitude)
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message as ErrorType);
      } else {
        setError("An unexpected error occurred" as WeatherError["unknown"]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    weatherData,
    forecastData,
    updateWeather
  };
};
