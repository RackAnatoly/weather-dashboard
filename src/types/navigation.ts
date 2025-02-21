import type { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  Home:
    | {
        initialCoordinates?: {
          lat: number;
          lon: number;
        };
      }
    | undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  TabNavigator: NavigatorScreenParams<TabParamList>;
};
