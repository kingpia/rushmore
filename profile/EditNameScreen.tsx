import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, Portal, Modal } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { RouteProp } from "@react-navigation/native";
import { UserService } from "../service/UserService";

type EditNameScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "EditUsernameScreen">;
};

export const EditNameScreen = ({ route, navigation }: EditNameScreenProps) => {
  const userService = new UserService<SocialUser>();
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [name, setName] = useState<string>(
    route.params?.userData.nickName || ""
  );
  const [isModified, setIsModified] = useState<boolean>(false); // New state to track if the input is modified

  const handleClearName = () => {
    setName("");
    setIsModified(false); // Clearing input also means it's not modified
  };

  const handleSave = async () => {
    try {
      let userData = await userService.updateNickName(name);
      console.log("Username updated successfully to :" + userData.nickName);
      navigation.navigate("EditProfileScreen", {
        user: userData,
      });
    } catch (error: any) {
      console.error("Error updating nickname:", error);
      setErrorMessage(error.message);
      setErrorModalVisible(true);
    }
  };

  const characterCount = name.length;
  const isSaveDisabled = characterCount === 0 || characterCount > 20;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Your Nickname"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setIsModified(true); // Set isModified to true when the input changes
          }}
          style={styles.input}
          right={
            isModified && ( // Only display the clear icon if the input is modified
              <TextInput.Icon
                icon="close"
                onPress={handleClearName}
                color={name ? "black" : "transparent"}
              />
            )
          }
        />
      </View>

      <View style={styles.counterContainer}>
        <Text>{`${characterCount}/20`}</Text>
      </View>

      <Text>Your nickname can only be changed once every 10 days.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <Button mode="contained" onPress={handleSave} disabled={isSaveDisabled}>
          Save
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
