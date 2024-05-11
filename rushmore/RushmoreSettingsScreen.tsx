import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import {
  Text,
  SegmentedButtons,
  Button,
  Portal,
  Modal,
  ActivityIndicator,
} from "react-native-paper";
import { CreateRushmoreStackParamList } from "../nav/params/CreateRushmoreStackParamList";
import {
  RushmoreGameTypeEnums,
  RushmoreType,
  RushmoreVisibilityEnums,
  UserRushmore,
} from "../model/UserRushmore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { CreateUserRushmoreRequestDTO } from "../model/CreateuserRushmoreRequestDTO";
import { RushmoreService } from "../service/RushmoreService";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";

type RushmoreSettingsScreenProps = {
  navigation: NativeStackNavigationProp<
    CreateRushmoreStackParamList & AppStackParamList
  >;
  route: any;
};

export const RushmoreSettingsScreen = ({
  route,
  navigation,
}: RushmoreSettingsScreenProps) => {
  let rushmore = route.params.rushmore;
  const [isPrivate, setIsPrivate] = useState("no");
  const [rushmoreType, setRushmoreType] = useState("favorite");
  const [gameType, setGameType] = useState("game");

  const [isLoading, setIsLoading] = useState(false);

  //Error Handling states
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false); // State to manage error modal visibility
  const [errorMessage, setErrorMessage] = useState<string>(""); // State to store error message

  console.log("The rushmore you are creating is :" + JSON.stringify(rushmore));
  const handleCreatePress = async () => {
    const rushmoreService = new RushmoreService<UserRushmore>();

    const createUserRushmoreRequest: CreateUserRushmoreRequestDTO = {
      rid: rushmore.rid,
      visibility:
        isPrivate === "yes"
          ? RushmoreVisibilityEnums.PRIVATE
          : RushmoreVisibilityEnums.PUBLIC,
      gameType:
        gameType === "game"
          ? RushmoreGameTypeEnums.GAME
          : RushmoreGameTypeEnums.OPEN,
      rushmoreType:
        rushmoreType === "favorite" ? RushmoreType.Favorite : RushmoreType.Best,
    };

    try {
      setIsLoading(true);
      let useRushmoreResponse: UserRushmoreDTO =
        await rushmoreService.createUserRushmore(createUserRushmoreRequest);

      console.log(
        "Returned created user rushmore:" + JSON.stringify(useRushmoreResponse)
      );
      console.log(
        "userRushmore created. JSON:" +
          JSON.stringify(useRushmoreResponse.userRushmore)
      );
      navigation.navigate("EditUserRushmoreScreen", {
        userRushmore: useRushmoreResponse.userRushmore,
        selectedItemUserRushmore: undefined,
      });
    } catch (error: any) {
      setIsLoading(false);

      console.error("Error Creating Rushmore. DISPLAY MODAL", error);
      setErrorMessage(error.message); // Set error message
      setErrorModalVisible(true); // Show error modal
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Text style={styles.settingsText} variant="headlineSmall">
            Rushmore
          </Text>
          <SegmentedButtons
            value={rushmoreType}
            onValueChange={setRushmoreType}
            buttons={[
              {
                value: "favorite",
                label: "Favorite",
              },
              { value: "best", label: "Best" },
            ]}
            style={styles.segmentedButtons}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.settingsText} variant="headlineSmall">
            Private
          </Text>
          <SegmentedButtons
            value={isPrivate}
            onValueChange={setIsPrivate}
            buttons={[
              {
                value: "yes",
                label: "Yes",
              },
              { value: "no", label: "No" },
            ]}
            style={styles.segmentedButtons}
          />
        </View>
        {isPrivate !== "yes" && (
          <View style={styles.row}>
            <Text style={styles.settingsText} variant="headlineSmall">
              Type
            </Text>
            <SegmentedButtons
              value={gameType}
              onValueChange={setGameType}
              buttons={[
                {
                  value: "game",
                  label: "Game",
                },
                { value: "open", label: "Open" },
              ]}
              style={styles.segmentedButtons}
            />
            {/* Error Modal */}
            <Portal>
              <Modal
                visible={errorModalVisible}
                onDismiss={() => setErrorModalVisible(false)}
                contentContainerStyle={styles.modalContent}
              >
                <Text>{errorMessage}</Text>
              </Modal>
            </Portal>
          </View>
        )}

        {/* Spacer to push Create button to the bottom */}
        <View style={styles.spacer} />
        {/* Create Button */}
        <View style={styles.createButtonContainer}>
          <Button
            mode="contained"
            onPress={handleCreatePress}
            style={styles.createButton}
          >
            {isLoading ? (
              <>
                <Text>Creating Rushmore ...</Text>
                <ActivityIndicator animating={true} color="#ffffff" />
              </>
            ) : (
              "Create Rushmore"
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingsText: {
    alignSelf: "center",
    flex: 1,
  },
  segmentedButtons: {
    flex: 2,
    justifyContent: "flex-end",
  },
  spacer: {
    flex: 1,
  },
  createButtonContainer: {
    marginTop: 16, // Optional margin from the spacer
  },
  createButton: {
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 4,
  },
});
