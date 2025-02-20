import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Weather Dashboard</Text>
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
