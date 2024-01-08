import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Text,
  Switch,
  HelperText,
  Button,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/CreateRushmoreStackParamList";

type RushmoreSettingsScreenProps =
  StackContainerScreenProps<"RushmoreSettingsScreen">;

export const RushmoreSettingsScreen = ({
  route,
  navigation,
}: RushmoreSettingsScreenProps) => {
  const [selectedOption, setSelectedOption] = useState("Best");
  const [isPrivate, setIsPrivate] = useState(false);
  const [rushmoreType, setRushmoreType] = useState("Game");
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleSwitchChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleRushmoreTypeChange = (value: string) => {
    setRushmoreType(value);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true); // Show loading indicator

      // Perform your API call here
      // For example, using fetch or axios

      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to RushmoreRankingScreen
      navigation.navigate("RushmoreRankingScreen");
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setIsLoading(false); // Hide loading indicator regardless of success or error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            size={100}
            color={MD2Colors.cyanA700}
          />
        </View>
      )}

      <View style={styles.contentContainer}>
        {/* Title */}

        {/* Best or Favorite Segment Buttons */}
        <View style={styles.segmentButtonContainer}>
          <Button
            mode={selectedOption === "Best" ? "contained" : "outlined"}
            onPress={() => handleOptionChange("Best")}
            style={styles.segmentButton}
          >
            Best
          </Button>
          <Button
            mode={selectedOption === "Favorite" ? "contained" : "outlined"}
            onPress={() => handleOptionChange("Favorite")}
            style={styles.segmentButton}
          >
            Favorite
          </Button>
        </View>

        {/* Helper Text for Best or Favorite */}
        <HelperText type="info">
          {selectedOption === "Best"
            ? `The Best ${route.params?.rushmore.title}, in your opinion.`
            : `Your Favorite ${route.params?.rushmore.title}.`}
        </HelperText>

        {/* Private Switch */}
        <View style={styles.switchContainer}>
          <Text>Private</Text>
          <Switch value={isPrivate} onValueChange={handleSwitchChange} />
        </View>

        {/* Helper Text for Private Switch */}
        <HelperText type="info">
          {isPrivate
            ? "Nobody but you can see this Rushmore."
            : "Rushmore is public."}
        </HelperText>

        {/* Game or Open Segment Buttons */}
        <View style={styles.segmentButtonContainer}>
          <Button
            mode={rushmoreType === "Game" ? "contained" : "outlined"}
            onPress={() => handleRushmoreTypeChange("Game")}
            style={styles.segmentButton}
          >
            Game
          </Button>
          <Button
            mode={rushmoreType === "Open" ? "contained" : "outlined"}
            onPress={() => handleRushmoreTypeChange("Open")}
            style={styles.segmentButton}
          >
            Open
          </Button>
        </View>

        {/* Helper Text for Game or Open */}
        <HelperText type="info">
          {rushmoreType === "Game"
            ? "Gamified Rushmore, let others guess and play."
            : "Openly published for all to see. No gamification."}
        </HelperText>

        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
          <Text>Save</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  saveButton: {
    marginTop: 16,
  },
  segmentButtonContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  segmentButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
});
