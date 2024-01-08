import React, { useState, useCallback } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Searchbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { UserCard } from "../components/UserCard";
import { UserService } from "../service/UserService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { FriendsStackParamList } from "../nav/params/FriendsStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type FriendsScreenProps = {
  navigation: NativeStackNavigationProp<FriendsStackParamList>;
};

export const FriendsScreen = ({ navigation }: FriendsScreenProps) => {
  const [friendsList, setFriendsList] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const fetchData = async () => {
    console.log("Fetching FriendsScreen  Data");

    // Create an instance of RushmoreService with RushmoreCard type
    const friendService = new UserService<User>();

    try {
      // Fetch Rushmore items
      const followingCards = await friendService.getRushmoreItems(
        "pia_id",
        ApiFetchEnums.FRIENDS_LIST
      );

      // Set the fetched Rushmore items to the state
      setFriendsList(followingCards);
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
    }
  };

  // Use useFocusEffect to fetch data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []) // Empty dependency array to run the effect only once when the component mounts
  );

  const navigateToUserProfileScreen = (user: User) => {
    console.log("navigateToUserProfileScreen");
    navigation.navigate("UserProfileScreen", {
      user,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ margin: 5 }}
      />

      <FlatList
        data={friendsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => navigateToUserProfileScreen(item)}
          />
        )}
      />
    </SafeAreaView>
  );
};
