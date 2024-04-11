import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { FlatList, View, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MyInProgressRushmoreCard } from "../components/MyInProgressRushmoreCard";
import { categories } from "../model/Categories";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { RushmoreService } from "../service/RushmoreService";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import UserRushmoreListComponent from "./UserRushmoreListComponent";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";

type MyRushmoreListsComponentProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList & AppStackParamList>;
};

export const MyRushmoreListsComponent: React.FC<
  MyRushmoreListsComponentProps
> = ({ navigation }) => {
  const [value, setValue] = useState("inprogress");
  const [myInProgressRushmoreList, setMyInProgressRushmoreList] = useState<
    UserRushmoreDTO[]
  >([]);
  const [myCompletedRushmoreList, setMyCompletedRushmoreList] = useState<
    UserRushmoreDTO[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async (selectedValue: string) => {
    setLoading(true); // Set loading to true when fetching data
    const rushmoreService = new RushmoreService();

    try {
      if (selectedValue === "inprogress") {
        const myInProgressRushmoreData =
          await rushmoreService.getMyInProgressRushmoreList();
        setMyInProgressRushmoreList(myInProgressRushmoreData);
        console.log(
          "MyInProgressRushmoreData:" + JSON.stringify(myInProgressRushmoreData)
        );
      } else if (selectedValue === "complete") {
        const myCompletedRushmoreData =
          await rushmoreService.getMyCompletedRushmoreList();
        setMyCompletedRushmoreList(myCompletedRushmoreData);
        console.log(
          "setMyCompletedRushmoreList:" +
            JSON.stringify(myCompletedRushmoreData)
        );
      }
      setLoading(false); // Set loading to false after fetching data
      // Calculate category counts after setting the state
      // Update category counts
      countByCategory(selectedCategory);
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const countByCategory = (category: string) => {
    if (value === "inprogress") {
      return myInProgressRushmoreList.filter(
        (item) =>
          category === "All" || item.userRushmore.rushmore.category === category
      ).length;
    } else {
      return myCompletedRushmoreList.filter(
        (item) =>
          category === "All" || item.userRushmore.rushmore.category === category
      ).length;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(value);
    }, [value])
  );

  const navigateToMyCompletedRushmore = (userRushmore: UserRushmoreDTO) => {
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
  const renderItemSeparator = () => <View style={styles.divider} />;

  const renderInProgressRushmoreList = () => {
    return (
      <FlatList
        data={filteredYourInProgressRushmoreData}
        keyExtractor={(item) => item.userRushmore.rushmore.rid.toString()}
        renderItem={({ item }) => (
          <MyInProgressRushmoreCard
            myInProgressRushmore={item}
            onPress={() => navigateToMyInProgressRushmore(item)}
          />
        )}
      />
    );
  };

  const renderCompletedRushmoreList = () => {
    return (
      <FlatList
        data={filteredCompletedInProgressRushmoreData}
        keyExtractor={(item) => item.userRushmore.rushmore.rid.toString()}
        renderItem={({ item }) => (
          <UserRushmoreListComponent
            userRushmoreDTO={item}
            onPress={() => navigateToMyCompletedRushmore(item)}
          />
        )}
        ItemSeparatorComponent={renderItemSeparator}
      />
    );
  };

  const filteredYourInProgressRushmoreData =
    myInProgressRushmoreList?.filter(
      (item) =>
        selectedCategory === "All" ||
        item.userRushmore.rushmore.category === selectedCategory
    ) || [];

  const filteredCompletedInProgressRushmoreData =
    myCompletedRushmoreList?.filter(
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
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
});
