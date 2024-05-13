import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableOpacity,
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

const userService = new UserService(); // Instantiate UserService

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

  const [selectedItems, setSelectedItems] = useState<RushmoreItem[]>([]);
  // Define a state to hold the checked state for each item
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService

  //WHen I first show up here, I want to do a big search only once when the component is rendered
  //Then we can run useEffect only when searchText changes.
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
      console.log("newItems lenth:" + newItems.length);
      setSearchResults((prevItems) => [...prevItems, ...newItems]);
      setFrom((prevFrom) => prevFrom + 12); // Increase `from` by 12 for the next fetch
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update the renderItem function to use the checkedItems state
  const renderItem = ({ item }: { item: RushmoreItem }) => (
    <TouchableOpacity
      onPress={() => console.log("Pressed")}
      activeOpacity={0.1}
    >
      <View
        style={styles.itemContainer}
        onTouchEnd={() => {
          // Toggle the checked state for the clicked item
          setCheckedItems((prevState) => ({
            ...prevState,
            [item.primary]: !prevState[item.primary],
          }));
        }}
      >
        <Text style={styles.primaryText}>{item.primary}</Text>
        <View>
          <Checkbox
            status={checkedItems[item.primary] ? "checked" : "unchecked"}
            onPress={() => {
              // Toggle the checked state for the clicked item
              setCheckedItems((prevState) => ({
                ...prevState,
                [item.primary]: !prevState[item.primary],
              }));
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleEndReached = () => {
    console.log("handleEndReached()");
    if (!loading) {
      if (!noMoreItems) {
        fetchRushmoreItems();
      } else {
        console.log("there are no more items do not fetch again");
      }
    }
  };

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

      <List.Accordion
        title="Selected Items"
        left={(props) => <List.Icon {...props} icon="star" />}
      >
        {Object.entries(checkedItems).map(([key, isChecked]) => {
          if (isChecked) {
            return (
              <List.Item
                key={key}
                title={key}
                right={(props) => (
                  <TouchableOpacity
                    onPress={() => {
                      const updatedCheckedItems = { ...checkedItems };
                      updatedCheckedItems[key] = false;
                      setCheckedItems(updatedCheckedItems);
                    }}
                  >
                    <List.Icon {...props} icon="trash-can-outline" />
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
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.primary}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading ? <ActivityIndicator animating /> : null}
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
});

export default AddRushmoreItemsScreen;
