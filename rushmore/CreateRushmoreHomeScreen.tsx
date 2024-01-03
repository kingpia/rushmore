import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import React, { useEffect, useState } from "react";
import { categories } from "../model/Categories";
import { Rushmore } from "../model/Rushmore";
import { RushmoreService } from "../service/RushmoreService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { RushmoreCard } from "../components/RushmoreCard";
import { CreateRushmoreStackParamList } from "../nav/params/CreateRushmoreStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type CreateRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<CreateRushmoreStackParamList>;
};

export const CreateRushmoreHomeScreen = ({
  navigation,
}: CreateRushmoreHomeScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [rushmoreList, setRushmoreList] = useState<Rushmore[]>();
  const handleCategoryPress = (category: string) => {
    console.log(`Clicked on ${category}`);
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      const rushmoreService = new RushmoreService<Rushmore>();
      try {
        const rushmoreList = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.RUSHMORE_LIST
        );
        setRushmoreList(rushmoreList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  const countByCategory = (category: string): number => {
    return (
      rushmoreList?.filter((item) =>
        category === "All" ? true : item.rushmoreCategory === category
      ).length || 0
    );
  };

  const filteredRushmoreData = rushmoreList?.filter(
    (item) =>
      selectedCategory === "All" || item.rushmoreCategory === selectedCategory
  );

  const navigateToRushmoreSettingsScreen = (rushmore: Rushmore) => {
    navigation.navigate("RushmoreSettingsScreen", {
      rushmore,
      // Add other properties as needed
    });
  };

  return (
    <SafeAreaView>
      <Text variant="displayMedium">Create Rushmore</Text>
      <RushmoreHorizontalView
        selectedCategory={selectedCategory}
        onPressCategory={handleCategoryPress}
        countByCategory={countByCategory}
      />
      <FlatList
        data={filteredRushmoreData}
        keyExtractor={(item) => item.rid.toString()}
        renderItem={({ item }) => (
          <RushmoreCard
            rushmore={item}
            onPress={() => navigateToRushmoreSettingsScreen(item)}
          />
        )}
      />
    </SafeAreaView>
  );
};
