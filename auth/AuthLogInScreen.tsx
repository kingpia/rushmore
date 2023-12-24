import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RushmoreStackParamList } from "../navigation/RushmoreStackParamList";

type StackContainerScreenProps = NativeStackScreenProps<RushmoreStackParamList>;

export const AuthLogInScreen = ({ navigation }: StackContainerScreenProps) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isButtonEnabled = emailOrUsername.length > 0 && password.length >= 8;

  const handleLoginPress = () => {
    // Perform login logic here
    console.log("Login pressed");
    navigation.navigate("Tab", { screen: "RushmoreHomeScreen" });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          label="Email or Username"
          value={emailOrUsername}
          onChangeText={(text) => setEmailOrUsername(text)}
          mode="outlined"
          style={{ margin: 10 }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          secureTextEntry={!isPasswordVisible}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onPress={togglePasswordVisibility}
            />
          }
          onChangeText={(text) => setPassword(text)}
          style={{ margin: 10 }}
        />
        <Button
          mode="text"
          onPress={() => {
            // Navigate to the forgot password
            console.log("Navigate to Forgot Password Screen");
            navigation.navigate("AuthResetPasswordEmailScreen");
          }}
        >
          Forgot Password
        </Button>

        <Button
          mode="contained"
          onPress={handleLoginPress}
          disabled={!isButtonEnabled}
          style={{ margin: 10 }}
        >
          Log in
        </Button>
      </View>

      <View>
        <Button
          mode="text"
          onPress={() => {
            navigation.navigate("AuthHomeScreen");
          }}
        >
          Sign Up
        </Button>
      </View>
    </SafeAreaView>
  );
};
