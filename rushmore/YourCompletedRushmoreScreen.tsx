import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/HomeStackParamList";
import { RushmoreService } from "../service/RushmoreService";
import DraggableFlatList from "react-native-draggable-flatlist";
import { UserRushmore } from "../model/UserRushmore";
import { UserRushmoreItem } from "../model/UserRushmoreItem";

type YourCompletedRushmoreScreenProps =
  StackContainerScreenProps<"YourCompletedRushmoreScreen">;

export const YourCompletedRushmoreScreen = ({
  route,
}: YourCompletedRushmoreScreenProps) => {
  const rushmoreItem = route.params?.rushmoreItem;
  console.log("RushmoreItem:" + JSON.stringify(rushmoreItem));

  const [rushmoreData, setRushmoreData] = useState<UserRushmore>();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = "PiA_ID"; // Replace with the actual user ID
        const urId = rushmoreItem.urId;
        const rushmoreService = new RushmoreService<UserRushmore>();

        const data = await rushmoreService.getYourCompletedRushmore(uid, urId);

        console.log("Data from fetch: " + JSON.stringify(data));
        setRushmoreData(data);
      } catch (error) {
        console.error("Error fetching rushmore data:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [rushmoreItem]);

  const renderCardItem = ({ item }: { item: UserRushmoreItem }) => (
    <Card style={styles.card}>
      <Card.Title title={`#${item.rank}`} subtitle={item.itemTitle} />
      {/* Add other card content as needed */}
    </Card>
  );

  const handleEditSubmitToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={rushmoreData?.userRushmoreItemList}
        keyExtractor={(item) => item.uriId.toString()}
        renderItem={renderCardItem}
      />

      <IconButton
        icon={isEditMode ? "check" : "pencil"}
        onPress={handleEditSubmitToggle}
        style={styles.editButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  editButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
