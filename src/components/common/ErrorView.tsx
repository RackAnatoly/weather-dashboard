import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../constants/sizes";
import { COLORS } from "../../constants/colors";

type ErrorViewProps = {
  message: string;
  onRetry: () => void;
};

export const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="warning-outline"
        size={SIZES.ICON_LARGE * 2}
        color={COLORS.error}
        style={styles.icon}
      />
      <Text style={styles.message}>{message}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.retryButton,
          pressed && styles.retryButtonPressed
        ]}
        onPress={onRetry}
      >
        <Ionicons
          name="refresh"
          size={SIZES.ICON_MEDIUM}
          color={COLORS.white}
          style={styles.refreshIcon}
        />
        <Text style={styles.retryText}>Try Again</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.SPACING_L
  },
  icon: {
    marginBottom: SIZES.SPACING_M
  },
  message: {
    fontSize: SIZES.FONT_M,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SIZES.SPACING_L
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.SPACING_L,
    paddingVertical: SIZES.SPACING_M,
    borderRadius: SIZES.SPACING_M
  },
  retryButtonPressed: {
    opacity: 0.8
  },
  refreshIcon: {
    marginRight: SIZES.SPACING_S
  },
  retryText: {
    color: COLORS.white,
    fontSize: SIZES.FONT_M,
    fontWeight: "600"
  }
});
