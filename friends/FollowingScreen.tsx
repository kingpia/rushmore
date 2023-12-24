import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { UserCard } from "../components/UserCard";
import { FriendsService } from "../service/FriendsService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";

export const FollowingScreen = () => {
  const [followingList, setFollowingList] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Create an instance of RushmoreService with RushmoreCard type
      const friendService = new FriendsService<User>();

      try {
        // Fetch Rushmore items
        const followingCards = await friendService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.FOLLOWING_LIST
        );

        // Set the fetched Rushmore items to the state
        setFollowingList(followingCards);
      } catch (error) {
        console.error("Error fetching Rushmore items:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <SafeAreaView>
      <View style={{ alignSelf: "center" }}>
        <Text variant="displaySmall">Following Screen</Text>
      </View>

      <FlatList
        data={followingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard
            id={item.id}
            userName={item.userName}
            name={item.name}
            rushmoresCompletedCount={item.rushmoresCompletedCount}
            rushmoresSolvedCount={item.rushmoresSolvedCount}
          />
        )}
      />
    </SafeAreaView>
  );
};
