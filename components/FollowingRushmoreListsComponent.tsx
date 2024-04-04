import React, { useState, useCallback } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { RushmoreService } from "../service/RushmoreService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { useFocusEffect } from "@react-navigation/native";
import { FollowingSolvedRushmoreCard } from "../components/FollowingSolvedRushmoreCard";
import { FollowingInProgressRushmoreCard } from "../components/FollowingInProgressRushmoreCard";
import { FollowingInProgressRushmore } from "../model/FollowingInProgressRushmore";
import { FollowingSolvedRushmore } from "../model/FollowingSolvedRushmore";

type FollowingRushmoreListsComponentProps = {
  navigation: any; // Change the type according to your navigation props
};

const FollowingRushmoreListsComponent = ({
  navigation,
}: FollowingRushmoreListsComponentProps) => {
  const [value, setValue] = useState("inprogress");
  const [followingInProgressRushmore, setFollowingInProgressRushmore] =
    useState<FollowingInProgressRushmore[]>([]);
  const [followingSolvedRushmoreItems, setFollowingSolvedRushmoreItems] =
    useState<FollowingSolvedRushmore[]>([]);

  const fetchData = async (selectedValue: string) => {
    try {
      const rushmoreService = new RushmoreService<any>();
      let data: any[] = [];

      if (selectedValue === "inprogress") {
        data = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.FOLLOWING_IN_PROGRESS_RUSHMORE_LIST
        );
        setFollowingInProgressRushmore(data);
      } else if (selectedValue === "solved") {
        data = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.FOLLOWING_SOLVED_RUSHMORE_LIST
        );
        setFollowingSolvedRushmoreItems(data);
      }
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(value);
    }, [value])
  );

  const navigateToSolvedRushmoreScreen = (
    rushmoreItem: FollowingSolvedRushmore
  ) => {
    navigation.navigate("FollowingSolvedRushmoreScreen", {
      rushmoreItem,
    });
  };

  const navigateToInProgressRushmoreScreen = (
    followingInProgressRushmore: FollowingInProgressRushmore
  ) => {
    navigation.navigate("RushmoreGameScreen", {
      urId: followingInProgressRushmore.urId,
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
              onPress={() => navigateToInProgressRushmoreScreen(item)}
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
              onPress={() => navigateToSolvedRushmoreScreen(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default FollowingRushmoreListsComponent;
