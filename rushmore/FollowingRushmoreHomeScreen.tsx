import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { RushmoreService } from "../service/RushmoreService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { FollowingRushmoreCard } from "../components/FollowingRushmoreCard";

export const FollowingRushmoreHomeScreen = () => {
  const [value, setValue] = React.useState("");
  const [rushmoreItems, setRushmoreItems] = useState<FollowingRushmoreCard[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      // Create an instance of RushmoreService with RushmoreCard type
      const rushmoreService = new RushmoreService<FollowingRushmoreCard>();

      try {
        // Fetch Rushmore items
        const youRushmoreCards = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.FOLLOWING_RUSHMORE_IN_PROGRESS
        );

        // Set the fetched Rushmore items to the state
        setRushmoreItems(youRushmoreCards);
      } catch (error) {
        console.error("Error fetching Rushmore items:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []); // Empty dependency array to run the effect only once on mount

  //Call to get your list here via async when page loads from a source.

  return (
    <SafeAreaView>
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
      <FlatList
        data={rushmoreItems}
        keyExtractor={(item) => item.rushmore.toString()}
        renderItem={({ item }) => (
          <FollowingRushmoreCard
            // Render RushmoreCard component with item data
            id={item.id}
            rushmore={item.rushmore}
            followingFirstName={item.followingUsername}
            yourScore={item.yourScore}
            totalTimesCompleted={item.totalTimesCompleted}
            highScore={item.highScore}
            uidFollowing={item.uidFollowing}
            followingUsername={item.followingUsername}
          />
        )}
      />
    </SafeAreaView>
  );
};
