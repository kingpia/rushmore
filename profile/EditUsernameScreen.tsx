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
import { parse } from "date-fns";

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
  const [searchResults, setSearchResults] = useState<SocialUser[]>(); // Assuming the shape of your user data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [errorMsg, setErrorMsg] = useState<String>();
  const [hasError, setHasError] = useState<boolean>();
  const [hasRecentUpdateError, setHasRecentUpdateError] = useState<boolean>();
  const [hasRecentUpdateErrorMsg, setHasRecentUpdateErrorMsg] =
    useState<string>("");

  const [lastUserNameUpdatedDt, setLastUserNameUpdatedDt] = useState<
    string | null
  >(route.params?.userData.lastUserNameUpdatedDt || null);

  console.log("LastUserNameUpdatedDt:" + lastUserNameUpdatedDt);
  useEffect(() => {
    console.log("Use effect Running");
    console.log("Username:" + route.params?.userData.userName);
    console.log(
      "Data to edit screen:" + JSON.stringify(route.params?.userData)
    );

    const fetchUsers = async () => {
      //TODO we don't want to send shit character requests to the server.
      if (errorMsg === "Invalid Characters") {
        console.log("Dont fetch here because of invalid characters");
      } else {
        console.log("Inside FetchUsers useEffect");
        setLoading(true); // Set loading to true when API call begins
        try {
          if (
            searchText.trim() !== "" &&
            searchText != route.params?.userData.userName
          ) {
            console.log("Searching since text is present");
            console.log("searching:" + searchText);
            const results: SocialUser[] = await userService.getUsersByUserName(
              searchText
            );
            console.log("Results:" + JSON.stringify(results));
            //console.log("Result size:" + results.length);

            //TODO WE ARE HERE, RESULT WILL BE NULL IF NO USERS ARE FOUND
            //TODO OTHERWISE there will be something in the result.
            if (results.length > 0) {
              console.log("result is not null");
              setErrorMsg("Username is in use.");
              setHasError(true);
            } else {
              console.log(
                "Result is NULL, Username not found, setting error msg to undefined"
              );

              if (!isValidUsername(searchText)) {
              } else {
                console.log("setting has Error to falkse");
                setErrorMsg(undefined);
                setHasError(false);
              }
            }
            setSearchResults(results);
          } else {
            console.log("Same as before we should remove the in use error");
            setErrorMsg(undefined);
            console.log("setting has Error to falkse");

            setHasError(false);
            setSearchResults([]); // Clear search results if search text is empty
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false); // Set loading to false when API call finishes
        }
      }
    };
    console.log("before debounceTimer");
    const debounceTimer = setTimeout(fetchUsers, 400);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchText]);

  useEffect(() => {
    console.log("lastUpdatedDt useEffect");
    if (lastUserNameUpdatedDt) {
      console.log("lastUsernameUpdatedDt" + lastUserNameUpdatedDt);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const lastUpdateDate = parseDate(lastUserNameUpdatedDt);
      console.log(lastUpdateDate);
      if (lastUpdateDate.getTime() > thirtyDaysAgo.getTime()) {
        console.log("updatedDt is very recent: " + lastUpdateDate);
        setHasRecentUpdateError(true);
        setHasRecentUpdateErrorMsg(`Last updated ${lastUserNameUpdatedDt}`);
        console.log("Setting error because of recent update:");
      }
    }
  }, [lastUserNameUpdatedDt]);

  // Function to parse date string into a Date object using date-fns
  const parseDate = (dateString: string) => {
    const parsedDate = parse(
      dateString,
      "EEE MMM dd HH:mm:ss 'GMT' yyyy",
      new Date()
    );
    return parsedDate;
  };

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
    characterCount === 0 ||
    characterCount > 30 ||
    hasError ||
    hasRecentUpdateError;

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setUsername(text);
    if (text === "") {
      console.log("setting has Error to falkse");

      setErrorMsg(undefined);
      setHasError(false);
    } else {
      // Validate username format
      const validUsername = isValidUsername(text);
      if (!validUsername) {
        setErrorMsg("Invalid Characters"); // Set inUse to true if username is invalid
      } else {
        console.log("setting has Error to falkse");

        setHasError(false);
        setErrorMsg(""); // Set inUse to true if username is invalid
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
          disabled={hasRecentUpdateError} // Set editable based on hasRecentUpdateError state
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

        {!hasRecentUpdateError ? null : (
          <HelperText type="error" visible={hasRecentUpdateError}>
            {hasRecentUpdateErrorMsg}
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
