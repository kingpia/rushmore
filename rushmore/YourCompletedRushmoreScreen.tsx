import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/HomeStackParamList";
import { YourCompletedRushmore } from "../model/YourCompletedRushmore";
import { RushmoreService } from "../service/RushmoreService";
import { YourCompletedRushmoreItem } from "../model/YourCompletedRushmoreItem";
import DraggableFlatList from "react-native-draggable-flatlist";
import { RushmoreType } from "../model/RushmoreTypeEnums";
import { RushmoreVisibilityEnums } from "../model/RushmoreVisibilityEnums";
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";

type YourCompletedRushmoreScreenProps =
  StackContainerScreenProps<"YourCompletedRushmoreScreen">;

export const YourCompletedRushmoreScreen = ({
  route,
}: YourCompletedRushmoreScreenProps) => {
  const rushmoreItem = route.params?.rushmoreItem;

  const [rushmoreData, setRushmoreData] = useState<YourCompletedRushmore>();

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = "PiA_ID"; // Replace with the actual user ID
        const urId = rushmoreItem.urId;
        const rushmoreService = new RushmoreService<YourCompletedRushmore>();

        const data = await rushmoreService.getYourCompletedRushmore(uid, urId);

        setRushmoreData(data);
      } catch (error) {
        console.error("Error fetching rushmore data:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [rushmoreItem]);

  const renderCardItem = ({ item }: { item: YourCompletedRushmoreItem }) => (
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
      {isEditMode ? (
        <Text>InEditMode</Text>
      ) : (
        <FlatList
          data={rushmoreData?.yourCompletedRushmoreItems}
          keyExtractor={(item) => item.riId.toString()}
          renderItem={renderCardItem}
        />
      )}
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
