import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
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
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false); // State to manage error modal visibility
  const [errorMessage, setErrorMessage] = useState<string>(""); // State to store error message
  const [name, setName] = useState<string>(
    route.params?.userData.nickName || ""
  );

  const handleClearName = () => {
    setName("");
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
      setErrorMessage(error.message); // Set error message
      setErrorModalVisible(true); // Show error modal
    }
  };

  const characterCount = name.length;
  const isSaveDisabled = characterCount === 0 || characterCount > 30;

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Edit Name</Text>
      {/* Text Input */}
      <View style={styles.inputContainer}>
        <TextInput
          label="Your Nickname"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          right={
            <TextInput.Icon
              icon="close"
              onPress={handleClearName}
              color={name ? "black" : "transparent"}
            />
          }
        />
      </View>

      {/* Character Counter */}
      <View style={styles.counterContainer}>
        <Text>{`${characterCount}/30`}</Text>
      </View>

      {/* Information Text */}
      <Text>Your nickname can only be changed once every 10 days.</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Cancel
        </Button>
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
  clearButton: {
    marginLeft: 8,
  },
  counterContainer: {
    alignItems: "flex-end",
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
