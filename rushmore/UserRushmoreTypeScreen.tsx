import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, List, IconButton } from "react-native-paper";
import { RushmoreService } from "../service/RushmoreService";
import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { UserRushmore, RushmoreType } from "../model/UserRushmore";
import EditUserRushmoreAppBar from "../components/EditUserRushmoreAppBar";
import LoadingButton from "../components/LoadingButton";

type UserRushmoreTypeScreenProps =
  StackContainerScreenProps<"UserRushmoreTypeScreen">;

const rushmoreService = new RushmoreService();

export const UserRushmoreTypeScreen = ({
  route,
  navigation,
}: UserRushmoreTypeScreenProps) => {
  const [userRushmore, setUserRushmore] = useState<UserRushmore | null>(null);
  const [selectedType, setSelectedType] = useState<RushmoreType>(
    RushmoreType.Favorite
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteComplete, setIsFavoriteComplete] = useState(false);
  const [isBestComplete, setIsBestComplete] = useState(false);

  useEffect(() => {
    console.log("Inside useEffect");
    const fetchUserRushmore = async () => {
      if (route.params?.userRushmoreInitialCreate) {
        console.log("userRushmoreInitialCreate is set");
        const userRushmoreData = await rushmoreService.getUserRushmore(
          route.params?.userRushmoreInitialCreate.userRushmore.urId
        );
        setUserRushmore(userRushmoreData);
        setSelectedType(userRushmoreData.rushmoreType as RushmoreType);

        const { favoriteComplete, bestComplete } =
          route.params.userRushmoreInitialCreate;
        console.log("favoriteComplete:", favoriteComplete);
        console.log("bestComplete:", bestComplete);

        setIsFavoriteComplete(favoriteComplete);
        setIsBestComplete(bestComplete);
      }
    };
    fetchUserRushmore();
  }, [route.params?.userRushmoreInitialCreate]);

  useEffect(() => {
    console.log("Updated isFavoriteComplete:", isFavoriteComplete);
    console.log("Updated isBestComplete:", isBestComplete);
  }, [isFavoriteComplete, isBestComplete]);

  const updateRushmoreType = (newType: RushmoreType) => {
    if (userRushmore) {
      const updatedRushmore = { ...userRushmore, rushmoreType: newType };
      setUserRushmore(updatedRushmore);
      setSelectedType(newType);
    }
  };

  const navigateToEditUserRushmoreScreen = async () => {
    console.log("navigateToEditUserRushmoreScreen");

    if (userRushmore && selectedType) {
      console.log("Setting SelectedType on user rushmore:" + selectedType);
      setIsLoading(true);
      userRushmore.rushmoreType = selectedType;
      await rushmoreService.editUserRushmore(userRushmore);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "EditUserRushmoreScreen",
            params: { userRushmore: userRushmore },
          },
        ],
      });
      setIsLoading(false);
    }
  };

  const handleMenuPress = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleDeleteUserRushmorePress = () => {
    // Handle delete action
    closeMenu();
  };

  const handleEditPress = () => {
    // Handle edit action
    closeMenu();
  };

  return (
    <SafeAreaView style={styles.container}>
      <EditUserRushmoreAppBar
        displayVersion=""
        userRushmore={userRushmore || undefined}
        menuVisible={menuVisible}
        closeMenu={closeMenu}
        handleMenuPress={handleMenuPress}
        handleDeleteUserRushmorePress={handleDeleteUserRushmorePress}
        handleEditPress={handleEditPress}
        isEditMode={true}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Select Rushmore Type</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => updateRushmoreType(RushmoreType.Favorite)}
            disabled={isFavoriteComplete}
            style={[styles.listItem, isFavoriteComplete && styles.disabledItem]}
          >
            <List.Item
              title="Favorite"
              description="Select if this is your favorite."
              left={() => (
                <IconButton
                  icon={
                    selectedType === RushmoreType.Favorite
                      ? "radiobox-marked"
                      : "radiobox-blank"
                  }
                  disabled={isFavoriteComplete}
                />
              )}
            />
            {isFavoriteComplete && (
              <Text style={styles.helperText}>Already created</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => updateRushmoreType(RushmoreType.Best)}
            disabled={isBestComplete}
            style={[styles.listItem, isBestComplete && styles.disabledItem]}
          >
            <List.Item
              title="Best"
              description="Select if this is the best."
              left={() => (
                <IconButton
                  icon={
                    selectedType === RushmoreType.Best
                      ? "radiobox-marked"
                      : "radiobox-blank"
                  }
                  disabled={isBestComplete}
                />
              )}
            />
            {isBestComplete && (
              <Text style={styles.helperText}>Already created</Text>
            )}
          </TouchableOpacity>
        </View>
        <LoadingButton
          onPress={navigateToEditUserRushmoreScreen}
          isLoading={isLoading}
          loadingText="Saving..."
          buttonText="Next"
          disabled={!selectedType}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  listItem: {
    marginBottom: 10,
  },
  optionContainer: {
    marginBottom: 20,
  },
  disabledItem: {
    opacity: 0.5,
    backgroundColor: "#e0e0e0", // Light gray background to indicate disabled state
  },
  helperText: {
    marginLeft: 16, // Adjusted margin to align properly
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4, // Adjusted to place text closer to the list item
  },
});

export default UserRushmoreTypeScreen;
