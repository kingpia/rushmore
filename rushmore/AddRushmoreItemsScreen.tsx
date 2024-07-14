import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import {
  Searchbar,
  Button,
  ActivityIndicator,
  Text,
  Checkbox,
  List,
} from "react-native-paper"; // Import ActivityIndicator from react-native-paper
import { UserService } from "../service/UserService";
import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { UserRushmore } from "../model/UserRushmore";
import { RushmoreService } from "../service/RushmoreService";
import { RushmoreItem } from "../model/RushmoreItem";
import { UserRushmoreItem } from "../model/UserRushmoreItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const userService = new UserService(); // Instantiate UserService

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AddRushmoreItemsScreenProps =
  StackContainerScreenProps<"AddRushmoreItemsScreen">;

export const AddRushmoreItemsScreen = ({
  navigation,
  route,
}: AddRushmoreItemsScreenProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<RushmoreItem[]>([]); // Assuming the shape of your user data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [userRushmore, setUserRushmore] = useState<UserRushmore>();
  const searchbarRef = useRef<any>(null); // Ref to Searchbar component
  const [from, setFrom] = useState<number>(0);
  const [noMoreItems, setNoMoreItems] = useState(false);
  const [originalRushmoreItems, setOriginalRushmoreItems] = useState<
    RushmoreItem[]
  >([]);

  // Define a state to hold the checked state for each item
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [selectedAccordionExpanded, setSelectedAccordionExpanded] =
    React.useState(false);

  const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService

  // When I first show up here, I want to do a big search only once when the component is rendered
  // Then we can run useEffect only when searchText changes.
  useEffect(() => {
    setUserRushmore(route.params.userRushmore);
    // Populate checkedItems with items from userRushmore
    if (route.params.userRushmore) {
      const initialCheckedItems: { [key: string]: boolean } = {};
      route.params.userRushmore.itemList.forEach(
        (item) => (initialCheckedItems[item.item] = true)
      );
      setCheckedItems(initialCheckedItems);
    }

    fetchRushmoreItems();
  }, []);

  useEffect(() => {
    if (searchText.trim() !== "") {
      const fetchItems = async () => {
        setLoading(true);
        console.log("fetch a few items here.");
        if (userRushmore) {
          let searchStringResponse =
            await rushmoreService.getRushmoreItemBySearchString(
              userRushmore?.rushmore.rid,
              searchText
            );
          console.log("RESPONSE:", searchStringResponse);
          setSearchResults(searchStringResponse);

          // Update the checked items based on the search results
          if (searchStringResponse && searchStringResponse.length > 0) {
            console.log("We have a response, let's do an update");
            console.log("Current checked items:", checkedItems);
          } else {
            console.log("No items found in the search response.");
          }
          setLoading(false);
        }
      };

      const debounceTimer = setTimeout(fetchItems, 1000);

      return () => {
        clearTimeout(debounceTimer);
      };
    } else {
      console.log("no search string");
      setSearchResults(originalRushmoreItems);
    }
  }, [searchText, userRushmore, checkedItems]);

  const fetchRushmoreItems = async () => {
    console.log("fetchRushmoreItems.  from value:" + from);
    try {
      setLoading(true);
      const newItems = await rushmoreService.getRushmoreItemInitialList(
        route.params.userRushmore.rushmore.rid,
        12,
        from
      );

      if (newItems.length < 12) {
        // Set a flag indicating no more items to fetch
        setNoMoreItems(true);
      }

      // If it's the initial fetch, set originalRushmoreItems to the fetched items
      if (from === 0) {
        setOriginalRushmoreItems(newItems);
      } else {
        // If it's a subsequent fetch, concatenate the new items to originalRushmoreItems
        setOriginalRushmoreItems((prevItems) => [...prevItems, ...newItems]);
      }

      console.log("newItems length:" + newItems.length);
      setSearchResults((prevItems) => [...prevItems, ...newItems]);
      setFrom((prevFrom) => prevFrom + 12); // Increase `from` by 12 for the next fetch
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: RushmoreItem }) => (
    <Checkbox.Item
      label={item.primary}
      status={checkedItems[item.primary] ? "checked" : "unchecked"}
      onPress={() => {
        // Toggle the checked state for the clicked item
        setCheckedItems((prevState) => ({
          ...prevState,
          [item.primary]: !prevState[item.primary],
        }));
      }}
      labelStyle={styles.primaryText} // Apply your primaryText style here
    />
  );

  const handleEndReached = () => {
    console.log("handleEndReached()");
    // Do not fetch more when we are doing searching
    if (!loading && searchText === "") {
      if (!noMoreItems) {
        fetchRushmoreItems();
      } else {
        console.log("there are no more items do not fetch again");
      }
    } else {
      console.log("Search text is null, not fetching on end reach");
    }
  };

  const handleSearchChange = (text: string) => {
    console.log("Setting Search Text");
    setSearchText(text);
  };

  // Modify clearSearchText to revert to original rushmore items
  const clearSearchText = () => {
    setSearchText("");
    setSearchResults(originalRushmoreItems);
    Keyboard.dismiss(); // Hide the keyboard
  };

  const goBackToEditRushmoreScreen = () => {
    if (userRushmore) {
      let rank = 1; // Initialize rank to 1

      // Map the checked items to UserRushmoreItem format
      const updatedItemList: UserRushmoreItem[] = Object.entries(checkedItems)
        .filter(([_, isChecked]) => isChecked)
        .map(([item, _]) => ({ item, rank: rank++ }));

      // Update the itemList of userRushmore with the checked items
      userRushmore.itemList = updatedItemList;

      console.log(
        "navigating back to the EdituserRushmoreScreen with the following Items selected:" +
          JSON.stringify(userRushmore)
      );

      navigation.navigate("EditUserRushmoreScreen", {
        userRushmore: userRushmore,
        selectedItemUserRushmore: userRushmore,
      });
    } else {
      console.error("userRushmore is null");
    }
  };

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedAccordionExpanded(!selectedAccordionExpanded);
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

      {loading && searchText ? (
        <ActivityIndicator animating={true} style={styles.activityIndicator} />
      ) : null}

      <List.Accordion
        title="Selected Items"
        expanded={selectedAccordionExpanded}
        onPress={toggleAccordion}
        left={(props) => <List.Icon {...props} icon="star" />}
      >
        {Object.entries(checkedItems).map(([key, isChecked]) => {
          if (isChecked) {
            return (
              <List.Item
                key={key}
                title={key}
                titleStyle={styles.listItemTitle}
                right={(props) => (
                  <TouchableOpacity
                    onPress={() => {
                      const updatedCheckedItems = { ...checkedItems };
                      updatedCheckedItems[key] = false;
                      setCheckedItems(updatedCheckedItems);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      size={24}
                    />
                  </TouchableOpacity>
                )}
              />
            );
          } else {
            return null;
          }
        })}
      </List.Accordion>

      <View style={styles.flatListContainer}>
        {searchResults.length === 0 && !loading ? (
          <Text style={styles.noResultsText}>No results found</Text>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.primary}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              loading && !searchText ? <ActivityIndicator animating /> : null
            }
          />
        )}
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  primaryText: {
    flex: 1, // Take up remaining space
  },
  listItemTitle: {
    marginLeft: 20, // Add your desired margin here
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default AddRushmoreItemsScreen;
