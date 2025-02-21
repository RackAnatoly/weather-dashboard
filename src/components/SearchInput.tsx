import React from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { SIZES } from "../constants/sizes";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

export const SearchInput = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Search city..."
}: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      <Pressable style={styles.searchButton} onPress={onSubmit}>
        <Ionicons
          name="search"
          size={SIZES.ICON_MEDIUM}
          color={COLORS.primary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: SIZES.SPACING_M,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  input: {
    flex: 1,
    padding: SIZES.SPACING_M,
    paddingRight: SIZES.SPACING_S
  },
  searchButton: {
    padding: SIZES.SPACING_M
  }
});
