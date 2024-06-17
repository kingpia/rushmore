import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { UserRushmore } from "../model/UserRushmore";

type EditUserRushmoreScreenBottomProps = {
  handleExitPress: () => void;
  navigateToSettingsScreen: () => void;
  navigateToAddItemsScreen: () => void;
  userRushmore: UserRushmore | null;
  isEditMode: boolean;
};

const EditUserRushmoreScreenBottom: React.FC<
  EditUserRushmoreScreenBottomProps
> = ({
  handleExitPress,
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
      {userRushmore?.completedDt === null && isEditMode && (
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
      )}
      {isEditMode && (
        <TouchableOpacity
          onPress={navigateToAddItemsScreen}
          style={styles.touchable}
        >
          <IconButton icon="plus" size={30} />
        </TouchableOpacity>
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
    flex: 1,
    alignItems: "center",
  },
  publishButton: {
    marginHorizontal: 20,
  },
  publishButtonContent: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default EditUserRushmoreScreenBottom;
