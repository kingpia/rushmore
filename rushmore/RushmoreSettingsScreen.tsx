import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import {
  Text,
  Button,
  TextInput,
  List,
  IconButton,
  Appbar,
} from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateRushmoreStackParamList } from "../nav/params/CreateRushmoreStackParamList";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import {
  RushmoreGameTypeEnums,
  RushmoreType,
  RushmoreVisibilityEnums,
  UserRushmore,
} from "../model/UserRushmore";
import { RushmoreService } from "../service/RushmoreService";
import LoadingButton from "../components/LoadingButton";

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
  const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService

  const userRushmore = route.params.userRushmore;
  const [formEnabled, setFormEnabled] = useState(true);

  const [inputText, setInputText] = useState("");
  const [versionAccordionExpanded, setVersionAccordionExpanded] =
    useState(false);
  const [tagAccordionExpanded, setTagAccordionExpanded] = useState(false);
  const [visibilityAccordionExpanded, setVisibilityAccordionExpanded] =
    useState(false);
  const [rushmoreTypeAccordionExpanded, setRushmoreTypeAccordionExpanded] =
    useState(false);
  const [gameTypeAccordionExpanded, setGameTypeAccordionExpanded] =
    useState(false);
  const [versionText, setVersionText] = useState("Latest");
  const [tagInput, setTagInput] = useState("");
  const [userRushmoreVisibility, setUserRushmoreVisibility] = useState(
    RushmoreVisibilityEnums.PUBLIC
  );
  const [rushmoreType, setRushmoreType] = useState(RushmoreType.Favorite);
  const [gameType, setGameType] = useState(RushmoreGameTypeEnums.GAME);

  const [isLoading, setIsLoading] = useState(false); // Loading state for login process
  const [versionError, setVersionError] = useState(""); // State for version input error

  const handleVersionAccordionPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVersionAccordionExpanded(!versionAccordionExpanded);
  };
  const handleTagAccordionPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTagAccordionExpanded(!tagAccordionExpanded);
  };
  const toggleVisibilityAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisibilityAccordionExpanded(!visibilityAccordionExpanded);
  };

  const toggleRushmoreTypeAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setRushmoreTypeAccordionExpanded(!rushmoreTypeAccordionExpanded);
  };
  const toggleGameTypeAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setGameTypeAccordionExpanded(!gameTypeAccordionExpanded);
  };

  const handleVisibilityToggle = () => {
    setUserRushmoreVisibility((prevVisibility) =>
      prevVisibility === RushmoreVisibilityEnums.PUBLIC
        ? RushmoreVisibilityEnums.PRIVATE
        : RushmoreVisibilityEnums.PUBLIC
    );
  };

  const handleGameTypeToggle = () => {
    setGameType((prevType) =>
      prevType === RushmoreGameTypeEnums.GAME
        ? RushmoreGameTypeEnums.OPEN
        : RushmoreGameTypeEnums.GAME
    );
  };

  const goBackToEditRushmore = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "EditUserRushmoreScreen",
          params: {
            userRushmore: userRushmore,
            selectedItemUserRushmore: undefined,
          },
        },
      ],
    });
  };

  const handlePublishPress = async () => {
    console.log("PublishUserRushmore");
    setFormEnabled(false);
    setIsLoading(true);

    // Add displayVersion to userRushmore object
    userRushmore.displayVersion = versionText;

    if (userRushmore) {
      console.log("Calling publish userRushmore");

      await rushmoreService.publishUserRushmore(userRushmore);
      goBackToEditRushmore();
    }
  };

  // Validate version text input
  const validateVersionText = (text: string) => {
    const isValid = /^[a-zA-Z0-9._]+$/.test(text);
    setVersionError(
      !isValid
        ? "Versions can only contain letters, numbers, periods, and underscores."
        : ""
    );
  };

  // Handle change for version text input
  const handleVersionTextChange = (text: string) => {
    if (text.length <= 20) {
      setVersionText(text);
      validateVersionText(text);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={goBackToEditRushmore} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Input"
            value={inputText}
            disabled={!formEnabled}
            onChangeText={(text) => setInputText(text)}
            style={styles.textInput}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={{ marginRight: 5 }}
              mode="elevated"
              onPress={() => console.log("# Hashtag")}
              disabled={!formEnabled}
            >
              # Hashtag
            </Button>
            <Button
              mode="elevated"
              disabled={!formEnabled}
              onPress={() => console.log("@ Mention")}
            >
              @ Mention
            </Button>
          </View>
        </View>
        <List.Accordion
          title="Version"
          expanded={versionAccordionExpanded}
          onPress={handleVersionAccordionPress}
          right={(props) => (
            <View style={styles.accordionRight}>
              <Text style={styles.versionText}>{versionText}</Text>
              <List.Icon
                {...props}
                icon={
                  versionAccordionExpanded ? "chevron-down" : "chevron-right"
                }
              />
            </View>
          )}
        >
          <TextInput
            label="Version"
            value={versionText}
            onChangeText={handleVersionTextChange}
            style={styles.textInput}
            error={!!versionError}
          />
          {!!versionError && (
            <Text style={styles.errorText}>{versionError}</Text>
          )}
        </List.Accordion>

        <List.Accordion
          title="Tag People"
          expanded={tagAccordionExpanded}
          onPress={handleTagAccordionPress}
          right={(props) => (
            <List.Icon
              {...props}
              icon={tagAccordionExpanded ? "chevron-down" : "chevron-right"}
            />
          )}
        >
          <TextInput
            label="Tag"
            value={tagInput}
            onChangeText={(text) => setTagInput(text)}
            style={styles.textInput}
            disabled={!formEnabled}
          />
        </List.Accordion>

        <List.Accordion
          title="Visibility"
          expanded={visibilityAccordionExpanded}
          onPress={toggleVisibilityAccordion}
          right={(props) => (
            <View style={styles.accordionRight}>
              <Text style={styles.versionText}>{userRushmoreVisibility}</Text>
              <List.Icon
                {...props}
                icon={
                  visibilityAccordionExpanded ? "chevron-down" : "chevron-right"
                }
              />
            </View>
          )}
        >
          <TouchableOpacity onPress={handleVisibilityToggle}>
            <List.Item
              title={userRushmoreVisibility}
              disabled={!formEnabled}
              style={styles.listItem}
              right={() => (
                <IconButton
                  icon={
                    userRushmoreVisibility === RushmoreVisibilityEnums.PUBLIC
                      ? "eye"
                      : "eye-off"
                  }
                />
              )}
            />
          </TouchableOpacity>
        </List.Accordion>

        <List.Accordion
          title="Game Type"
          expanded={gameTypeAccordionExpanded}
          onPress={toggleGameTypeAccordion}
          right={(props) => (
            <View style={styles.accordionRight}>
              <Text style={styles.versionText}>{gameType}</Text>
              <List.Icon
                {...props}
                icon={
                  gameTypeAccordionExpanded ? "chevron-down" : "chevron-right"
                }
              />
            </View>
          )}
        >
          <TouchableOpacity onPress={handleGameTypeToggle}>
            <List.Item
              title={gameType}
              disabled={!formEnabled}
              style={styles.listItem}
              right={() => (
                <IconButton
                  icon={
                    gameType === RushmoreGameTypeEnums.GAME
                      ? "gamepad-variant"
                      : "earth"
                  }
                />
              )}
            />
          </TouchableOpacity>
        </List.Accordion>
        <LoadingButton
          onPress={handlePublishPress}
          isLoading={isLoading}
          loadingText="Publishing..."
          buttonText="Publish"
          style={{ marginLeft: 5 }}
          disabled={!!versionError}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  textInput: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  accordionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  versionText: {
    marginRight: 8,
    color: "gray",
  },
  listItem: {
    paddingLeft: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
  },
});

export default RushmoreSettingsScreen;
