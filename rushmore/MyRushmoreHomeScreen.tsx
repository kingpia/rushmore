import React, { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MyCompletedRushmoreCard } from "../components/MyCompletedRushmoreCard";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { MyInProgressRushmoreCard } from "../components/MyInProgressRushmoreCard";
import { UserRushmore } from "../model/UserRushmore";
import { categories } from "../model/Categories";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { RushmoreGraphService } from "../service/RushmoreGraphService";
import { MyRushmoreListsComponent } from "../components/MyRushmoreListsComponent";

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
  /*

  const fetchData = async (selectedValue: string) => {
    console.log(`fetchData: MyRushmoreHomeScreen - ${selectedValue}`);

    try {
      const rushmoreGraphService = new RushmoreGraphService();

      if (selectedValue === "inprogress") {
        const myInProgressRushmoreData =
          await rushmoreGraphService.getMyInProgressRushmoreList();
        setMyInProgressRushmoreList(myInProgressRushmoreData);
      } else if (selectedValue === "complete") {
        const myCompletedRushmoreData =
          await rushmoreGraphService.getMyCompletedRushmoreList();
        setMyCompletedRushmoreList(myCompletedRushmoreData);
      }
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const countByCategory = (category: string) => {
    console.log("Count by category");
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
  */

  /*
  useEffect(() => {
    fetchData(value);
  }, [value]); // Use useEffect instead of useFocusEffect
  */

  /*
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
    */

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyRushmoreListsComponent navigation={navigation} />
    </SafeAreaView>
  );
};
