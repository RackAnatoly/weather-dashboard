import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { WeatherData } from "../types/weather";

const FAVORITES_STORAGE_KEY = "@weather_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addToFavorites = useCallback(
    async (city: WeatherData) => {
      try {
        const updatedFavorites = [...favorites, city];
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(updatedFavorites)
        );
        setFavorites(updatedFavorites);
        return true;
      } catch (error) {
        console.error("Error adding to favorites:", error);
        return false;
      }
    },
    [favorites]
  );

  const removeFromFavorites = useCallback(
    async (cityName: string) => {
      try {
        const updatedFavorites = favorites.filter(
          (city) => city.city !== cityName
        );
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(updatedFavorites)
        );
        setFavorites(updatedFavorites);
        return true;
      } catch (error) {
        console.error("Error removing from favorites:", error);
        return false;
      }
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (cityName: string) => {
      return favorites.some((city) => city.city === cityName);
    },
    [favorites]
  );

  const refreshFavorites = useCallback(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refreshFavorites
  };
};
