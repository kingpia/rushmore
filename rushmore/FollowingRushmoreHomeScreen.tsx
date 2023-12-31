import React, { useState, useCallback } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { RushmoreService } from "../service/RushmoreService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { FollowingSolvedRushmoreCard } from "../components/FollowingSolvedRushmoreCard";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FollowingSolvedRushmore } from "../model/FollowingSolvedRushmore";
import { FollowingInProgressRushmoreCard } from "../components/FollowingInProgressRushmoreCard";
import { FollowingInProgressRushmore } from "../model/FollowingInProgressRushmore";

type FollowingRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList>;
};

export const FollowingRushmoreHomeScreen = ({
  navigation,
}: FollowingRushmoreHomeScreenProps) => {
  const [value, setValue] = useState("inprogress"); // Set the initial value to "inprogress"

  const [followingInProgressRushmore, setFollowingInProgressRushmore] =
    useState<FollowingInProgressRushmore[]>([]);

  const [followingSolvedRushmoreItems, setFollowingSolvedRushmoreItems] =
    useState<FollowingSolvedRushmore[]>([]);

  const fetchData = async (selectedValue: string) => {
    console.log(`fetchData: YourRushmoreHomeScreen - ${selectedValue}`);

    try {
      if (selectedValue === "inprogress") {
        const rushmoreService =
          new RushmoreService<FollowingInProgressRushmore>();

        const followingInProgressRushmoreItems =
          await rushmoreService.getRushmoreItems(
            "pia_id",
            ApiFetchEnums.FOLLOWING_IN_PROGRESS_RUSHMORE_LIST
          );
        setFollowingInProgressRushmore(followingInProgressRushmoreItems);
      } else if (selectedValue === "solved") {
        const rushmoreService = new RushmoreService<FollowingSolvedRushmore>();

        const solvedRushmoreList = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.FOLLOWING_SOLVED_RUSHMORE_LIST
        );
        setFollowingSolvedRushmoreItems(solvedRushmoreList);
      }
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(value);
    }, [value]) // Fetch data whenever the value changes
  );

  const navigateToFollowingSolvedRushmoreScreen = (
    rushmoreItem: FollowingSolvedRushmore
  ) => {
    console.log("Navigate to followingsolved rushmore home screen");
    navigation.navigate("FollowingSolvedRushmoreScreen", {
      rushmoreItem,
    });
  };

  const navigateToFollowingInProgressRushmoreScreen = (
    rushmoreItem: FollowingInProgressRushmore
  ) => {
    console.log("Navigate to FollowingInProgressRushmore rushmore  screen");
    navigation.navigate("FollowingInProgressRushmoreScreen", {
      rushmoreItem,
    });
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
          data={followingInProgressRushmore}
          keyExtractor={(item) => item.rushmoreId}
          renderItem={({ item }) => (
            <FollowingInProgressRushmoreCard
              followingInProgressRushmore={item}
              onPress={() => navigateToFollowingInProgressRushmoreScreen(item)}
            />
          )}
        />
      ) : (
        <FlatList
          data={followingSolvedRushmoreItems}
          keyExtractor={(item) => item.rushmoreId}
          renderItem={({ item }) => (
            <FollowingSolvedRushmoreCard
              followingSolvedRushmore={item}
              onPress={() => navigateToFollowingSolvedRushmoreScreen(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};
