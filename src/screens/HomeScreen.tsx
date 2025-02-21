import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { WeatherDisplay } from "../components/weather/WeatherDisplay";
import { useWeather } from "../hooks/useWeather";
import { COLORS } from "../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "../types/navigation";

export const HomeScreen = ({}: NativeStackScreenProps<
  TabParamList,
  "Home"
>) => {
  const { loading, error, weatherData, forecastData, updateWeather } =
    useWeather();

  useEffect(() => {
    updateWeather();
  }, [updateWeather]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!weatherData || !forecastData) return null;

  return (
    <View style={styles.container}>
      <WeatherDisplay
        weather={weatherData}
        forecast={forecastData}
        onWeatherUpdate={updateWeather}
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
