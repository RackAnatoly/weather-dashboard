import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WeatherData } from "../../types/weather";
import { COLORS } from "../../constants/colors";
import { SIZES } from "../../constants/sizes";

interface CurrentWeatherProps {
  loading: boolean;
  error?: string;
  data?: WeatherData;
  onRetry: () => void;
}

export const CurrentWeather = ({
  loading,
  error,
  data,
  onRetry
}: CurrentWeatherProps) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Ionicons
          name="reload"
          size={SIZES.ICON_LARGE}
          color={COLORS.primary}
          onPress={onRetry}
          style={styles.retryIcon}
        />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "sunny";
      case "clouds":
        return "cloudy";
      case "rain":
        return "rainy";
      case "snow":
        return "snow";
      default:
        return "partly-sunny";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{data.city}</Text>
      <Ionicons
        name={getWeatherIcon(data.condition)}
        size={SIZES.ICON_LARGE * 2}
        color={COLORS.primary}
        style={styles.icon}
      />
      <Text style={styles.temperature}>{data.temperature}°C</Text>
      <Text style={styles.condition}>{data.condition}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: SIZES.SPACING_L
  },
  city: {
    fontSize: SIZES.FONT_XXL,
    fontWeight: "bold",
    marginBottom: SIZES.SPACING_M
  },
  icon: {
    marginVertical: SIZES.SPACING_L
  },
  temperature: {
    fontSize: SIZES.FONT_XL,
    fontWeight: "bold",
    marginBottom: SIZES.SPACING_S
  },
  condition: {
    fontSize: SIZES.FONT_L,
    color: COLORS.text
  },
  error: {
    color: "red",
    fontSize: SIZES.FONT_M,
    marginBottom: SIZES.SPACING_M
  },
  retryIcon: {
    marginTop: SIZES.SPACING_M
  }
});
