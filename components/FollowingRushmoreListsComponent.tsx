import React, { useState, useCallback } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { RushmoreService } from "../service/RushmoreService";
import { useFocusEffect } from "@react-navigation/native";
import { FollowingSolvedRushmoreCard } from "../components/FollowingSolvedRushmoreCard";
import { FollowingInProgressRushmoreCard } from "../components/FollowingInProgressRushmoreCard";
import { UserRushmoreGameSession } from "../model/UserRushmoreGameSession";

type FollowingRushmoreListsComponentProps = {
  navigation: any; // Change the type according to your navigation props
};

const FollowingRushmoreListsComponent = ({
  navigation,
}: FollowingRushmoreListsComponentProps) => {
  const [value, setValue] = useState("inprogress");
  const [
    followingInProgressUserRushmoreList,
    setFollowingInProgressUserRushmoreList,
  ] = useState<UserRushmoreGameSession[]>([]);
  const [
    followingSolvedUserRushmoreGameList,
    setFollowingSolvedUserRushmoreGameList,
  ] = useState<UserRushmoreGameSession[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]); // Initialize with "All"

  const [isLoading, setLoading] = useState(true);

  const fetchData = async (selectedValue: string) => {
    setLoading(true); // Set loading to true when fetching data

    try {
      const rushmoreService = new RushmoreService<any>();
      let data: any[] = [];

      if (selectedValue === "inprogress") {
        //TODO API TO GET the users in progress UserRushmoreGameSessions
        data = await rushmoreService.getMyInProgressUserRushmoreGameSessions();
        console.log(
          "getMyInProgressUserRushmoreGameSessions:" + JSON.stringify(data)
        );
        setFollowingInProgressUserRushmoreList(data);
      } else if (selectedValue === "solved") {
        //TODO API TO GET the users completed UserRushmoreGameSessions
        data = await rushmoreService.getMySolvedUserRushmoreGameSessions();
        console.log(
          "getMySolvedUserRushmoreGameSessions:" + JSON.stringify(data)
        );

        setFollowingSolvedUserRushmoreGameList(data);
      }
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const countByCategory = (category: string) => {
    if (value === "inprogress") {
      return followingInProgressUserRushmoreList.filter(
        (item) =>
          category === "All" || item.userRushmore.rushmore.category === category
      ).length;
    } else {
      return followingSolvedUserRushmoreGameList.filter(
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

  const navigateToSolvedRushmoreScreen = (
    rushmoreItem: UserRushmoreGameSession
  ) => {
    navigation.navigate("FollowingSolvedRushmoreScreen", {
      rushmoreItem,
    });
  };

  const navigateToInProgressRushmoreScreen = (
    followingInProgressRushmore: UserRushmoreGameSession
  ) => {
    navigation.navigate("RushmoreGameScreen", {
      urId: followingInProgressRushmore.userRushmore.urId,
    });
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            value: "solved",
            label: "Solved",
          },
        ]}
      />

      {value === "inprogress" ? (
        <FlatList
          data={followingInProgressUserRushmoreList}
          keyExtractor={(item) => item.urgsId.toString()}
          renderItem={({ item }) => (
            <FollowingInProgressRushmoreCard
              inProgressUserRushmoreGameSession={item}
              onPress={() => navigateToInProgressRushmoreScreen(item)}
            />
          )}
        />
      ) : (
        <FlatList
          data={followingSolvedUserRushmoreGameList}
          keyExtractor={(item) => item.urgsId.toString()}
          renderItem={({ item }) => (
            <FollowingSolvedRushmoreCard
              solvedUserRushmoreGameSession={item}
              onPress={() => navigateToSolvedRushmoreScreen(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default FollowingRushmoreListsComponent;
