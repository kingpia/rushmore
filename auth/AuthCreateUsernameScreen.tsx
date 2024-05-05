import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  TextInput,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";

import { SafeAreaView, TouchableOpacity, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { UserService } from "../service/UserService";

type AuthCreateUsernameScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

export const AuthCreateUsernameScreen = ({
  navigation,
}: AuthCreateUsernameScreenProps) => {
  const userService: UserService<SocialUser> = new UserService();
  const [username, setUsername] = useState("");
  const usernameCharacterCount = username.length;

  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SocialUser[]>([]); // Assuming the shape of your user data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [errorMsg, setErrorMsg] = useState<String>();
  const [hasError, setHasError] = useState<boolean>();

  useEffect(() => {
    const createNewUser = async () => {
      console.log("inside createNewUser");
      setLoading(true);
      try {
        // Fetch initial data or perform any one-time tasks here
        const socialUser: SocialUser = await userService.createUser();
        console.log("Social user created:", socialUser);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("calling createNewUser");
    createNewUser();

    const fetchUsers = async () => {
      setLoading(true); // Set loading to true when API call begins
      try {
        if (searchText.trim() !== "") {
          console.log("searching:" + searchText);
          const results: SocialUser[] = await userService.getUsersByUserName(
            searchText
          );
          console.log("Results:" + JSON.stringify(results));
          console.log("Result size:" + results.length);
          if (results.length > 0) {
            setErrorMsg("Username is in use.");
            setHasError(true);
          } else {
            console.log("Username not found, setting error msg to undefined");

            if (!isValidUsername(searchText)) {
            } else {
              setErrorMsg(undefined);
              setHasError(false);
            }
          }
          setSearchResults(results);
        } else {
          setSearchResults([]); // Clear search results if search text is empty
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false when API call finishes
      }
    };

    const debounceTimer = setTimeout(fetchUsers, 400);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchText]);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setUsername(text);
    if (text === "") {
      setErrorMsg(undefined);
      setHasError(false);
    } else {
      // Validate username format
      const validUsername = isValidUsername(text);
      if (!validUsername) {
        setErrorMsg("Invalid Characters"); // Set inUse to true if username is invalid
      }
      setHasError(true);
    }
  };

  const isValidUsername = (username: string) => {
    return /^[a-zA-Z0-9_.]+$/.test(username);
  };

  const isNextDisabled =
    usernameCharacterCount > 20 ||
    usernameCharacterCount === 0 ||
    hasError ||
    loading;
  const handleClearUserName = () => {
    setUsername("");
    setSearchText("");
    setErrorMsg(undefined);
    setHasError(false);
  };

  const handleNext = async () => {
    try {
      console.log("handleSave");
      // You can perform any additional validation here if needed
      console.log("Saving: Username:" + username);
      const newUser = await userService.updateUserName(username);
      console.log("Updateusernameresponse:", newUser);

      navigation.reset({
        index: 0,
        routes: [{ name: "RushmoreTabContainer" }],
      });

      // Navigating to the next screen or performing any other actions
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle the error as needed (e.g., display an error message to the user)
    }
  };

  const handleSkipPressed = () => {
    // Perform login logic here
    console.log("Skip pressed");
    // Reset the navigation stack to start fresh with RushmoreTabContainer
    navigation.reset({
      index: 0,
      routes: [{ name: "RushmoreTabContainer" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Text Input */}
      <Text style={styles.title}>Create Username</Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Username"
          onChangeText={handleSearchChange}
          value={searchText}
          style={styles.input}
          maxLength={20} // Add this line to limit input to 20 characters
          right={
            <TextInput.Icon
              icon="close"
              onPress={handleClearUserName}
              color={username ? "black" : "transparent"}
            />
          }
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {!errorMsg ? null : (
          <HelperText type="error" visible={hasError}>
            {errorMsg}
          </HelperText>
        )}
        {/* Character Counter */}
        <View style={styles.counterContainer}>
          <Text>{`${usernameCharacterCount}/20`}</Text>
        </View>
      </View>

      {/* Information Text */}
      <Text style={styles.infoText}>
        Your username can only be changed once every 30 days.
      </Text>
      {/* Display ActivityIndicator from react-native-paper when loading is true */}
      <ActivityIndicator
        animating={loading}
        color="#0000ff" // Set your desired color
        size="large" // Set the size of the indicator
        hidesWhenStopped={true} // Hide the indicator when not animating
        style={styles.activityIndicator}
      />

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleSkipPressed()}>
          <Text>Skip</Text>
        </TouchableOpacity>
        <Button mode="contained" onPress={handleNext} disabled={isNextDisabled}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
  },
  counterContainer: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  infoText: {
    marginVertical: 8,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  activityIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%", // Place the indicator at the vertical center of the screen
  },
});
