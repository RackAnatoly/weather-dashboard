import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { WeatherDisplay } from "../components/weather/WeatherDisplay";
import { useWeather } from "../hooks/useWeather";
import { COLORS } from "../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "../types/navigation";
import { useFavorites } from "../hooks/useFavorites";
import { ErrorView } from "../components/common/ErrorView";

export const HomeScreen = ({
  route
}: NativeStackScreenProps<TabParamList, "Home">) => {
  const { initialCoordinates } = route.params || {};
  const { loading, error, weatherData, forecastData, updateWeather } =
    useWeather();
  const { isFavorite, addToFavorites, removeFromFavorites, refreshFavorites } =
    useFavorites();

  useEffect(() => {
    if (initialCoordinates) {
      updateWeather(initialCoordinates.lat, initialCoordinates.lon);
    } else if (!weatherData) {
      updateWeather();
    }
  }, [initialCoordinates]);

  useEffect(() => {
    refreshFavorites();
  }, [isFavorite]);

  const handleToggleFavorite = async () => {
    if (!weatherData) return;

    if (isFavorite(weatherData.city)) {
      await removeFromFavorites(weatherData.city);
    } else {
      await addToFavorites(weatherData);
    }
  };

  const handleRetry = () => {
    const coordinates = route.params?.initialCoordinates;
    if (coordinates) {
      updateWeather(coordinates.lat, coordinates.lon);
    } else {
      updateWeather();
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          testID="weather-loading"
        />
      </View>
    );
  }

  if (error) {
    return <ErrorView message={error} onRetry={handleRetry} />;
  }

  if (!weatherData || !forecastData) return null;

  return (
    <View style={styles.container}>
      <WeatherDisplay
        weather={weatherData}
        forecast={forecastData}
        onWeatherUpdate={updateWeather}
        isFavorite={isFavorite(weatherData.city)}
        onToggleFavorite={handleToggleFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: 16
  }
});
