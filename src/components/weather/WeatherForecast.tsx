import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../constants/sizes";
import { COLORS } from "../../constants/colors";
import { ForecastData } from "../../types/weather";

type WeatherForecastProps = {
  forecast: ForecastData[];
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

const ForecastItem = ({ item }: { item: ForecastData }) => {
  const date = new Date(item.date);
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const dayDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short"
  });

  return (
    <View style={styles.forecastItem}>
      <Text style={styles.dayName}>{dayName}</Text>
      <Text style={styles.dayDate}>{dayDate}</Text>
      <Ionicons
        name={getWeatherIcon(item.condition)}
        size={SIZES.ICON_MEDIUM}
        color={COLORS.white}
        style={styles.icon}
      />
      <View style={styles.temperatures}>
        <Text style={styles.maxTemp}>{Math.round(item.maxTemp)}°</Text>
        <Text style={styles.minTemp}>{Math.round(item.minTemp)}°</Text>
      </View>
    </View>
  );
};

export const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <FlatList
        data={forecast}
        renderItem={({ item }) => <ForecastItem item={item} />}
        keyExtractor={(item) => item.date}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.SPACING_L,
    paddingHorizontal: SIZES.SPACING_M,
    alignItems: "center"
  },
  title: {
    fontSize: SIZES.FONT_L,
    color: COLORS.white,
    marginBottom: SIZES.SPACING_M,
    fontWeight: "600"
  },
  listContent: {
    paddingVertical: SIZES.SPACING_S
  },
  forecastItem: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SIZES.SPACING_M,
    marginRight: SIZES.SPACING_M,
    minWidth: 80
  },
  dayName: {
    color: COLORS.white,
    fontSize: SIZES.FONT_S,
    fontWeight: "600"
  },
  dayDate: {
    color: COLORS.white,
    fontSize: SIZES.FONT_XS,
    opacity: 0.8,
    marginTop: SIZES.SPACING_XS
  },
  icon: {
    marginVertical: SIZES.SPACING_M
  },
  temperatures: {
    alignItems: "center"
  },
  maxTemp: {
    color: COLORS.white,
    fontSize: SIZES.FONT_M,
    fontWeight: "600"
  },
  minTemp: {
    color: COLORS.white,
    fontSize: SIZES.FONT_S,
    opacity: 0.8,
    marginTop: SIZES.SPACING_XS
  }
});
