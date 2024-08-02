import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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

type EditNickNameScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "EditNameScreen">;
};

export const EditNameScreen = ({
  route,
  navigation,
}: EditNickNameScreenProps) => {
  const userService = new UserService<SocialUser>();
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [nickName, setNickName] = useState("");
  const inputRef = useRef<TextInput>(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500); // Delay in milliseconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (lastNickNameUpdatedDt) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const lastUpdateDate = parseDate(lastNickNameUpdatedDt);
      if (lastUpdateDate.getTime() > thirtyDaysAgo.getTime()) {
        setHasRecentUpdateError(true);
        setHasRecentUpdateErrorMsg(`Last updated ${lastNickNameUpdatedDt}`);
      }
    }
  }, [lastNickNameUpdatedDt]);

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
    setLoading(true);
    try {
      let userData = await userService.updateNickName(nickName);
      navigation.navigate("EditProfileScreen", {
        user: userData,
      });
    } catch (error: any) {
      console.error("Error updating nickname:", error);
      setErrorMessage(error.message);
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const characterCount = nickName.length;
  const isSaveDisabled =
    characterCount === 0 ||
    characterCount > 30 ||
    hasError ||
    hasRecentUpdateError ||
    loading;

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setNickName(text);
    if (text === "") {
      setErrorMsg(undefined);
      setHasError(false);
    } else {
      const validNickName = isValidNickName(text);
      if (!validNickName) {
        setErrorMsg("Invalid Characters");
        setHasError(true);
      } else {
        setHasError(false);
        setErrorMsg("");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          label="Nickname"
          onChangeText={handleSearchChange}
          value={searchText}
          style={styles.input}
          disabled={hasRecentUpdateError || loading}
          maxLength={20}
          right={
            searchText ? (
              <TextInput.Icon
                icon="close"
                onPress={handleClearNickName}
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
          <Text>{`${nickNameCharacterCount}/20`}</Text>
        </View>
      </View>
      <Text style={styles.infoText}>
        Your nickname can only be changed once every 10 days.
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
