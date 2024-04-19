import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Modal,
  Portal,
  HelperText,
} from "react-native-paper"; // Import necessary components
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { UserService } from "../service/UserService";

type EditUsernameScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "EditUsernameScreen">;
};

export const EditUsernameScreen = ({
  route,
  navigation,
}: EditUsernameScreenProps) => {
  const userService = new UserService<SocialUser>();
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false); // State to manage error modal visibility
  const [errorMessage, setErrorMessage] = useState<string>(""); // State to store error message
  const [username, setUsername] = useState("");

  const usernameCharacterCount = username.length;

  const [searchText, setSearchText] = useState<string>(
    route.params?.userData.userName || ""
  );
  const [searchResults, setSearchResults] = useState<SocialUser[]>([]); // Assuming the shape of your user data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [errorMsg, setErrorMsg] = useState<String>();
  const [hasError, setHasError] = useState<boolean>();

  useEffect(() => {
    console.log("Use effect Running");
    console.log("Username:" + route.params?.userData.userName);

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

  const isValidUsername = (username: string) => {
    return /^[a-zA-Z0-9_.]+$/.test(username);
  };

  const handleClearUserName = () => {
    setUsername("");
    setSearchText("");
  };

  const handleSave = async () => {
    try {
      let userData = await userService.updateUserName(username);
      console.log("Username updated successfully to :" + userData.userName);
      navigation.navigate("EditProfileScreen", {
        user: userData,
      });
    } catch (error: any) {
      console.error("Error updating username:", error);
      setErrorMessage(error.message); // Set error message
      setErrorModalVisible(true); // Show error modal
    }
  };

  const characterCount = username.length;
  const isSaveDisabled =
    characterCount === 0 || characterCount > 30 || hasError;

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Edit Username</Text>

      {/* Text Input */}
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

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <Button mode="contained" onPress={handleSave} disabled={isSaveDisabled}>
          Save
        </Button>
      </View>

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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  counterContainer: {
    alignItems: "flex-end",
    marginVertical: 8,
  },
  infoText: {
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 4,
  },
});
