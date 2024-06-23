import * as React from "react";
import {
  Button,
  HelperText,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { SafeAreaView, View, StyleSheet, Animated } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { Auth } from "aws-amplify"; // Import Amplify Auth
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { UserService } from "../service/UserService";
import { AuthStackParamList } from "../nav/params/AuthStackParamList";
import { globalStyles } from "../styles/globalStyles"; // Adjust the import path accordingly
import LoadingButton from "../components/LoadingButton";

type AppContainerStackScreenProps = NativeStackScreenProps<
  AppStackParamList & AuthStackParamList
>;

export const AuthLogInScreen = ({
  navigation,
}: AppContainerStackScreenProps) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [fadeInValue] = useState(new Animated.Value(0)); // Animated value for fading animation
  const [isLoading, setIsLoading] = useState(false); // Loading state for login process
  const userService = new UserService<SocialUser>();

  const isButtonEnabled = emailOrUsername.length > 0 && password.length >= 8;

  // Fade animation function
  const fadeIn = () => {
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  };

  // Reset fade animation
  const resetFade = () => {
    Animated.timing(fadeInValue, {
      toValue: 0,
      duration: 0, // Reset instantly
      useNativeDriver: true,
    }).start();
  };

  const handleLoginPress = async () => {
    setIsLoading(true); // Set loading state to true while awaiting authentication

    resetFade();
    try {
      // Sign in with email/username and password
      const user = await Auth.signIn(emailOrUsername, password);

      // If signUpResponse contains the tokens and set access token
      const accessToken = user?.signInUserSession?.accessToken?.jwtToken;
      const refreshToken = user?.signInUserSession?.refreshToken?.token;

      saveToken("accessToken", accessToken);
      saveToken("refreshToken", refreshToken);
      saveToken("uid", jwtDecode(accessToken).sub || "");

      //NOTE: fetch the user, if they don't have a username, direct them to the AuthCreateUsernameSCreen so they can get created
      const data: SocialUser = await userService.getMyUserProfile();

      if (null === data) {
        console.log(
          "This user needs created w/ a username, direct them to the username create screen. We have them in cognito, but not in rushmore app"
        );
        navigation.navigate("AuthCreateUsernameScreen"); // Change 'user' to 'cognitoUser'
      }

      // Reset the navigation stack to start fresh with RushmoreTabContainer
      navigation.reset({
        index: 0,
        routes: [{ name: "RushmoreTabContainer" }],
      });
    } catch (error) {
      setIsLoading(false); // Reset loading state in case of error

      fadeIn();
      console.error("Error signing in:", error);
      setLoginError("Invalid login credentials");
      //TODO:
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
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          label="Email"
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
              icon={isPasswordVisible ? "eye" : "eye-off"}
              onPress={togglePasswordVisibility}
            />
          }
          onChangeText={(text) => setPassword(text)}
          style={{ margin: 10 }}
        />

        <Animated.View
          style={{
            opacity: fadeInValue,
          }}
        >
          <HelperText type="error" visible={!!loginError}>
            {loginError}
          </HelperText>
        </Animated.View>

        <Button
          mode="text"
          onPress={() => {
            navigation.navigate("AuthStackContainer", {
              screen: "AuthResetPasswordEmailScreen",
            });
          }}
        >
          Forgot your password?
        </Button>
      </View>

      <LoadingButton
        onPress={handleLoginPress}
        isLoading={isLoading}
        disabled={!isButtonEnabled || isLoading}
        loadingText="Logging In..."
        buttonText="Log in"
        style={{ marginLeft: 5 }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text>Don't have an account?</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
