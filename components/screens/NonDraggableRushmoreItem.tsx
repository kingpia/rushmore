import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { UserRushmoreItem } from "../../model/UserRushmoreItem";

type Props = {
  item: UserRushmoreItem;
  isEditMode: boolean;
  handleDeletePress: (item: UserRushmoreItem) => void;
};

const NonDraggableRushmoreItem: React.FC<Props> = ({
  item,
  isEditMode,
  handleDeletePress,
}) => {
  return (
    <View style={styles.nonDraggableItem}>
      <View style={styles.itemContainer}>
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>{item.rank}</Text>
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.item}</Text>
        </View>
        {isEditMode && (
          <TouchableOpacity onPress={() => handleDeletePress(item)}>
            <IconButton
              icon="close-circle-outline"
              size={24}
              style={styles.deleteButton}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nonDraggableItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "#FFFFFF",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00796B",
  },
  itemContent: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#424242",
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default NonDraggableRushmoreItem;
