import React, { useCallback, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

import { RushmoreService } from "../service/RushmoreService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { YourCompletedRushmoreCard } from "../components/YourCompletedRushmoreCard";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { YourInProgressRushmoreCard } from "../components/YourInProgressRushmoreCard";
import { UserRushmore } from "../model/UserRushmore";
import { categories } from "../model/Categories";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";

type YourRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList>;
};

export const YourRushmoreHomeScreen = ({
  navigation,
}: YourRushmoreHomeScreenProps) => {
  const [value, setValue] = useState("inprogress");
  const [yourInProgressRushmoreList, setYourInProgressRushmoreList] = useState<
    UserRushmore[]
  >([]);
  const [yourCompletedRushmoreList, setYourCompletedRushmoreList] = useState<
    UserRushmore[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const fetchData = async (selectedValue: string) => {
    console.log(`fetchData: YourRushmoreHomeScreen - ${selectedValue}`);

    try {
      if (selectedValue === "inprogress") {
        const rushmoreService = new RushmoreService<UserRushmore>();

        const yourRushmoreCards = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.YOUR_IN_PROGRESS_RUSHMORE_LIST
        );
        setYourInProgressRushmoreList(yourRushmoreCards);
      } else if (selectedValue === "complete") {
        const rushmoreService = new RushmoreService<UserRushmore>();

        const completedRushmoreCards = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.YOUR_COMPLETED_RUSHMORE_LIST
        );
        setYourCompletedRushmoreList(completedRushmoreCards);
      }
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
    }
  };

  const countByCategory = (category: string) => {
    if (value === "inprogress") {
      return yourInProgressRushmoreList.filter(
        (item) =>
          category === "All" || item.rushmore.rushmoreCategory === category
      ).length;
    } else {
      return yourCompletedRushmoreList.filter(
        (item) =>
          category === "All" || item.rushmore.rushmoreCategory === category
      ).length;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(value);
    }, [value])
  );

  const navigateToYourCompletedRushmore = (rushmoreItem: UserRushmore) => {
    navigation.navigate("YourCompletedRushmoreScreen", {
      rushmoreItem,
      // Add other properties as needed
    });
  };

  const navigateToYourInProgressRushmore = (rushmoreItem: UserRushmore) => {
    navigation.navigate("YourInProgressRushmoreScreen", {
      rushmoreItem,
    });
  };

  const handleCategoryPress = (category: string) => {
    console.log(`Clicked on ${category}`);
    setSelectedCategory(category);
  };

  const renderInProgressRushmoreList = () => {
    return (
      <>
        <FlatList
          data={filteredYourInProgressRushmoreData}
          keyExtractor={(item) => item.rushmore.rid.toString()}
          renderItem={({ item }) => (
            <YourInProgressRushmoreCard
              yourInProgressRushmore={item}
              onPress={() => navigateToYourInProgressRushmore(item)}
            />
          )}
        />
      </>
    );
  };

  const renderCompletedRushmoreList = () => {
    return (
      <FlatList
        data={filteredCompletedInProgressRushmoreData}
        keyExtractor={(item) => item.rushmore.rid.toString()}
        renderItem={({ item }) => (
          <YourCompletedRushmoreCard
            yourCompletedRushmore={item}
            onPress={() => navigateToYourCompletedRushmore(item)}
          />
        )}
      />
    );
  };

  const filteredYourInProgressRushmoreData =
    yourInProgressRushmoreList?.filter(
      (item) =>
        selectedCategory === "All" ||
        item.rushmore.rushmoreCategory === selectedCategory
    ) || [];

  const filteredCompletedInProgressRushmoreData =
    yourCompletedRushmoreList?.filter(
      (item) =>
        selectedCategory === "All" ||
        item.rushmore.rushmoreCategory === selectedCategory
    ) || [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RushmoreHorizontalView
        selectedCategory={selectedCategory}
        onPressCategory={handleCategoryPress}
        countByCategory={countByCategory}
      />
      <SegmentedButtons
        style={{ margin: 10 }}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "inprogress",
            label: "In-Progress",
          },
          {
            value: "complete",
            label: "Completed",
          },
        ]}
      />

      {value === "inprogress"
        ? renderInProgressRushmoreList()
        : renderCompletedRushmoreList()}
    </SafeAreaView>
  );
};
