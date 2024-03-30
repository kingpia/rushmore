import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { RouteProp } from "@react-navigation/native";

type EditNameScreenProps = {
  navigation: NativeStackNavigationProp<EditNameScreenProps>;
  route: RouteProp<AppStackParamList, "EditNameScreen">;
};

export const EditNameScreen = ({ route, navigation }: EditNameScreenProps) => {
  const [name, setName] = useState<string>(
    route.params?.userData.nickName || ""
  );

  const handleClearName = () => {
    setName("");
  };

  const handleSave = () => {
    console.log("Saved");
  };

  const characterCount = name.length;
  const isSaveDisabled = characterCount === 0 || characterCount > 30;

  return (
    <SafeAreaView style={styles.container}>
      {/* Text Input */}
      <View style={styles.inputContainer}>
        <TextInput
          label="Your Nickname"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
      </View>

      {/* Character Counter */}
      <View style={styles.counterContainer}>
        <Text>{`${characterCount}/30`}</Text>
      </View>

      {/* Information Text */}
      <Text style={styles.infoText}>
        Your nickname can only be changed once every 10 days.
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
