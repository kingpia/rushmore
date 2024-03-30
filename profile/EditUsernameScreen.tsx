import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/SettingsStackParamList";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";

type EditUsernameScreenProps = {
  navigation: NativeStackNavigationProp<EditUsernameScreenProps>;
  route: RouteProp<AppStackParamList, "EditUsernameScreen">;
};
export const EditUsernameScreen = ({
  route,
  navigation,
}: EditUsernameScreenProps) => {
  const [username, setUsername] = useState<string>(
    route.params?.userData.userName || ""
  );

  const handleClearName = () => {
    setUsername("");
  };

  const handleSave = () => {
    console.log("Saved");
  };

  const characterCount = username.length;
  const isSaveDisabled = characterCount === 0 || characterCount > 30;

  return (
    <SafeAreaView style={styles.container}>
      {/* Text Input */}
      <View style={styles.inputContainer}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
      </View>

      {/* Character Counter */}
      <View style={styles.counterContainer}>
        <Text>{`${characterCount}/30`}</Text>
      </View>

      {/* Information Text */}
      <Text style={styles.infoText}>
        Your username can only be changed once every 30 days.
      </Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Cancel
        </Button>
        <Button mode="contained" onPress={handleSave} disabled={isSaveDisabled}>
          Save
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
  infoText: {
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
