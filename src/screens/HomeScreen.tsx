import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useWeather } from "../hooks/useWeather";
import { CurrentWeather } from "../components/weather/CurrentWeather";
import { ErrorView } from "../components/common/ErrorView";
import type { TabParamList } from "../types/navigation";
import { SIZES } from "../constants/sizes";

export const HomeScreen = ({}: NativeStackScreenProps<
  TabParamList,
  "Home"
>) => {
  const { loading, error, weatherData, fetchWeatherData } = useWeather();

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  if (error) {
    return <ErrorView message={error} onRetry={fetchWeatherData} />;
  }

  return (
    <View style={styles.container}>
      <CurrentWeather loading={loading} data={weatherData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.SPACING_M
  }
});
