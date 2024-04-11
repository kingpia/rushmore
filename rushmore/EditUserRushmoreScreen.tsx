import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  IconButton,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import UserRushmoreSettingsColumn from "../components/UserRushmoreSettingsColumn";

const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService

import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { RushmoreService } from "../service/RushmoreService";
import {
  RushmoreGameTypeEnums,
  RushmoreType,
  RushmoreVisibilityEnums,
  UserRushmore,
} from "../model/UserRushmore";
import EditRushmoreAppBar from "../components/header/EditRushmoreAppBar";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isRushmoreComplete, setIsRushmoreComplete] = useState(false);
  const [draggableData, setDraggableData] = useState<UserRushmoreItem[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addItemText, setAddItemText] = useState("");
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const showEditModal = () => setIsEditModalVisible(true);
  const hideEditModal = () => setIsEditModalVisible(false);

  const showAddItemModal = () => setIsAddItemModalVisible(true);
  const hideAddItemModal = () => {
    setAddItemText("");
    setIsAddItemModalVisible(false);
  };

  useEffect(() => {
    const fetchUserRushmore = async () => {
      try {
        const userRushmoreData = await rushmoreService.getUserRushmore(
          route.params.userRushmore.urId,
          "piaUid"
        );
        setUserRushmore(userRushmoreData);

        const sortedItems = userRushmoreData.userRushmoreItemList.sort(
          (a, b) => a.rank - b.rank
        );
        setDraggableData(sortedItems);

        setIsRushmoreComplete(!!userRushmoreData.completedDt);
        setIsEditMode(!userRushmoreData.completedDt);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user rushmore:", error);
        setLoading(false);
      }
    };

    fetchUserRushmore();
  }, [route.params.userRushmore.urId]);

  const handleExitPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "RushmoreTabContainer" }],
    });
  };

  const handleDeletePress = (userRushmoreItem: UserRushmoreItem) => {
    const index = draggableData.findIndex(
      (item) => item.uriId === userRushmoreItem.uriId
    );

    if (index !== -1) {
      const updatedDraggableData = [...draggableData];
      updatedDraggableData.splice(index, 1);
      setDraggableData(updatedDraggableData);
    } else {
      console.warn(
        `Item with urId ${userRushmoreItem.uriId} not found in the data array.`
      );
    }
  };

  const handleVisibilityToggle = () => {
    setUserRushmore((prevUserRushmore) => ({
      ...prevUserRushmore!,
      visibility:
        prevUserRushmore!.visibility === RushmoreVisibilityEnums.PUBLIC
          ? RushmoreVisibilityEnums.PRIVATE
          : RushmoreVisibilityEnums.PUBLIC,
    }));
  };

  const handleGameTypeToggle = () => {
    setUserRushmore((prevUserRushmore) => ({
      ...prevUserRushmore!,
      gameType:
        prevUserRushmore!.gameType === RushmoreGameTypeEnums.GAME
          ? RushmoreGameTypeEnums.OPEN
          : RushmoreGameTypeEnums.GAME,
    }));
  };

  const handleRushmoreTypeToggle = () => {
    setUserRushmore((prevUserRushmore) => ({
      ...prevUserRushmore!,
      rushmoreType:
        prevUserRushmore!.rushmoreType === RushmoreType.Favorite
          ? RushmoreType.Best
          : RushmoreType.Favorite,
    }));
  };

  const saveUserRushmore = () => {
    console.log("Saving user rushmore:", userRushmore);
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
            { backgroundColor: isActive ? "red" : "orange" },
          ]}
        >
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Text style={[styles.text, { flex: 1 }]}>{item.itemTitle}</Text>
            {isEditMode && (
              <IconButton
                icon="delete"
                size={30}
                onPress={() => handleDeletePress(item)}
              />
            )}
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const handleDragEnd = ({ data }: { data: UserRushmoreItem[] }) => {
    const updatedItems = data.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    setDraggableData(updatedItems);
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
        uriId: Math.random(),
        itemTitle: addItemText.trim(),
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <EditRushmoreAppBar
              rushmoreTitle={
                userRushmore?.rushmore?.rushmoreCategory?.toUpperCase() || ""
              }
              rushmoreType={userRushmore?.rushmoreType || ""}
              username={userRushmore?.user.userName || ""}
              completedDt={userRushmore?.completedDt}
            />
            <DraggableFlatList
              data={draggableData}
              onDragEnd={handleDragEnd}
              keyExtractor={(item) => item.uriId.toString()}
              renderItem={renderUserRushmoreItem}
            />
          </View>
          {isRushmoreComplete ? (
            <View style={{ position: "absolute", right: 10, top: 450 }}>
              <UserRushmoreStatsColumn
                likeCount={userRushmore?.likeCount || 0}
                totalCompleted={userRushmore?.completedCount || 0}
                highScoreUser={userRushmore?.highScoreUser}
                firstToCompleteUser={userRushmore?.firstToCompleteUser}
              />
            </View>
          ) : (
            <View style={{ position: "absolute", right: 10, top: 450 }}>
              <UserRushmoreSettingsColumn
                userRushmore={userRushmore!}
                onVisibilityToggle={handleVisibilityToggle}
                onGameTypeToggle={handleGameTypeToggle}
                onRushmoreTypeToggle={handleRushmoreTypeToggle}
              />
            </View>
          )}
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
              <TouchableOpacity onPress={showModal}>
                <IconButton icon="star" size={30} disabled={!isEditMode} />
              </TouchableOpacity>
              <TouchableOpacity onPress={showAddItemModal}>
                <IconButton icon="plus" size={30} disabled={!isEditMode} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => (canEdit() ? toggleEditMode() : showEditModal())}
            >
              <IconButton icon={isEditMode ? "floppy" : "pencil"} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Portal>
        <Dialog visible={isModalVisible} onDismiss={hideModal}>
          <Dialog.Title>Rushmore Complete?</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.modalText}>
              Confirm the following settings:
            </Text>
            <Text style={styles.modalText}>
              Rushmore Category:{" "}
              {userRushmore?.rushmore?.rushmoreCategory || ""}
            </Text>
            <Text style={styles.modalText}>
              Rushmore Type: {userRushmore?.rushmoreType || ""}
            </Text>
            <Text style={styles.modalText}>
              Visibility: {userRushmore?.visibility || ""}
            </Text>
            <Text style={styles.modalText}>
              Game Type: {userRushmore?.gameType || ""}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Cancel</Button>
            <Button
              onPress={() => {
                hideModal();
                saveUserRushmore();
              }}
            >
              Complete
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={isEditModalVisible} onDismiss={hideEditModal}>
          <Dialog.Title>Cannot Modify Rushmore</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.modalText}>
              Cannot modify Rushmore. A Rushmore must be active for 30 days
              after completion before it can be modified.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideEditModal}>OK</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={isAddItemModalVisible} onDismiss={hideAddItemModal}>
          <Dialog.Title>Add Item to Rushmore</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Item Title"
              value={addItemText}
              onChangeText={(text) => setAddItemText(text)}
              maxLength={100}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideAddItemModal}>Cancel</Button>
            <Button onPress={handleAddItem}>Add Item</Button>
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
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 50,
    borderColor: "blue",
    borderRadius: 5,
    margin: 2,
  },
  text: {
    color: "green",
    fontSize: 20,
  },
});
