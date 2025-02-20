import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SIZES } from "../../constants/sizes";
import { COLORS } from "../../constants/colors";

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.SPACING_M,
    gap: SIZES.SPACING_M
  },
  message: {
    fontSize: SIZES.FONT_M,
    textAlign: "center",
    color: COLORS.text
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.SPACING_L,
    paddingVertical: SIZES.SPACING_M,
    borderRadius: 8
  },
  buttonText: {
    color: COLORS.text,
    fontSize: SIZES.FONT_M
  }
});
