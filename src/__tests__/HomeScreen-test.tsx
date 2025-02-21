import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { HomeScreen } from "../screens/HomeScreen";

jest.mock("@expo/vector-icons/Ionicons", () => "MockedIonicons");

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 40.7128,
        longitude: -74.006
      }
    })
  )
}));

jest.mock("../hooks/useWeather", () => ({
  useWeather: () => ({
    loading: true,
    error: null,
    weatherData: null,
    forecastData: null,
    updateWeather: jest.fn()
  })
}));

jest.mock("../hooks/useFavorites", () => ({
  useFavorites: () => ({
    loading: false,
    favorites: [],
    isFavorite: jest.fn(() => false),
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    refreshFavorites: jest.fn()
  })
}));

const mockNavigation = {
  setOptions: jest.fn(),
  navigate: jest.fn(),
  addListener: jest.fn()
};

const mockRoute = {
  params: {}
};

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state correctly", async () => {
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} route={mockRoute as any} />
    );

    await waitFor(() => {
      expect(getByTestId("weather-loading")).toBeTruthy();
    });
  });
});
