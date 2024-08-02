import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Text,
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

      <ActivityIndicator
        animating={loading}
        color="#0000ff"
        size="large"
        hidesWhenStopped={true}
        style={styles.activityIndicator}
      />

      <View style={styles.flatListContainer}>
        {searchResults.length === 0 && !loading ? (
          <Text style={styles.emptyMessage}>No users found</Text>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToUserProfileScreen(item)}
              >
                <SocialUserCard
                  user={item}
                  onPressFollow={followUser}
                  onUnfollow={unfollowUser}
                />
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
            style={styles.flatList}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbarContainer: {
    flexDirection: "row",
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
    top: "50%",
  },
  flatListContainer: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default AddFriendsScreen;
