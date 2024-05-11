import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Searchbar, Button, ActivityIndicator, Text } from "react-native-paper"; // Import ActivityIndicator from react-native-paper
import { UserService } from "../service/UserService";
import SocialUserCard from "../components/SocialUserCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AppStackParamList,
  StackContainerScreenProps,
} from "../nav/params/AppStackParamList";
import { UserRushmore } from "../model/UserRushmore";

const userService = new UserService(); // Instantiate UserService

type AddRushmoreItemsScreenProps =
  StackContainerScreenProps<"AddRushmoreItemsScreen">;

export const AddRushmoreItemsScreen = ({
  navigation,
  route,
}: AddRushmoreItemsScreenProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<String[]>([]); // Assuming the shape of your user data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [userRushmore, setUserRushmore] = useState<UserRushmore>();
  const searchbarRef = useRef<any>(null); // Ref to Searchbar component

  //WHen I first show up here, I want to do a big search only once when the component is rendered
  //Then we can run useEffect only when searchText changes.
  useEffect(() => {
    console.log("Should run only once when component mounts");
    setUserRushmore(route.params.userRushmore);
  }, []);

  useEffect(() => {
    if (searchText.trim() !== "") {
      // Check if searchText is not empty
      console.log(
        "I dont want this runnning until searchText is changed.  So I don't want this running on component render."
      );

      const fetchItems = async () => {
        console.log("fetch a few items here.");

        //TODO: Fetch about 25 items limit to get them started.
        //TODO this is where it gets tricky.
      };

      const debounceTimer = setTimeout(fetchItems, 1000);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [searchText]);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const clearSearchText = () => {
    setSearchText("");
    Keyboard.dismiss(); // Hide the keyboard
  };

  const goBackToEditRushmoreScreen = () => {
    console.log("Save the items for the rushmore before going back.");
    if (userRushmore) {
      // Generate a unique number for testing purposes
      const uniqueNumber = Math.floor(Math.random() * 1000);

      // Generate a random rank between 1 and 100
      const randomRank = Math.floor(Math.random() * 100) + 1;

      const updatedUserRushmore = {
        ...userRushmore,
        itemList: [
          ...userRushmore.itemList,
          {
            item: `TestItem${uniqueNumber}FromSelectionScreen`,
            rank: randomRank,
          },
        ],
      };
      navigation.navigate("EditUserRushmoreScreen", {
        userRushmore: updatedUserRushmore,
        selectedItemUserRushmore: updatedUserRushmore,
      });
    } else {
      console.error("userRushmore is null");
    }
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
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyboardShouldPersistTaps="handled" // Handle taps even when the keyboard is displayed
          style={styles.flatList} // Add any additional styles if needed
        />
      </View>
      <Button onPress={goBackToEditRushmoreScreen}>Select Items</Button>
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

export default AddRushmoreItemsScreen;
