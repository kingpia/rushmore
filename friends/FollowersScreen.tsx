import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, Animated } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import UserCard from "../components/UserCard";
import { UserService } from "../service/UserService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../nav/params/FriendsStackParamList";

type FollowersScreenProps = {
  navigation: NativeStackNavigationProp<FriendsStackParamList>;
};

const userService = new UserService(); // Instantiate UserService

export const FollowersScreen = ({ navigation }: FollowersScreenProps) => {
  const [followersList, setFollowersList] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  const onChangeSearch = (query: string) => setSearchQuery(query);
  const fetchData = async () => {
    setLoading(true);
    try {
      const followersList = await userService.getFollowersUserList("6662");
      setFollowersList(followersList);
    } catch (error) {
      console.error("Error fetching following users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use useFocusEffect to fetch data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []) // Empty dependency array to run the effect only once when the component mounts
  );

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const navigateToUserProfileScreen = (user: User) => {
    console.log("navigateToUserProfileScreen");
    navigation.navigate("UserProfileScreen", {
      user,
    });
  };

  const followUser = async (followedUid: string) => {
    try {
      const updatedUser = await userService.followUser("6662", followedUid);
      // Update the user's following status in searchResults
      setFollowersList((prevResults) =>
        prevResults.map((user) =>
          user.uid === followedUid ? { ...user, following: "Y" } : user
        )
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async (followedUid: string) => {
    try {
      const updatedUser = await userService.unfollowUser("6662", followedUid);
      // Update the user's following status in searchResults
      setFollowersList((prevResults) =>
        prevResults.map((user) =>
          user.uid === followedUid ? { ...user, following: "N" } : user
        )
      );
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ margin: 5 }}
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : (
        <Animated.FlatList
          data={followersList}
          keyExtractor={(item) => item.uid}
          style={[styles.flatList, { opacity: fadeAnim }]}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              onPressFollow={followUser}
              onUnfollow={unfollowUser}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    flex: 1,
  },
});
