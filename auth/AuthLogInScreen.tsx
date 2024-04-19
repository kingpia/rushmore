import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { Auth } from "aws-amplify"; // Import Amplify Auth
import * as SecureStore from "expo-secure-store";

type AppContainerStackScreenProps = NativeStackScreenProps<AppStackParamList>;

export const AuthLogInScreen = ({
  navigation,
}: AppContainerStackScreenProps) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isButtonEnabled = emailOrUsername.length > 0 && password.length >= 8;

  const handleLoginPress = async () => {
    try {
      // Sign in with email/username and password
      const user = await Auth.signIn(emailOrUsername, password);

      // If signUpResponse contains the tokens and set access token
      const accessToken = user?.signInUserSession?.accessToken?.jwtToken;
      const refreshToken = user?.signInUserSession?.refreshToken?.token;

      saveToken("accessToken", accessToken);
      saveToken("refreshToken", refreshToken);
      // Reset the navigation stack to start fresh with RushmoreTabContainer
      navigation.reset({
        index: 0,
        routes: [{ name: "RushmoreTabContainer" }],
      });
    } catch (error) {
      console.error("Error signing in:", error);
      // If login is unsuccessful, display an alert
    }
  };

  async function saveToken(key: string, value: string) {
    console.log("Saving Token" + key);
    await SecureStore.setItemAsync(key, value);
  }

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
            navigation.navigate("AuthStackContainer", {
              screen: "AuthResetPasswordEmailScreen",
            });
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
            navigation.navigate("AuthStackContainer", {
              screen: "AuthHomeScreen",
            });
          }}
        >
          Sign Up
        </Button>
      </View>
    </SafeAreaView>
  );
};
