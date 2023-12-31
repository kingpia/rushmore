import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { categories } from "../model/Categories";

interface RushmoreHorizontalViewProps {
  selectedCategory: string;
  onPressCategory: (category: string) => void;
  countByCategory: (category: string) => number;
}

export const RushmoreHorizontalView: React.FC<RushmoreHorizontalViewProps> = ({
  selectedCategory,
  onPressCategory,
  countByCategory,
}) => {
  const getCategoryWithCount = (category: string): string => {
    const count = countByCategory(category);
    return `${category} ${count}`;
  };

  return (
    <ScrollView horizontal style={styles.scrollContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPressCategory(category)}
          style={styles.categoryButton}
        >
          <Text
            style={{
              fontWeight: category === selectedCategory ? "bold" : "normal",
              fontSize: 15,
            }}
          >
            {getCategoryWithCount(category)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
  },
});
