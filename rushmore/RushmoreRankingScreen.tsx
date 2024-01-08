import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import {
  FAB,
  Portal,
  Dialog,
  TextInput,
  Button,
  Card,
  Text,
  MD2Colors,
  ActivityIndicator,
} from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/CreateRushmoreStackParamList";

type RushmoreRankingScreenProps =
  StackContainerScreenProps<"RushmoreRankingScreen">;

export const RushmoreRankingScreen = ({
  route,
  navigation,
}: RushmoreRankingScreenProps) => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const isSaveDisabled = newItemText.trim().length === 0;

  const [isLoading, setIsLoading] = useState(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const handleAddItem = async () => {
    try {
      // Close the dialog
      hideDialog();
      setIsLoading(true); // Show loading indicator

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update state with the new item
      setItems((prevItems) => [...prevItems, newItemText]);

      setNewItemText("");
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setIsLoading(false); // Hide loading indicator regardless of success or error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            size={100}
            color={MD2Colors.cyanA700}
          />
        </View>
      )}
      {/* Cards */}
      {items.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Text>{item}</Text>
          </Card.Content>
        </Card>
      ))}

      {/* Floating Action Button */}
      <FAB style={styles.fab} icon="plus" onPress={showDialog} />

      {/* Add Item Dialog */}
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Add Item</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Item Text"
              value={newItemText}
              onChangeText={(text) => setNewItemText(text)}
              maxLength={100}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleAddItem} disabled={isSaveDisabled}>
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});
