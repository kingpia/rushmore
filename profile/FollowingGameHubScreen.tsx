import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MyCompletedRushmoreCard } from "../components/MyCompletedRushmoreCard";
import { MyInProgressRushmoreCard } from "../components/MyInProgressRushmoreCard";
import { UserRushmore } from "../model/UserRushmore";
import { categories } from "../model/Categories";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { RushmoreGraphService } from "../service/RushmoreGraphService";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { FollowingSolvedRushmoreCard } from "../components/FollowingSolvedRushmoreCard";
import { FollowingSolvedRushmore } from "../model/FollowingSolvedRushmore";
import { FollowingInProgressRushmore } from "../model/FollowingInProgressRushmore";

type FollowingGameHubScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList & AppStackParamList>;
};

export const FollowingGameHubScreen: React.FC<FollowingGameHubScreenProps> = ({
  navigation,
}) => {
  const [value, setValue] = useState("inprogress");
  const [
    myInProgressUserRushmoreGameList,
    setMyInProgressUserRushmoreGameList,
  ] = useState<UserRushmore[]>([]);
  const [myCompletedUserRushmoreGameList, setMyCompletedUserRushmoreGameList] =
    useState<UserRushmore[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isLoading, setLoading] = useState(true);

  const rushmoreGraphService = new RushmoreGraphService();

  const fetchData = async (selectedValue: string) => {
    setLoading(true); // Set loading to true when fetching data

    try {
      if (selectedValue === "inprogress") {
        //TODO: FIX THIS
        const myInProgressUserRushmoreGameData =
          await rushmoreGraphService.getMyInProgressRushmoreList();
        setMyInProgressUserRushmoreGameList(myInProgressUserRushmoreGameData);
      } else if (selectedValue === "complete") {
        //TODO FIX THIS
        const myCompletedUserRushmoreGameData =
          await rushmoreGraphService.getMyCompletedRushmoreList();
        setMyCompletedUserRushmoreGameList(myCompletedUserRushmoreGameData);
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
      return myInProgressUserRushmoreGameList.filter(
        (item) => category === "All" || item.rushmore.category === category
      ).length;
    } else {
      return myCompletedUserRushmoreGameList.filter(
        (item) => category === "All" || item.rushmore.category === category
      ).length;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(value);
    }, [value])
  );

  const navigateToMyCompletedUserRushmoreGame = (
    userRushmore: UserRushmore
  ) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore,
    });
  };

  const navigateToMyInProgressUserRushmoreGame = (
    userRushmore: UserRushmore
  ) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore,
    });
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const renderInProgressUserRushmoreGameList = () => {
    return (
      <FlatList
        data={filteredYourInProgressRushmoreData}
        keyExtractor={(item) => item.rushmore.rid.toString()}
        renderItem={({ item }) => (
          <MyInProgressRushmoreCard
            myInProgressRushmore={item}
            onPress={() => navigateToMyInProgressUserRushmoreGame(item)}
          />
        )}
      />
    );
  };

  const renderCompletedUserRushmoreGameList = () => {
    return (
      <FlatList
        data={filteredCompletedInProgressRushmoreData}
        keyExtractor={(item) => item.rushmore.rid.toString()}
        renderItem={({ item }) => (
          <FollowingSolvedRushmoreCard
            followingSolvedRushmore={undefined}
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}
      />
    );
  };

  const navigateToSolvedRushmoreScreen = (
    rushmoreItem: FollowingSolvedRushmore
  ) => {
    console.log("Navigate to followingsolved rushmore home screen");
    navigation.navigate("FollowingSolvedRushmoreScreen", {
      rushmoreItem,
    });
  };

  const navigateToInProgressRushmoreScreen = (
    followingInProgressRushmore: FollowingInProgressRushmore
  ) => {
    console.log("Navigate to FollowingInProgressRushmore rushmore screen");
    let urId: number = followingInProgressRushmore.urId;
    navigation.navigate("RushmoreGameScreen", {
      urId: followingInProgressRushmore.urId,
    }); // PassurId
  };

  const filteredYourInProgressRushmoreData =
    myInProgressUserRushmoreGameList?.filter(
      (item) =>
        selectedCategory === "All" ||
        item.rushmore.category === selectedCategory
    ) || [];

  const filteredCompletedInProgressRushmoreData =
    myCompletedUserRushmoreGameList?.filter(
      (item) =>
        selectedCategory === "All" ||
        item.rushmore.category === selectedCategory
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
