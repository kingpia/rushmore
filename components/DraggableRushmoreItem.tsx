import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { UserRushmoreItem } from "../model/UserRushmoreItem";

type Props = {
  item: UserRushmoreItem;
  drag: () => void;
  isActive: boolean;
  isEditMode: boolean;
  handleDeletePress: (item: UserRushmoreItem) => void;
};

const DraggableRushmoreItem: React.FC<Props> = ({
  item,
  drag,
  isActive,
  isEditMode,
  handleDeletePress,
}) => {
  return (
    <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
        style={[
          styles.draggableItem,
          { backgroundColor: isActive ? "#E0F7FA" : "#FFFFFF" },
        ]}
      >
        <View style={styles.itemContainer}>
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>{item.rank}</Text>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>{item.item}</Text>
          </View>
          {isEditMode && (
            <IconButton
              icon="close-circle-outline"
              size={24}
              onPress={() => handleDeletePress(item)}
              style={styles.deleteButton}
            />
          )}
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

const styles = StyleSheet.create({
  draggableItem: {
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

export default DraggableRushmoreItem;
