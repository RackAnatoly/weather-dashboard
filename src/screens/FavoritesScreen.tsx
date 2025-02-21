import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../hooks/useFavorites";
import { COLORS } from "../constants/colors";
import { SIZES } from "../constants/sizes";
import type { WeatherData } from "../types/weather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "../types/navigation";
import { useFocusEffect } from "@react-navigation/native";

type FavoriteItemProps = {
  item: WeatherData;
  onPress: () => void;
  onRemove: () => void;
};

const FavoriteItem = ({ item, onPress, onRemove }: FavoriteItemProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.itemContainer,
      pressed && styles.itemPressed
    ]}
    onPress={onPress}
    android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
  >
    <View style={styles.itemContent}>
      <View>
        <Text style={styles.cityName}>{item.city}</Text>
        <Text style={styles.temperature}>{item.temperature}°C</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.condition}>{item.condition}</Text>
        <Pressable
          onPress={onRemove}
          style={({ pressed }) => [
            styles.removeButton,
            pressed && styles.removeButtonPressed
          ]}
          android_ripple={{ color: "rgba(0, 0, 0, 0.1)", radius: 20 }}
        >
          <Ionicons
            name="trash-outline"
            size={SIZES.ICON_SMALL}
            color={COLORS.inactive}
          />
        </Pressable>
      </View>
    </View>
  </Pressable>
);

export const FavoritesScreen = ({
  navigation
}: NativeStackScreenProps<TabParamList, "Favorites">) => {
  const { favorites, loading, removeFromFavorites, refreshFavorites } =
    useFavorites();

  const handleCityPress = (city: WeatherData) => {
    navigation.navigate("Home", {
      initialCoordinates: {
        lat: city.coordinates.lat,
        lon: city.coordinates.lon
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      refreshFavorites();
    }, [refreshFavorites])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Ionicons
          name="star-outline"
          size={SIZES.ICON_LARGE * 2}
          color={COLORS.inactive}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>No favorite cities yet</Text>
        <Text style={styles.emptySubtext}>
          Add cities from the weather screen
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <FavoriteItem
            item={item}
            onPress={() => handleCityPress(item)}
            onRemove={() => removeFromFavorites(item.city)}
          />
        )}
        keyExtractor={(item) => item.city}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: SIZES.SPACING_XXXL
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listContent: {
    padding: SIZES.SPACING_M
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: SIZES.SPACING_M,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  itemPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }]
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.SPACING_M
  },
  rightContent: {
    alignItems: "flex-end"
  },
  cityName: {
    fontSize: SIZES.FONT_L,
    color: COLORS.text,
    fontWeight: "600"
  },
  temperature: {
    fontSize: SIZES.FONT_M,
    color: COLORS.text,
    marginTop: SIZES.SPACING_XS
  },
  condition: {
    fontSize: SIZES.FONT_S,
    color: COLORS.inactive,
    marginBottom: SIZES.SPACING_S
  },
  removeButton: {
    padding: SIZES.SPACING_S,
    borderRadius: SIZES.SPACING_S
  },
  removeButtonPressed: {
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  },
  emptyIcon: {
    marginBottom: SIZES.SPACING_L
  },
  emptyText: {
    fontSize: SIZES.FONT_L,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: SIZES.SPACING_S
  },
  emptySubtext: {
    fontSize: SIZES.FONT_M,
    color: COLORS.inactive
  }
});
