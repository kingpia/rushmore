import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Searchbar, Button, ActivityIndicator } from "react-native-paper"; // Import ActivityIndicator from react-native-paper
import { UserService } from "../service/UserService";
import SocialUserCard from "../components/SocialUserCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";

const userService = new UserService(); // Instantiate UserService

type AddFriendScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};
export const AddFriendsScreen = ({ navigation }: AddFriendScreenProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SocialUser[]>([]); // Assuming the shape of your user data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  const searchbarRef = useRef<any>(null); // Ref to Searchbar component

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true when API call begins
      try {
        if (searchText.trim() !== "") {
          console.log("searching:" + searchText);
          const results = await userService.getUsersByNickName(searchText);
          console.log("Results:" + JSON.stringify(results));
          setSearchResults(results);
        } else {
          setSearchResults([]); // Clear search results if search text is empty
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false when API call finishes
      }
    };

    const debounceTimer = setTimeout(fetchUsers, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchText]);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const clearSearchText = () => {
    setSearchText("");
    Keyboard.dismiss(); // Hide the keyboard
  };

  const followUser = async (followedUid: string) => {
    try {
      console.log("FollowUser - followedUid:" + followedUid);
      const updatedUser = await userService.followUser(followedUid);
      // Update the user's following status in searchResults
      setSearchResults((prevResults) =>
        prevResults.map((user) =>
          user.uid === followedUid ? { ...user, following: "Y" } : user
        )
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async (followedUid: string) => {
    console.log("unFollowerUser - followedUid:" + followedUid);

    try {
      const updatedUser = await userService.unfollowUser(followedUid);
      // Update the user's following status in searchResults
      setSearchResults((prevResults) =>
        prevResults.map((user) =>
          user.uid === followedUid ? { ...user, following: "N" } : user
        )
      );
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };
  const navigateToUserProfileScreen = (user: SocialUser) => {
    console.log("navigateToUserProfileScreen");
    setSearchText("");

    navigation.push("UserProfileScreen", {
      user,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbarContainer}>
        <Searchbar
          ref={searchbarRef}
          placeholder="Search by name"
          onChangeText={handleSearchChange}
          value={searchText}
          style={styles.searchbar}
        />
        {searchText ? (
          <Button onPress={clearSearchText} style={styles.cancelButton}>
            Cancel
          </Button>
        ) : null}
      </View>

      {/* Display ActivityIndicator from react-native-paper when loading is true */}
      <ActivityIndicator
        animating={loading}
        color="#0000ff" // Set your desired color
        size="large" // Set the size of the indicator
        hidesWhenStopped={true} // Hide the indicator when not animating
        style={styles.activityIndicator}
      />

      <View style={styles.flatListContainer}>
        {/* Render user cards */}
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToUserProfileScreen(item)}>
              <SocialUserCard
                user={item}
                onPressFollow={followUser}
                onUnfollow={unfollowUser}
              />
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled" // Handle taps even when the keyboard is displayed
          style={styles.flatList} // Add any additional styles if needed
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbarContainer: {
    flexDirection: "row", // Ensure Searchbar and Cancel button stay on the same row
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  searchbar: {
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    marginLeft: 8,
  },
  activityIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%", // Place the indicator at the vertical center of the screen
  },
  flatListContainer: {
    flex: 1,
  },
  flatList: {
    flex: 1, // Ensure FlatList takes up remaining space
  },
});

export default AddFriendsScreen;
