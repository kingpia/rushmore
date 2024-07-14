import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { IconButton, Button, Text } from "react-native-paper";
import { UserRushmore } from "../model/UserRushmore";

type EditUserRushmoreScreenBottomProps = {
  handleExitPress: () => void;
  handleEditPress: () => void;
  navigateToSettingsScreen: () => void;
  navigateToAddItemsScreen: () => void;
  userRushmore: UserRushmore | null;
  isEditMode: boolean;
  isLoading: boolean; // Add isLoading prop
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
  isLoading, // Destructure isLoading
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleExitPress}>
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
              !isEditMode ||
              isLoading
            }
            style={styles.publishButton}
            contentStyle={styles.publishButtonContent}
          >
            {isLoading ? (
              <>
                <ActivityIndicator animating={true} color="#ffffff" />
                <Text style={styles.loadingText}>Saving...</Text>
              </>
            ) : (
              "Next"
            )}
          </Button>
          <TouchableOpacity onPress={navigateToAddItemsScreen}>
            <IconButton icon="plus" size={30} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.spacer} />
          <TouchableOpacity onPress={handleEditPress}>
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
  publishButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    marginHorizontal: 10, // Add some horizontal margin for spacing
  },
  publishButtonContent: {
    height: "100%", // Ensure content takes full height
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    flexDirection: "row-reverse", // Ensure loading indicator is on the left
  },
  loadingText: {
    marginLeft: 10, // Add some space between the loading indicator and text
    color: "#ffffff",
  },
  spacer: {
    flex: 1,
  },
});

export default EditUserRushmoreScreenBottom;
