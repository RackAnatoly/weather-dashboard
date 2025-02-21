import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { WeatherData } from "../types/weather";

const FAVORITES_STORAGE_KEY = "@weather_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToFavorites = async (weather: WeatherData) => {
    try {
      const newFavorites = [...favorites, weather];
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
      setFavorites(newFavorites);
      return true;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      return false;
    }
  };

  const removeFromFavorites = async (cityName: string) => {
    try {
      const newFavorites = favorites.filter((fav) => fav.city !== cityName);
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
      setFavorites(newFavorites);
      return true;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      return false;
    }
  };

  const isFavorite = (cityName: string) => {
    return favorites.some((fav) => fav.city === cityName);
  };

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};
