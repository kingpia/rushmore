import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput as NativeTextInput,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Modal,
  Portal,
  HelperText,
} from "react-native-paper";
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
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [username, setUsername] = useState("");
  const inputRef = useRef<NativeTextInput>(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500); // Delay in milliseconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (errorMsg === "Invalid Characters") {
        console.log("Don't fetch here because of invalid characters");
      } else {
        try {
          if (
            searchText.trim() !== "" &&
            searchText != route.params?.userData.userName
          ) {
            const results: SocialUser[] = await userService.getUsersByUserName(
              searchText
            );
            if (results.length > 0) {
              setErrorMsg("Username is in use.");
              setHasError(true);
            } else {
              if (!isValidUsername(searchText)) {
              } else {
                setErrorMsg(undefined);
                setHasError(false);
              }
            }
            setSearchResults(results);
          } else {
            setErrorMsg(undefined);
            setHasError(false);
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
        }
      }
    };
    const debounceTimer = setTimeout(fetchUsers, 400);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchText]);

  useEffect(() => {
    if (lastUserNameUpdatedDt) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const lastUpdateDate = parseDate(lastUserNameUpdatedDt);
      if (lastUpdateDate.getTime() > thirtyDaysAgo.getTime()) {
        setHasRecentUpdateError(true);
        setHasRecentUpdateErrorMsg(`Last updated ${lastUserNameUpdatedDt}`);
      }
    }
  }, [lastUserNameUpdatedDt]);

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
    inputRef.current?.focus();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let userData = await userService.updateUserName(username);
      navigation.navigate("EditProfileScreen", {
        user: userData,
      });
    } catch (error: any) {
      console.error("Error updating username:", error);
      setErrorMessage(error.message);
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const characterCount = username.length;
  const isSaveDisabled =
    characterCount === 0 ||
    characterCount > 30 ||
    hasError ||
    hasRecentUpdateError ||
    loading;

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setUsername(text);
    if (text === "") {
      setErrorMsg(undefined);
      setHasError(false);
    } else {
      const validUsername = isValidUsername(text);
      if (!validUsername) {
        setErrorMsg("Invalid Characters");
        setHasError(true);
      } else {
        setHasError(false);
        setErrorMsg("");
      }
    }
    inputRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Username</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          label="Username"
          onChangeText={handleSearchChange}
          value={searchText}
          style={styles.input}
          disabled={hasRecentUpdateError || loading}
          maxLength={20}
          right={
            searchText ? (
              <TextInput.Icon
                icon="close"
                onPress={handleClearUserName}
                color={searchText ? "black" : "transparent"}
              />
            ) : null
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
        <View style={styles.counterContainer}>
          <Text>{`${usernameCharacterCount}/20`}</Text>
        </View>
      </View>
      <Text style={styles.infoText}>
        Your username can only be changed once every 30 days.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <Button mode="contained" onPress={handleSave} disabled={isSaveDisabled}>
          {loading ? <ActivityIndicator color="#ffffff" /> : "Save"}
        </Button>
      </View>
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
