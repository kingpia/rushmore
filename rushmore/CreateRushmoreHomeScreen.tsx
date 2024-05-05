import { FlatList, SafeAreaView } from "react-native";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import React, { useState } from "react";
import { Rushmore } from "../model/Rushmore";
import { RushmoreService } from "../service/RushmoreService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { RushmoreCard } from "../components/RushmoreCard";
import { CreateRushmoreStackParamList } from "../nav/params/CreateRushmoreStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { CreateUserRushmoreDetailResponseDTO } from "../model/CreateUserRushmoreDetailResponseDTO";
import { RushmoreCategory } from "../model/RushmoreCategory";

type CreateRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<CreateRushmoreStackParamList>;
};

export const CreateRushmoreHomeScreen = ({
  navigation,
}: CreateRushmoreHomeScreenProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [rushmoreList, setRushmoreList] = useState<Rushmore[]>();
  const handleCategoryPress = (category: string) => {
    console.log(`Clicked on ${category}`);
    setSelectedCategory(category);
  };

  console.log("Create Rushmore Home SCreen");

  useFocusEffect(
    React.useCallback(() => {
      console.log("Create Rushmore Home SCreen USE");

      const fetchData = async () => {
        const rushmoreService =
          new RushmoreService<CreateUserRushmoreDetailResponseDTO>();
        try {
          const response = await rushmoreService.getRushmores();
          console.log("Response:" + JSON.stringify(rushmoreList));
          setRushmoreList(response.rushmoreList);
          //Fuck screwing with categories from the server, formulate it yourself by looping through the rushmoreList then setCategories
          // Extract unique categories from rushmoreList
          const categoriesSet = new Set<string>();
          response.rushmoreList.forEach((rushmore) => {
            categoriesSet.add(rushmore.category);
          });

          // Add "All" category at the beginning
          const categoriesArray = Array.from(categoriesSet);
          categoriesArray.unshift("All");

          console.log("Categories Array:" + JSON.stringify(categoriesArray));

          setCategories(categoriesArray);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  const countByCategory = (category: string): number => {
    return (
      rushmoreList?.filter((item) =>
        category === "All" ? true : item.category === category
      ).length || 0
    );
  };

  const filteredRushmoreData = rushmoreList?.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const navigateToRushmoreSettingsScreen = (rushmore: Rushmore) => {
    navigation.navigate("RushmoreSettingsScreen", {
      rushmore,
      // Add other properties as needed
    });
  };

  return (
    <SafeAreaView>
      <RushmoreHorizontalView
        selectedCategory={selectedCategory}
        onPressCategory={handleCategoryPress}
        countByCategory={countByCategory}
        categories={categories}
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
