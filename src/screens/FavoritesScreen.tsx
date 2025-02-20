import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorite screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
