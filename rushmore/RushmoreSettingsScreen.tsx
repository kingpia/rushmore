import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, SegmentedButtons, Button } from "react-native-paper";
import {
  CreateRushmoreStackParamList,
  StackContainerScreenProps,
} from "../nav/params/CreateRushmoreStackParamList";
import { UserRushmore } from "../model/UserRushmore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";

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

  const handleCreatePress = () => {
    let userRushmore: UserRushmore = require("../sampleApiData/inProgressUserRushmore.json");

    console.log("Create Rushmore");
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore,
    });
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
});
