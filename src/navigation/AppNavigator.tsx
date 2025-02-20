import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { COLORS } from "../constants/colors";
import { SIZES } from "../constants/sizes";
import { RootStackParamList, TabParamList } from "../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: SIZES.TAB_BAR_HEIGHT,
          paddingBottom: SIZES.TAB_BAR_PADDING
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Weather",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "partly-sunny" : "partly-sunny-outline"}
              size={SIZES.ICON_MEDIUM}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              size={SIZES.ICON_MEDIUM}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};
