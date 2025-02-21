import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { COLORS } from "./src/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  }
});
