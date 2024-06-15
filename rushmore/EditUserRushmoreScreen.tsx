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
  Avatar,
  Button,
  Dialog,
  IconButton,
  List,
  Menu,
  Portal,
  Text,
} from "react-native-paper";
import DraggableRushmoreItem from "../components/DraggableRushmoreItem"; // Import the new component

import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { RushmoreService } from "../service/RushmoreService";
import { UserRushmore } from "../model/UserRushmore";
import { UserRushmoreItem } from "../model/UserRushmoreItem";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import UserRushmoreStatsColumn from "../components/UserRushmoreStatsColumn";
import EditUserRushmoreAppBar from "../components/EditUserRushmoreAppBar";

type EditUserRushmoreScreenProps =
  StackContainerScreenProps<"EditUserRushmoreScreen">;

const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  const showEditDialog = () => setIsEditDialogVisible(true);

  const hideDeleteDialog = () => setIsDeleteDialogVisible(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const hideEditDialog = () => setIsEditDialogVisible(false);

  const [settingsAccordionExpanded, setSettingsAccordionExpanded] =
    React.useState(true);
  const showEditModal = () => setIsEditModalVisible(true);
  const hideEditModal = () => setIsEditModalVisible(false);

  const hideAddItemModal = () => {
    setAddItemText("");
    setIsAddItemModalVisible(false);
  };

  // Inside ProfileHomeScreen component
  useFocusEffect(
    React.useCallback(() => {
      console.log("EdiUserRushmore Use Effect Focus Running...");

      const fetchUserRushmore = async () => {
        try {
          /*
           *TODO Bug here if coming back from settings screen.  It's using the old selected Item list even after we deleted things then hit publish.
           */

          if (route.params.selectedItemUserRushmore) {
            console.log(
              "=====================SelectedItemsUserRushmore Found ======================="
            );
            //will have selected items.
            setUserRushmore(route.params.selectedItemUserRushmore);

            //Save the selected items in the rushmore. No need to wait since we have the object already.
            await rushmoreService.editUserRushmore(
              route.params.selectedItemUserRushmore
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

            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user rushmore:", error);
          setLoading(false);
        }
      };

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

  const saveUserRushmore = async () => {
    console.log("Saving user rushmore:", userRushmore);

    if (userRushmore) {
      console.log("saving the user rushmore:" + JSON.stringify(userRushmore));
      let savedRushmore: UserRushmore = await rushmoreService.editUserRushmore(
        userRushmore
      );
      setUserRushmore(savedRushmore);
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

  const handleEditPress = () => {
    closeMenu();
    showEditDialog(); // Show the confirmation dialog
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
      <DraggableRushmoreItem
        item={item}
        drag={drag}
        isActive={isActive}
        isEditMode={isEditMode}
        handleDeletePress={handleDeletePress}
      />
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
  };

  const navigateToSettingsScreen = async () => {
    console.log("navigateToSettingsScreen");
    await saveUserRushmore();

    if (userRushmore) {
      console.log("The params are:" + JSON.stringify(route.params));

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "RushmoreSettingsScreen",
            params: { userRushmore: userRushmore },
          },
        ],
      });
    } else {
      console.log("userRushmore or itemList is undefined");
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

  const confirmEditUserRushmore = async () => {
    console.log("Confirm Edit");

    //TODO: Need to create a new UserRushmore with the Current Rushmore Items. Don't mess with the old one yet though
    //Leave it with LATEST until this one is published.

    //When you save the rushmore, the completedD should be null, which should set everythign into edit mod
    //Should we have an edit mode if we are drivinve everything off completdDt???
    setIsEditMode(true);
    hideEditDialog();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <EditUserRushmoreAppBar
              version={userRushmore?.version || ""}
              userRushmore={userRushmore || undefined} // Ensure userRushmore is not null
              menuVisible={menuVisible}
              closeMenu={closeMenu}
              handleMenuPress={handleMenuPress}
              handleDeleteUserRushmorePress={handleDeleteUserRushmorePress}
              handleEditPress={handleEditPress}
              isEditMode={isEditMode}
            />

            {loading ? (
              <ActivityIndicator style={styles.loadingIndicator} />
            ) : userRushmore ? (
              <View style={styles.listContainer}>
                {draggableData.length === 0 ? (
                  <Text style={styles.emptyMessage}>
                    Click + button below to add items
                  </Text>
                ) : isEditMode ? (
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

            {userRushmore?.completedDt && !isEditMode && (
              <View style={styles.statsColumn}>
                <UserRushmoreStatsColumn
                  likeCount={0}
                  totalCompleted={0}
                  highScoreUser={undefined}
                  firstToCompleteUser={undefined}
                />
              </View>
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
                  onPress={() => navigateToSettingsScreen()}
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
            {isEditMode && (
              <TouchableOpacity onPress={navigateToAddItemsScreen}>
                <IconButton icon="plus" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <Portal>
        <Dialog visible={isDeleteDialogVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure about that? Consider editing, edits increment the
              version.
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

      <Portal>
        <Dialog visible={isEditDialogVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Title>Confirm Edit</Dialog.Title>
          <Dialog.Content>
            <Text>
              Editing a Rushmore will allow the current version to remain active
              until the new version is published.
              {"\n\n"}
              Once the new version is published, the old version is viewable,
              but cannot be modified.
              {"\n\n"}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideEditDialog}>Cancel</Button>
            <Button onPress={confirmEditUserRushmore}>Edit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  statsColumn: {
    position: "absolute",
    right: 20,
    alignItems: "center",
    bottom: 30,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default EditUserRushmoreScreen;
