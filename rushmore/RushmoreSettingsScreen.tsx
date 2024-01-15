import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, SegmentedButtons, Button } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/CreateRushmoreStackParamList";
import { UserRushmore } from "../model/UserRushmore";
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";
import { RushmoreVisibilityEnums } from "../model/RushmoreVisibilityEnums";
import { RushmoreType } from "../model/RushmoreTypeEnums";

type RushmoreSettingsScreenProps =
  StackContainerScreenProps<"RushmoreSettingsScreen">;

export const RushmoreSettingsScreen = ({
  route,
  navigation,
}: RushmoreSettingsScreenProps) => {
  let rushmore = route.params.rushmore;
  const [isPrivate, setIsPrivate] = useState("no");
  const [rushmoreType, setRushmoreType] = useState("favorite");
  const [gameType, setGameType] = useState("game");

  const handleCreatePress = () => {
    let userRushmore: UserRushmore = {
      rushmore: rushmore,
      urId: 0,
      user: {
        id: "",
        userName: "",
        name: "",
        followingCount: 0,
        followerCount: 0,
        friendCount: 0,
        likeCount: 0,
        socialStatus: ""
      },
      visibility: RushmoreVisibilityEnums.OPEN,
      gameType: RushmoreGameTypeEnums.GAME,
      rushmoreType: RushmoreType.Best,
      createdDt: new Date,
      completedDt: new Date,
      likeCount: 0,
      completedCount: 0,
      icon: "",
      highScoreUser: {
        id: "",
        userName: "",
        name: "",
        followingCount: 0,
        followerCount: 0,
        friendCount: 0,
        likeCount: 0,
        socialStatus: ""
      },
      version: 0,
      userRushmoreItemList: []
    }
    console.log("Create Rushmore");
    navigation.navigate("RushmoreRankingScreen", {
      userRushmore,
      // Add other properties as needed
    });
    /*
    navigation.reset({
      index: 0,
      routes: [{ name: "RushmoreRankingScreen", }],
    })
    */

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Text style={styles.settingsText} variant="headlineSmall">Rushmore</Text>
          <SegmentedButtons
            value={rushmoreType}
            onValueChange={setRushmoreType}
            buttons={[
              {
                value: 'favorite',
                label: 'Favorite',
              },
              { value: 'best', label: 'Best' },
            ]}
            style={styles.segmentedButtons}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.settingsText} variant="headlineSmall">Private</Text>
          <SegmentedButtons
            value={isPrivate}
            onValueChange={setIsPrivate}
            buttons={[
              {
                value: 'yes',
                label: 'Yes',
              },
              { value: 'no', label: 'No' },
            ]}
            style={styles.segmentedButtons}
          />
        </View>
        {isPrivate !== 'yes' && (
          <View style={styles.row}>
            <Text style={styles.settingsText} variant="headlineSmall">Type</Text>
            <SegmentedButtons
              value={gameType}
              onValueChange={setGameType}
              buttons={[
                {
                  value: 'game',
                  label: 'Game',
                },
                { value: 'open', label: 'Open' },
              ]}
              style={styles.segmentedButtons}
            />
          </View>
        )}
        {/* Spacer to push Create button to the bottom */}
        <View style={styles.spacer} />
        {/* Create Button */}
        <View style={styles.createButtonContainer}>
          <Button mode="contained" onPress={handleCreatePress} style={styles.createButton}>
            Create
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
    justifyContent: 'flex-end',
  },
  spacer: {
    flex: 1,
  },
  createButtonContainer: {
    marginTop: 16, // Optional margin from the spacer
  },
  createButton: {
    width: '100%',
  },
});
