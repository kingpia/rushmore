import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface RushmoreHorizontalViewProps {
  selectedCategory: string;
  onPressCategory: (category: string) => void;
  countByCategory: (category: string) => number;
  categories: string[];
}

export const RushmoreHorizontalView: React.FC<RushmoreHorizontalViewProps> = ({
  selectedCategory,
  onPressCategory,
  countByCategory,
  categories,
}) => {
  const getCategoryWithCount = (category: string): string => {
    const count = countByCategory(category);
    return `${category} (${count})`;
  };

  return (
    <ScrollView
      horizontal
      style={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPressCategory(category)}
          style={[
            styles.categoryButton,
            category === selectedCategory && styles.selectedCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              category === selectedCategory && styles.selectedCategoryText,
            ]}
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
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#f8f8f8",
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: "#00796b",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCategoryText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
