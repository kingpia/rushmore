import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
  FlatList,
} from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  FAB,
  IconButton,
  List,
  Menu,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import UserRushmoreSettingsColumn from "../components/UserRushmoreSettingsColumn";

const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { RushmoreService } from "../service/RushmoreService";
import {
  RushmoreGameTypeEnums,
  RushmoreType,
  RushmoreVisibilityEnums,
  UserRushmore,
} from "../model/UserRushmore";
import { UserRushmoreItem } from "../model/UserRushmoreItem";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import UserRushmoreStatsColumn from "../components/UserRushmoreStatsColumn";

type EditUserRushmoreScreenProps =
  StackContainerScreenProps<"EditUserRushmoreScreen">;

export const EditUserRushmoreScreen = ({
  route,
  navigation,
}: EditUserRushmoreScreenProps) => {
  const [userRushmore, setUserRushmore] = useState<UserRushmore | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [draggableData, setDraggableData] = useState<UserRushmoreItem[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addItemText, setAddItemText] = useState("");
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const showDeleteDialog = () => setIsDeleteDialogVisible(true);
  const hideDeleteDialog = () => setIsDeleteDialogVisible(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [settingsAccordionExpanded, setSettingsAccordionExpanded] =
    React.useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const [
    isPublishUserRushmoreModalVisible,
    setIsPublishUserRushmoreModalVisible,
  ] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const showEditModal = () => setIsEditModalVisible(true);
  const hideEditModal = () => setIsEditModalVisible(false);

  const hideAddItemModal = () => {
    setAddItemText("");
    setIsAddItemModalVisible(false);
  };

  const [userRushmoreVisibility, setUserRushmoreVisibility] =
    useState<RushmoreVisibilityEnums>(RushmoreVisibilityEnums.PUBLIC);
  const [userRushmoreType, setUserRushmoreType] = useState<RushmoreType>(
    RushmoreType.Favorite
  );
  const [userRushmoreGameType, setUserRushmoreGameType] =
    useState<RushmoreGameTypeEnums>(RushmoreGameTypeEnums.GAME);

  // Inside ProfileHomeScreen component
  useFocusEffect(
    React.useCallback(() => {
      console.log("EdiUserRushmore Use Effect Focus Running...");
      const fetchUserRushmore = async () => {
        try {
          if (route.params.selectedItemUserRushmore) {
            console.log(
              "=====================SelectedItemsUserRushmore Found ======================="
            );
            //will have selected items.
            setUserRushmore(route.params.selectedItemUserRushmore);

            //Save the selected items in the rushmore. No need to wait since we have the object already.
            rushmoreService.editUserRushmore(
              route.params.selectedItemUserRushmore
            );

            console.log(
              "I set userrushmore with:" +
                JSON.stringify(route.params.selectedItemUserRushmore)
            );
            console.log(
              "UserRushmore in the useFocusEffect:" +
                JSON.stringify(userRushmore)
            );
            configureDraggables();
          } else if (route.params.userRushmore) {
            console.log(
              "=====================SelectedItemsUserRushmore NOT FOUND ======================="
            );

            //Get the User Rushmore
            const userRushmoreData = await rushmoreService.getUserRushmore(
              route.params?.userRushmore.urId
            );
            console.log(
              "User Rushomre data returned:" + JSON.stringify(userRushmoreData)
            );
            setUserRushmore(userRushmoreData);
            setUserRushmoreVisibility(userRushmoreData.visibility);
            setUserRushmoreType(userRushmoreData.rushmoreType);
            setUserRushmoreGameType(userRushmoreData.gameType);

            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user rushmore:", error);
          setLoading(false);
        }
      };

      console.log(
        JSON.stringify(
          "=====================Route Parameters::========" +
            JSON.stringify(route.params)
        )
      );

      fetchUserRushmore();
    }, [route.params.userRushmore?.itemList])
  );

  const navigateToAddItemsScreen = () => {
    //Go to the addItemsScreen(draggableData) send the data so you can have it checked already
    if (userRushmore) {
      // Navigate only if userRushmore is not null
      navigation.navigate("AddRushmoreItemsScreen", {
        userRushmore: userRushmore,
      });
    } else {
      // Handle the case where userRushmore is null
      console.error("userRushmore is null");
      // Optionally, you can provide a fallback or handle this case differently
    }
  };

  //When the userRushmore Changes, configureDraggables again
  useEffect(() => {
    configureDraggables();
  }, [userRushmore]);

  const configureDraggables = () => {
    console.log(
      "UserRushmore in the configureDraggables:" + JSON.stringify(userRushmore)
    );

    console.log("===Configure Draggables");
    if (userRushmore?.itemList && userRushmore?.itemList.length > 0) {
      console.log(
        "I have items in the itemList itemlist size:" +
          userRushmore?.itemList.length
      );
      const sortedItems = userRushmore.itemList.sort((a, b) => a.rank - b.rank);
      console.log("Sorted items size:" + sortedItems.length);
      setDraggableData(sortedItems);
    } else {
      console.log("Item list is null");
      setDraggableData([]);
    }
    setIsEditMode(!userRushmore?.completedDt);
  };

  const handleExitPress = async () => {
    console.log("Saving user rushmore:", userRushmore);

    if (userRushmore) {
      console.log("saving the user rushmore:" + JSON.stringify(userRushmore));
      await rushmoreService.editUserRushmore(userRushmore);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "RushmoreTabContainer" }],
    });
  };

  const handleVisibilityToggle = () => {
    setUserRushmoreVisibility((prevVisibility) => {
      const newVisibility =
        prevVisibility === RushmoreVisibilityEnums.PUBLIC
          ? RushmoreVisibilityEnums.PRIVATE
          : RushmoreVisibilityEnums.PUBLIC;

      if (userRushmore) {
        console.log("Setting the User Rushmore Visibility");
        userRushmore.visibility = newVisibility;
        console.log("UserRushmore: " + JSON.stringify(userRushmore));
        // Call a function to save userRushmore or perform any other actions
        // saveUserRushmore();
      }

      return newVisibility;
    });
  };

  const handleGameTypeToggle = () => {
    setUserRushmoreGameType((prevGameType) => {
      const newGameType =
        prevGameType === RushmoreGameTypeEnums.GAME
          ? RushmoreGameTypeEnums.OPEN
          : RushmoreGameTypeEnums.GAME;

      if (userRushmore) {
        console.log("Setting the User Rushmore Game Type");
        userRushmore.gameType = newGameType;
        console.log("UserRushmore: " + JSON.stringify(userRushmore));
        // Call a function to save userRushmore or perform any other actions
        // saveUserRushmore();
      }

      return newGameType;
    });
  };

  const handleRushmoreTypeToggle = () => {
    setUserRushmoreType((prevRushmoreType) => {
      const newRushmoreType =
        prevRushmoreType === RushmoreType.Favorite
          ? RushmoreType.Best
          : RushmoreType.Favorite;

      if (userRushmore) {
        console.log("Setting the User Rushmore Type");
        userRushmore.rushmoreType = newRushmoreType;
        console.log("UserRushmore: " + JSON.stringify(userRushmore));
        // Call a function to save userRushmore or perform any other actions
        // saveUserRushmore();
      }

      return newRushmoreType;
    });
  };

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSettingsAccordionExpanded(!settingsAccordionExpanded);
  };

  const saveUserRushmore = async () => {
    console.log("Saving user rushmore:", userRushmore);

    if (userRushmore) {
      console.log("saving the user rushmore:" + JSON.stringify(userRushmore));
      await rushmoreService.editUserRushmore(userRushmore);
    }
    //When we save, update the rushmore, do not go back go home
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleDeleteUserRushmorePress = () => {
    closeMenu();
    showDeleteDialog(); // Show the confirmation dialog
  };

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const renderUserRushmoreItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<UserRushmoreItem>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.draggableItem,
            { backgroundColor: isActive ? "#14f3ff" : "#ffffff" },
          ]}
        >
          <View style={styles.itemContainer}>
            <Text style={styles.rankText}>{item.rank}</Text>
            <Text style={styles.itemText}>{item.item}</Text>
            {isEditMode && (
              <IconButton
                icon="close-circle-outline"
                size={24}
                onPress={() => handleDeletePress(item)}
                style={styles.iconButton}
              />
            )}
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const renderNonDraggableItem = ({ item }: { item: UserRushmoreItem }) => {
    return (
      <List.Item
        titleStyle={{ flexDirection: "row", justifyContent: "space-between" }} // Align title and description horizontally
        title={
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ marginLeft: 5, marginRight: 15 }}>{item.rank}</Text>

            <Text>{item.item}</Text>
          </View>
        }
        right={(props) =>
          isEditMode && (
            <IconButton
              {...props}
              icon="delete"
              onPress={() => handleDeletePress(item)}
            />
          )
        }
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: "#ccc",
        }}
      />
    );
  };

  const handleDeletePress = (userRushmoreItem: UserRushmoreItem) => {
    console.log("Current itemList:", JSON.stringify(userRushmore?.itemList));
    console.log("Deleting item:", JSON.stringify(userRushmoreItem));

    const index = userRushmore?.itemList.findIndex(
      (item) => item.item === userRushmoreItem.item
    );

    if (index !== undefined && index !== -1) {
      console.log("index found:");

      const updatedItemList = [...(userRushmore?.itemList || [])];
      updatedItemList.splice(index, 1);

      // Animate the deletion
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      // Update the rank of remaining items
      updatedItemList.forEach((item, idx) => {
        item.rank = idx + 1;
      });

      setUserRushmore((prevUserRushmore) => ({
        ...prevUserRushmore!,
        itemList: updatedItemList,
      }));
    } else {
      console.log("Why wasn't this item found if it's displayed");
      console.warn(
        `Item with urId ${userRushmoreItem.item} not found in the itemList array.`
      );
    }
  };

  const handleDragEnd = ({ data }: { data: UserRushmoreItem[] }) => {
    const updatedItems = data.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    setDraggableData(updatedItems);

    // Update the userRushmore.itemList
    if (userRushmore) {
      const updatedUserRushmore = {
        ...userRushmore,
        itemList: updatedItems,
      };

      setUserRushmore(updatedUserRushmore);
    }

    console.log("DragEnd:" + JSON.stringify(updatedItems));
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      console.log("Saving changes and exiting edit mode");
      saveUserRushmore();
      setIsEditMode(false);
    } else {
      console.log("Entering edit mode");
      setIsEditMode(true);
    }
  };

  const canEdit = () => {
    if (userRushmore?.completedDt) {
      const completedDate = new Date(userRushmore.completedDt);
      console.log("Completed date:", completedDate);
      const currentDate = new Date();
      console.log("Current date:", currentDate);
      const daysRemaining = Math.floor(
        (currentDate.getTime() - completedDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      console.log("Days remaining:", daysRemaining);
      if (daysRemaining < 30) {
        return false;
      }
    }

    return true;
  };

  const handleAddItem = () => {
    // Check if the text input is not empty
    if (addItemText.trim() !== "") {
      // Create a new UserRushmoreItem with the entered text
      const newItem: UserRushmoreItem = {
        item: addItemText.trim(),
        rank: draggableData.length + 1, // Set rank as the next available position
      };

      // Update the state with the new draggable data
      setDraggableData((prevData) => [...prevData, newItem]);

      // Clear the text input
      setAddItemText("");
    }

    // Close the modal
    hideAddItemModal();
  };

  const publishUserRushmore = async () => {
    console.log("PublishUserRushmore");
    // Add logic to publish user rushmore

    if (userRushmore) {
      console.log("Calling publish userRushmore");
      let response: UserRushmore = await rushmoreService.publishUserRushmore(
        userRushmore
      );
      console.log("Done alling publish userRushmore");
      setIsPublishUserRushmoreModalVisible(false); // Close the modal after publishing

      console.log("Setting UserRushmore:" + JSON.stringify(response));
      setUserRushmore(response);
      setIsEditMode(false);
    }
  };

  const confirmDeleteUserRushmore = async () => {
    try {
      if (userRushmore) {
        console.log("Deleting UserRushmore:", userRushmore);
        //await rushmoreService.deleteUserRushmore(userRushmore.urId);
        //navigation.goBack(); // Navigate back to the previous screen
      } else {
        console.log("UserRushmore is null, nothing to delete.");
      }
    } catch (error) {
      console.error("Error deleting UserRushmore:", error);
    } finally {
      hideDeleteDialog(); // Hide the confirmation dialog
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Appbar.Header statusBarHeight={0}>
              <Appbar.Content
                title={`${userRushmore?.rushmoreType || ""} ${
                  userRushmore?.rushmore?.title || ""
                }`.trim()}
              />
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <IconButton icon="dots-vertical" onPress={handleMenuPress} />
                }
              >
                <Menu.Item
                  onPress={handleDeleteUserRushmorePress}
                  title="Delete Rushmore"
                />
              </Menu>
            </Appbar.Header>
            <List.Accordion
              title="Rushmore Settings"
              expanded={settingsAccordionExpanded}
              onPress={toggleAccordion}
              left={(props) => <List.Icon {...props} icon="cog" />}
            >
              <TouchableOpacity
                onPress={handleVisibilityToggle}
                disabled={!isEditMode}
              >
                <List.Item
                  title="Visibility"
                  description={userRushmoreVisibility}
                  titleStyle={styles.listItemTitle}
                  descriptionStyle={styles.listItemDescription}
                  style={styles.listItem}
                  left={() => (
                    <IconButton
                      icon={
                        userRushmoreVisibility ===
                        RushmoreVisibilityEnums.PUBLIC
                          ? "eye"
                          : "eye-off"
                      }
                      disabled={!isEditMode}
                    />
                  )}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRushmoreTypeToggle}
                disabled={!isEditMode}
              >
                <List.Item
                  title="Rushmore Type"
                  description={userRushmoreType}
                  titleStyle={styles.listItemTitle}
                  descriptionStyle={styles.listItemDescription}
                  style={styles.listItem}
                  left={() => (
                    <IconButton
                      icon={
                        userRushmoreType === RushmoreType.Favorite
                          ? "heart"
                          : "trophy"
                      }
                      disabled={!isEditMode}
                    />
                  )}
                />
              </TouchableOpacity>
              {userRushmore?.visibility != RushmoreVisibilityEnums.PRIVATE && (
                <TouchableOpacity
                  onPress={handleGameTypeToggle}
                  disabled={!isEditMode}
                >
                  <List.Item
                    title="Game Type"
                    description={userRushmoreGameType}
                    titleStyle={styles.listItemTitle}
                    descriptionStyle={styles.listItemDescription}
                    style={styles.listItem}
                    left={() => (
                      <IconButton
                        icon={
                          userRushmoreGameType === RushmoreGameTypeEnums.GAME
                            ? "gamepad-variant"
                            : "earth"
                        }
                        disabled={!isEditMode}
                      />
                    )}
                  />
                </TouchableOpacity>
              )}
            </List.Accordion>

            {loading ? (
              <ActivityIndicator style={styles.loadingIndicator} />
            ) : userRushmore ? (
              <View style={styles.listContainer}>
                {isEditMode ? (
                  <DraggableFlatList
                    data={draggableData}
                    renderItem={renderUserRushmoreItem}
                    keyExtractor={(item) => item.item}
                    onDragEnd={(result) => handleDragEnd(result)}
                    contentContainerStyle={styles.listContentContainer}
                  />
                ) : (
                  <FlatList
                    data={draggableData}
                    renderItem={renderNonDraggableItem}
                    keyExtractor={(item) => item.item}
                    contentContainerStyle={styles.listContentContainer}
                  />
                )}
              </View>
            ) : (
              <Text>No Rushmore data available</Text>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleExitPress}>
              <IconButton icon="exit-to-app" size={30} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {userRushmore?.completedDt === null && isEditMode && (
                <Button
                  onPress={() => setIsPublishUserRushmoreModalVisible(true)}
                  disabled={
                    !userRushmore ||
                    !userRushmore.itemList ||
                    userRushmore.itemList.length === 0 ||
                    !isEditMode
                  }
                >
                  Publish
                </Button>
              )}
            </View>
            <TouchableOpacity
              onPress={() => (canEdit() ? toggleEditMode() : showEditModal())}
            >
              <IconButton icon={isEditMode ? "floppy" : "pencil"} size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.fab}>
            <FAB
              visible={isEditMode}
              icon="plus"
              onPress={navigateToAddItemsScreen}
              style={styles.fab}
            />
          </View>
        </View>
      )}

      <Portal>
        <Modal
          visible={isPublishUserRushmoreModalVisible}
          onDismiss={() => setIsPublishUserRushmoreModalVisible(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {userRushmore?.rushmoreType} {userRushmore?.rushmore?.title}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Visibility:</Text>
            <Text style={styles.detail}>{userRushmore?.visibility}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.detail}>{userRushmore?.gameType}</Text>
          </View>
          {isPublishing ? (
            <ActivityIndicator style={{ marginVertical: 10 }} />
          ) : (
            <Button
              mode="contained"
              onPress={publishUserRushmore}
              style={{ marginVertical: 10 }}
            >
              Publish
            </Button>
          )}
          <Button onPress={() => setIsPublishUserRushmoreModalVisible(false)}>
            Cancel
          </Button>
        </Modal>
      </Portal>

      <Portal>
        <Dialog visible={isDeleteDialogVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure? Consider editing, as an edit increments the version.
              {"\n\n"}
              With edit, you can still have visibility to previous versions.
              {"\n\n"}
              Choose Wisely.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDeleteDialog}>Cancel</Button>
            <Button onPress={confirmDeleteUserRushmore}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 10,
  },
  draggableItem: {
    paddingHorizontal: 50,
    borderRadius: 10,
    margin: 2,
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
  },
  listItem: {
    paddingVertical: 0, // Adjust the vertical padding as needed
  },
  listItemTitle: {
    fontSize: 14, // Adjust the font size as needed
  },
  listItemDescription: {
    fontSize: 12, // Adjust the font size as needed
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    flex: 1, // Let the item text take up remaining space
    // Add any styles needed for item text
  },
  rankText: {
    // Add any styles needed for rank text
    marginRight: 15,
  },
  iconButton: {
    // Add any styles needed for the icon button
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  detail: {
    flex: 1,
  },
});
