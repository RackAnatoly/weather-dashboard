import type { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  TabNavigator: NavigatorScreenParams<TabParamList>;
};
