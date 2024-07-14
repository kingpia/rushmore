import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, List, IconButton } from "react-native-paper";
import { RushmoreService } from "../service/RushmoreService";
import {
  UserRushmore,
  RushmoreType,
  RushmoreVisibilityEnums,
  RushmoreGameTypeEnums,
} from "../model/UserRushmore";
import EditUserRushmoreAppBar from "../components/EditUserRushmoreAppBar";
import LoadingButton from "../components/LoadingButton";
import { CreateRushmoreStackParamList } from "../nav/params/CreateRushmoreStackParamList";
import { CreateUserRushmoreRequestDTO } from "../model/CreateUserRushmoreRequestDTO";
import { UserRushmoreInitialCreateDTO } from "../model/UserRushmoreInitialCreateDTO";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { Rushmore } from "../model/Rushmore";

type UserRushmoreTypeScreenProps = NativeStackScreenProps<
  CreateRushmoreStackParamList & AppStackParamList,
  "UserRushmoreTypeScreen"
>;

const rushmoreService = new RushmoreService();

export const UserRushmoreTypeScreen = ({
  route,
  navigation,
}: UserRushmoreTypeScreenProps) => {
  const [rushmore, setRushmore] = useState<Rushmore>();
  const [userRushmoreList, setUserRushmoreList] = useState<UserRushmore[]>([]);

  const [selectedType, setSelectedType] = useState<RushmoreType>(
    RushmoreType.Favorite
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteComplete, setIsFavoriteComplete] = useState(false);
  const [isBestComplete, setIsBestComplete] = useState(false);

  // Destructure route.params to get userRushmoreList and rushmore
  const {
    userRushmoreList: initialUserRushmoreList,
    rushmore: initialRushmore,
  } = route.params;

  useEffect(() => {
    if (
      !rushmore &&
      (!userRushmoreList.length || !initialUserRushmoreList.length)
    ) {
      console.log("Inside useEffect");
      setUserRushmoreList(initialUserRushmoreList);
      setRushmore(initialRushmore);
      if (initialRushmore) {
        const favoriteComplete = initialUserRushmoreList.some(
          (userRushmore) =>
            userRushmore.rushmore.rid === initialRushmore.rid &&
            userRushmore.rushmoreType === RushmoreType.Favorite
        );

        const bestComplete = initialUserRushmoreList.some(
          (userRushmore) =>
            userRushmore.rushmore.rid === initialRushmore.rid &&
            userRushmore.rushmoreType === RushmoreType.Best
        );
        console.log("FavoriteComplete:" + favoriteComplete);
        console.log("BestComplete:" + bestComplete);

        setIsFavoriteComplete(favoriteComplete);
        setIsBestComplete(bestComplete);
      }
    }
  }, [initialRushmore, initialUserRushmoreList, rushmore, userRushmoreList]);

  const updateRushmoreType = (newType: RushmoreType) => {
    console.log("updateRushmoreType");
    if (newType === selectedType) {
      console.log("Type already selected, no change needed");
      return;
    }
    console.log("Setting new selectedType");
    setSelectedType(newType);
  };

  const navigateToEditUserRushmoreScreen = async () => {
    console.log("navigateToEditUserRushmoreScreen");

    if (rushmore && selectedType) {
      setIsLoading(true);
      const createUserRushmoreRequest: CreateUserRushmoreRequestDTO = {
        rid: rushmore.rid,
        visibility: RushmoreVisibilityEnums.PUBLIC,
        gameType: RushmoreGameTypeEnums.OPEN,
        type: selectedType,
      };

      console.log(
        "The createUserRushmoreRequest:" +
          JSON.stringify(createUserRushmoreRequest, null, 2)
      );

      try {
        let userRushmoreInitialCreate: UserRushmoreInitialCreateDTO =
          await rushmoreService.createUserRushmore(createUserRushmoreRequest);

        console.log(
          "Returned created user rushmore:" +
            JSON.stringify(userRushmoreInitialCreate, null, 2)
        );

        navigation.reset({
          index: 0,
          routes: [
            {
              name: "EditUserRushmoreScreen",
              params: { userRushmore: userRushmoreInitialCreate.userRushmore },
            },
          ],
        });
      } catch (error: any) {
        setIsLoading(false);
        console.error("Error Creating Rushmore. DISPLAY MODAL", error);
      }
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
