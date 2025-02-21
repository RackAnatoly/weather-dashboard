import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useWeather } from "../hooks/useWeather";
import { WeatherDisplay } from "../components/WeatherDisplay";
import { COLORS } from "../constants/colors";
import { SIZES } from "../constants/sizes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "../types/navigation";

export const HomeScreen = ({}: NativeStackScreenProps<
  TabParamList,
  "Home"
>) => {
  const { loading, error, weatherData, fetchWeatherData } = useWeather();

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

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

  return (
    <View style={styles.container}>
      {weatherData && <WeatherDisplay weather={weatherData} />}
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
    padding: SIZES.SPACING_M
  }
});
