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
  Button,
  Dialog,
  IconButton,
  List,
  Menu,
  Modal,
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
import EditUserRushmoreScreenBottom from "../components/EditUserRushmoreScreenBottom";
import NonDraggableRushmoreItem from "../components/screens/NonDraggableRushmoreItem";

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
              "User Rushomre data returned:" +
                JSON.stringify(userRushmoreData, null, 2)
            );
            setUserRushmore(userRushmoreData.userRushmore);

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
  };

  const handleExitPress = async () => {
    console.log("Saving user rushmore:", userRushmore);

    if (userRushmore) {
      if (userRushmore.completedDt) {
        console.log("do nothing, we don't need to save here");
      } else {
        console.log("saving the user rushmore:" + JSON.stringify(userRushmore));
        await rushmoreService.editUserRushmore(userRushmore);
      }
    }
    navigation.goBack();
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
    //New UserRushmore should be Created.
    //Use the returned UserRushmore to set the userRushmore object, this would have a null completedDt
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
        isEditMode={!userRushmore?.completedDt}
        handleDeletePress={handleDeletePress}
      />
    );
  };

  const renderNonDraggableItem = ({ item }: { item: UserRushmoreItem }) => {
    return (
      <NonDraggableRushmoreItem
        item={item}
        isEditMode={!userRushmore?.completedDt}
        handleDeletePress={handleDeletePress}
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

    try {
      if (userRushmore) {
        console.log("Calling increment user rushmoreEEEEEEEEE");
        hideEditDialog();

        let incrementedUserRushmore =
          await rushmoreService.incrementAndEditUserRushmore(userRushmore);

        console.log(
          "Got back edited user rushmore:" +
            JSON.stringify(incrementedUserRushmore, null, 2)
        );

        // Ensure completedDt is null after incrementing
        // incrementedUserRushmore.completedDt = null;
        console.log("Setting user Rushmore");
        setUserRushmore(incrementedUserRushmore);
      } else {
        console.log("UserRushmore is null");
      }

      console.log("hiding dialog");
    } catch (error) {
      console.error("Error in confirmEditUserRushmore:", error);
      showModal(error.message); // Display the error message in a modal
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const showModal = (message: string) => {
    // Implement your modal display logic here
    // This is a placeholder example
    setModalVisible(true);
    setModalMessage(message);
  };

  const navigateToUserRushmoreLeaderboard = () => {
    console.log("navigateToUserRushmoreLeaderboard");
    if (userRushmore) {
      navigation.navigate("UserRushmoreLeaderboard", {
        userRushmore: userRushmore,
      });
    }
  };
  const navigateToUserRushmoreLikeListScreen = () => {
    console.log("navigateToUserRushmoreLikeListScreen");
    if (userRushmore) {
      navigation.navigate("UserRushmoreLikeListScreen", {
        userRushmore: userRushmore,
      });
    }
  };

  const navigateToUserRushmoreVersionScreen = () => {
    console.log("navigateToUserRushmoreVersionScreen");

    if (userRushmore) {
      navigation.navigate("UserRushmoreVersionScreen", {
        userRushmore: userRushmore,
      });
    }
  };

  const navigateToUserRushmoreCompletedListScreen = () => {
    console.log("navigateToUserRushmoreCompltedListScreen");
    if (userRushmore) {
      navigation.navigate("UserRushmoreCompletedListScreen", {
        userRushmore: userRushmore,
      });
    }
  };

  const navigateToUserProfileScreen = (user: SocialUser | undefined) => {
    if (user) {
      navigation.navigate("UserProfileScreen", { user });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <EditUserRushmoreAppBar
              displayVersion={userRushmore?.displayVersion || ""}
              userRushmore={userRushmore || undefined} // Ensure userRushmore is not null
              menuVisible={menuVisible}
              closeMenu={closeMenu}
              handleMenuPress={handleMenuPress}
              handleDeleteUserRushmorePress={handleDeleteUserRushmorePress}
              handleEditPress={handleEditPress}
              isEditMode={!userRushmore?.completedDt}
            />

            {loading ? (
              <ActivityIndicator style={styles.loadingIndicator} />
            ) : userRushmore ? (
              <View style={styles.listContainer}>
                {draggableData.length === 0 ? (
                  <Text style={styles.emptyMessage}>
                    Click + button below to add items
                  </Text>
                ) : !userRushmore?.completedDt ? (
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

            {userRushmore?.completedDt && (
              <View style={styles.statsColumn}>
                <UserRushmoreStatsColumn
                  likeCount={userRushmore.likeCount}
                  totalCompleted={userRushmore.completedCount}
                  highScoreUser={undefined}
                  firstToCompleteUser={userRushmore.firstCompletedUser}
                  displayVersion={userRushmore?.displayVersion || ""}
                  handleLeaderboardClick={navigateToUserRushmoreLeaderboard}
                  handleLikeClick={navigateToUserRushmoreLikeListScreen}
                  handleRushmoreVersionClick={
                    navigateToUserRushmoreVersionScreen
                  }
                  handleCompletedClick={
                    navigateToUserRushmoreCompletedListScreen
                  }
                  handleProfileClick={navigateToUserProfileScreen}
                  liked={false}
                />
              </View>
            )}
          </View>

          <EditUserRushmoreScreenBottom
            handleExitPress={handleExitPress}
            handleEditPress={handleEditPress}
            navigateToSettingsScreen={navigateToSettingsScreen}
            navigateToAddItemsScreen={navigateToAddItemsScreen}
            userRushmore={userRushmore}
            isEditMode={!userRushmore?.completedDt}
          />
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

      <Portal>
        <Dialog visible={modalVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Title>Draft Exists</Dialog.Title>
          <Dialog.Content>
            <Text>{modalMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(false)}>Close</Button>
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
