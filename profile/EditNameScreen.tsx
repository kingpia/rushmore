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

type EditNickNameScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "EditNameScreen">;
};

export const EditNameScreen = ({
  route,
  navigation,
}: EditNickNameScreenProps) => {
  const userService = new UserService<SocialUser>();
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false); // State to manage error modal visibility
  const [errorMessage, setErrorMessage] = useState<string>(""); // State to store error message
  const [nickName, setNickName] = useState("");

  const nickNameCharacterCount = nickName.length;
  const [searchText, setSearchText] = useState<string>(
    route.params?.userData.nickName || ""
  );
  const [searchResults, setSearchResults] = useState<SocialUser[]>(); // Assuming the shape of your user data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [errorMsg, setErrorMsg] = useState<String>();
  const [hasError, setHasError] = useState<boolean>();
  const [hasRecentUpdateError, setHasRecentUpdateError] = useState<boolean>();
  const [hasRecentUpdateErrorMsg, setHasRecentUpdateErrorMsg] =
    useState<string>("");

  const [lastNickNameUpdatedDt, setLastNickNameUpdatedDt] = useState<
    string | null
  >(route.params?.userData.lastNickNameUpdatedDt || null);

  console.log("LastNickNameUpdatedDt:" + lastNickNameUpdatedDt);

  useEffect(() => {
    console.log("lastUpdatedDt useEffect");
    if (lastNickNameUpdatedDt) {
      console.log("lastNickNameUpdatedDt" + lastNickNameUpdatedDt);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const lastUpdateDate = parseDate(lastNickNameUpdatedDt);
      console.log(lastUpdateDate);
      if (lastUpdateDate.getTime() > thirtyDaysAgo.getTime()) {
        console.log("updatedDt is very recent: " + lastUpdateDate);
        setHasRecentUpdateError(true);
        setHasRecentUpdateErrorMsg(`Last updated ${lastNickNameUpdatedDt}`);
        console.log("Setting error because of recent update:");
      }
    }
  }, [lastNickNameUpdatedDt]);

  // Function to parse date string into a Date object using date-fns
  const parseDate = (dateString: string) => {
    const parsedDate = parse(
      dateString,
      "EEE MMM dd HH:mm:ss 'GMT' yyyy",
      new Date()
    );
    return parsedDate;
  };

  const isValidNickName = (nickName: string) => {
    return /^[a-zA-Z0-9_. -]+$/.test(nickName);
  };
  const handleClearNickName = () => {
    setNickName("");
    setSearchText("");
  };

  const handleSave = async () => {
    try {
      let userData = await userService.updateNickName(nickName);
      console.log("nickname updated successfully to :" + userData.nickName);
      navigation.navigate("EditProfileScreen", {
        user: userData,
      });
    } catch (error: any) {
      console.error("Error updating nickname:", error);
      setErrorMessage(error.message); // Set error message
      setErrorModalVisible(true); // Show error modal
    }
  };

  const characterCount = nickName.length;
  const isSaveDisabled =
    characterCount === 0 ||
    characterCount > 30 ||
    hasError ||
    hasRecentUpdateError;

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setNickName(text);
    if (text === "") {
      console.log("setting has Error to falkse");

      setErrorMsg(undefined);
      setHasError(false);
    } else {
      // Validate nickname format
      const validNickName = isValidNickName(text);
      if (!validNickName) {
        setErrorMsg("Invalid Characters"); // Set inUse to true if nickname is invalid
        setHasError(true);
      } else {
        console.log("setting has Error to false");
        setHasError(false);
        setErrorMsg(""); // Set inUse to true if nickname is invalid
      }
      console.log("Setting error to true");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Edit Name</Text>

      {/* Text Input */}
      <View style={styles.inputContainer}>
        <TextInput
          label="Nickname"
          onChangeText={handleSearchChange}
          value={searchText}
          style={styles.input}
          disabled={hasRecentUpdateError} // Set editable based on hasRecentUpdateError state
          maxLength={20} // Add this line to limit input to 20 characters
          right={
            <TextInput.Icon
              icon="close"
              onPress={handleClearNickName}
              color={nickName ? "black" : "transparent"}
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
          <Text>{`${nickNameCharacterCount}/20`}</Text>
        </View>
      </View>

      {/* Information Text */}
      <Text style={styles.infoText}>
        Your nickname can only be changed once every 10 days.
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
