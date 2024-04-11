import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { UserRushmore } from "../model/UserRushmore";
import { categories } from "../model/Categories";
import { RushmoreHorizontalView } from "./RushmoreHorizontalView";
import { RushmoreService } from "../service/RushmoreService";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import UserRushmoreListComponent from "./UserRushmoreListComponent";
import { formatDateToString } from "../utils/DateUtils";

type MyBookmarkedListsComponentProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList & AppStackParamList>;
};

export const MyBookmarkedListsComponent: React.FC<
  MyBookmarkedListsComponentProps
> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isLoading, setLoading] = useState(true);

  const [bookmarkedRushmoreList, setMyBookmarkedRushmoreList] = useState<
    UserRushmoreDTO[]
  >([]);

  const fetchData = async () => {
    console.log("Fetching Data");
    setLoading(true); // Set loading to true when fetching data
    const rushmoreService = new RushmoreService();

    try {
      const bookmarkedRushmoreList =
        await rushmoreService.getMyBookmarkedUserRushmores();
      setMyBookmarkedRushmoreList(bookmarkedRushmoreList);

      setLoading(false); // Set loading to false after fetching data
      // Calculate category counts after setting the state
      // Update category counts
      countByCategory(selectedCategory);
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const countByCategory = (category: string) => {
    return bookmarkedRushmoreList.filter(
      (item) =>
        category === "All" || item.userRushmore.rushmore.category === category
    ).length;
  };

  const navigateToRushmore = (userRushmore: UserRushmoreDTO) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore,
    });
  };

  const navigateToMyInProgressRushmore = (userRushmore: UserRushmoreDTO) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore,
    });
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const handleUserRushmoreListItemPress = (
    userRushmoreDTO: UserRushmoreDTO
  ) => {};

  const renderItemSeparator = () => <View style={styles.divider} />;

  const filteredMyBookmarkedRushmoreList =
    bookmarkedRushmoreList?.filter(
      (item) =>
        selectedCategory === "All" ||
        item.userRushmore.rushmore.category === selectedCategory
    ) || [];

  return (
    <View>
      <RushmoreHorizontalView
        selectedCategory={selectedCategory}
        onPressCategory={handleCategoryPress}
        countByCategory={countByCategory}
      />
      <FlatList
        data={filteredMyBookmarkedRushmoreList}
        keyExtractor={(item) => item.userRushmore.rushmore.rid.toString()}
        renderItem={({ item }) => (
          <UserRushmoreListComponent
            userRushmoreDTO={item}
            onPress={() => handleUserRushmoreListItemPress(item)}
          />
        )}
        ItemSeparatorComponent={renderItemSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
});
