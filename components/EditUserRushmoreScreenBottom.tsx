import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { UserRushmore } from "../model/UserRushmore";

type EditUserRushmoreScreenBottomProps = {
  handleExitPress: () => void;
  handleEditPress: () => void;
  navigateToSettingsScreen: () => void;
  navigateToAddItemsScreen: () => void;
  userRushmore: UserRushmore | null;
  isEditMode: boolean;
};

const EditUserRushmoreScreenBottom: React.FC<
  EditUserRushmoreScreenBottomProps
> = ({
  handleExitPress,
  handleEditPress,
  navigateToSettingsScreen,
  navigateToAddItemsScreen,
  userRushmore,
  isEditMode,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleExitPress} style={styles.touchable}>
        <IconButton icon="exit-to-app" size={30} />
      </TouchableOpacity>
      {isEditMode && userRushmore?.completedDt === null ? (
        <>
          <Button
            mode="contained"
            onPress={navigateToSettingsScreen}
            disabled={
              !userRushmore ||
              !userRushmore.itemList ||
              userRushmore.itemList.length === 0 ||
              !isEditMode
            }
            style={styles.publishButton}
            contentStyle={styles.publishButtonContent}
          >
            Next
          </Button>
          <TouchableOpacity
            onPress={navigateToAddItemsScreen}
            style={styles.touchable}
          >
            <IconButton icon="plus" size={30} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.spacer} />
          <TouchableOpacity onPress={handleEditPress} style={styles.touchable}>
            <IconButton icon="pencil" size={30} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  touchable: {
    alignItems: "center",
  },
  publishButton: {
    marginHorizontal: 20,
  },
  publishButtonContent: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  spacer: {
    flex: 1,
  },
});

export default EditUserRushmoreScreenBottom;
