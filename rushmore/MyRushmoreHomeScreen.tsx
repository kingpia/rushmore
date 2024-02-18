import React, { useCallback, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

import { RushmoreService } from "../service/RushmoreService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MyCompletedRushmoreCard } from "../components/MyCompletedRushmoreCard";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { MyInProgressRushmoreCard } from "../components/MyInProgressRushmoreCard";
import { UserRushmore } from "../model/UserRushmore";
import { categories } from "../model/Categories";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { AppStackParamList } from "../nav/params/AppStackParamList";

type MyRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList & AppStackParamList>;
};

export const MyRushmoreHomeScreen = ({
  navigation,
}: MyRushmoreHomeScreenProps) => {
  const [value, setValue] = useState("inprogress");
  const [myInProgressRushmoreList, setMyInProgressRushmoreList] = useState<
    UserRushmore[]
  >([]);
  const [myCompletedRushmoreList, setMyCompletedRushmoreList] = useState<
    UserRushmore[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const fetchData = async (selectedValue: string) => {
    console.log(`fetchData: YourRushdmoreHomeScreen - ${selectedValue}`);

    try {
      if (selectedValue === "inprogress") {
        const rushmoreService = new RushmoreService<UserRushmore>();

        const myInProgrssRushmoreData = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.YOUR_IN_PROGRESS_RUSHMORE_LIST
        );
        setMyInProgressRushmoreList(myInProgrssRushmoreData);
      } else if (selectedValue === "complete") {
        const rushmoreService = new RushmoreService<UserRushmore>();

        const myCompletedRushmoreData = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.YOUR_COMPLETED_RUSHMORE_LIST
        );
        setMyCompletedRushmoreList(myCompletedRushmoreData);
      }
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
    }
  };

  const countByCategory = (category: string) => {
    if (value === "inprogress") {
      return myInProgressRushmoreList.filter(
        (item) =>
          category === "All" || item.rushmore.rushmoreCategory === category
      ).length;
    } else {
      return myCompletedRushmoreList.filter(
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

  const navigateToMyCompletedRushmore = (userRushmore: UserRushmore) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore,
    });
  };

  const navigateToMyInProgressRushmore = (userRushmore: UserRushmore) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore,
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
            <MyInProgressRushmoreCard
              myInProgressRushmore={item}
              onPress={() => navigateToMyInProgressRushmore(item)}
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
          <MyCompletedRushmoreCard
            myCompletedRushmore={item}
            onPress={() => navigateToMyCompletedRushmore(item)}
          />
        )}
      />
    );
  };

  const filteredYourInProgressRushmoreData =
    myInProgressRushmoreList?.filter(
      (item) =>
        selectedCategory === "All" ||
        item.rushmore.rushmoreCategory === selectedCategory
    ) || [];

  const filteredCompletedInProgressRushmoreData =
    myCompletedRushmoreList?.filter(
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
