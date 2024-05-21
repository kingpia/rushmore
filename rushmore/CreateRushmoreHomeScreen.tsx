import React, { useState } from "react";
import { Animated, SafeAreaView } from "react-native";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { RushmoreCard } from "../components/RushmoreCard";
import { RushmoreService } from "../service/RushmoreService";
import { CreateRushmoreStackParamList } from "../nav/params/CreateRushmoreStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { CreateUserRushmoreDetailResponseDTO } from "../model/CreateUserRushmoreDetailResponseDTO";
import { Rushmore } from "../model/Rushmore";
import { Divider } from "react-native-paper";
import { AppStackParamList } from "../nav/params/AppStackParamList";

type CreateRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<
    CreateRushmoreStackParamList & AppStackParamList
  >;
};

export const CreateRushmoreHomeScreen: React.FC<
  CreateRushmoreHomeScreenProps
> = ({ navigation }: CreateRushmoreHomeScreenProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [rushmoreList, setRushmoreList] = useState<Rushmore[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const rushmoreService =
          new RushmoreService<CreateUserRushmoreDetailResponseDTO>();
        try {
          const response = await rushmoreService.getRushmores();
          setRushmoreList(response.rushmoreList);

          const categoriesSet = new Set<string>();
          response.rushmoreList.forEach((rushmore) => {
            categoriesSet.add(rushmore.category);
          });

          const categoriesArray = Array.from(categoriesSet);
          categoriesArray.unshift("All");
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

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0); // Reset opacity to 0 when screen is focused
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    }, [])
  );

  const countByCategory = (category: string): number => {
    return rushmoreList.filter((item) =>
      category === "All" ? true : item.category === category
    ).length;
  };

  const filteredRushmoreData = rushmoreList.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const navigateToRushmoreSettingsScreen = (rushmore: Rushmore) => {
    navigation.navigate("RushmoreSettingsScreen", {
      rushmore,
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
      <Animated.FlatList
        data={filteredRushmoreData}
        keyExtractor={(item) => item.rid.toString()}
        style={{ opacity: fadeAnim }}
        renderItem={({ item, index }) => (
          <>
            <RushmoreCard
              rushmore={item}
              onPress={() => navigateToRushmoreSettingsScreen(item)}
            />
            {index !== filteredRushmoreData.length - 1 && (
              <Divider style={{ backgroundColor: "teal" }} />
            )}
          </>
        )}
      />
    </SafeAreaView>
  );
};
