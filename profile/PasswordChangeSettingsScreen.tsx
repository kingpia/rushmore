import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Animated, SafeAreaView, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  HelperText,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { CognitoService } from "../service/CognitoService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { globalStyles } from "../styles/globalStyles"; // Adjust the import path accordingly

type PassswordChangeSettingsScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

export const PasswordChangeSettingsScreen = ({
  navigation,
}: PassswordChangeSettingsScreenProps) => {
  const cognitoService = new CognitoService();

  const [currentPasswordText, setCurrentPasswordText] = useState("");

  const [passwordText, setPasswordText] = useState("");
  const [codeError, setCodeError] = React.useState<string | null>(null);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isComplexityValid, setIsComplexityValid] = useState(false);

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isCurrentPasswordFocused, setIsCurrentPasswordFocused] =
    useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [fadeInValue] = useState(new Animated.Value(0)); // Animated value for fading animation
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = () => {
    return passwordText.trim() !== "" && isLengthValid && isComplexityValid;
  };
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

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,20}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (password: string) => {
    setPasswordText(password);
    setIsLengthValid(password.length >= 8 && password.length <= 20);
    setIsComplexityValid(validatePassword(password));
  };
  const handleCurrentPasswordChange = (password: string) => {
    setCurrentPasswordText(password);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleCurrentPasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handleCurrentPasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  async function changePasswordSubmit() {
    resetFade();
    setIsLoading(true);
    setCodeError(null); // Reset error before attempting to change password
    try {
      console.log(
        "Changing password, current:" +
          currentPasswordText +
          " new:" +
          passwordText
      );
      let response: any = await cognitoService.changePassword(
        currentPasswordText,
        passwordText
      );
      console.log("Success", "Password changed successfully!");
      navigation.navigate("AccountScreen");
    } catch (error) {
      console.error("Error changing password:", error);
      console.log("Error::" + JSON.stringify(error));
      setCodeError("Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
    console.log("changePasswordSubmit:");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displaySmall" style={styles.headerText}>
        Change Password
      </Text>
      <TextInput
        mode="outlined"
        label="Current Password"
        value={currentPasswordText}
        secureTextEntry={!isCurrentPasswordVisible}
        right={
          <TextInput.Icon
            icon={() => (
              <Ionicons
                name={isCurrentPasswordVisible ? "eye" : "eye-off"}
                size={20}
                onPress={toggleCurrentPasswordVisibility}
              />
            )}
          />
        }
        onChangeText={handleCurrentPasswordChange}
        onFocus={handleCurrentPasswordFocus}
        onBlur={handleCurrentPasswordBlur}
      />
      <TextInput
        mode="outlined"
        label="New Password"
        value={passwordText}
        secureTextEntry={!isPasswordVisible}
        right={
          <TextInput.Icon
            icon={() => (
              <Ionicons
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={20}
                onPress={togglePasswordVisibility}
              />
            )}
          />
        }
        onChangeText={handlePasswordChange}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
      />

      {codeError && (
        <HelperText type="error" visible={!!codeError}>
          {codeError}
        </HelperText>
      )}

      {(isPasswordFocused || !isLengthValid || !isComplexityValid) &&
        passwordText !== "" && (
          <>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name={isLengthValid ? "checkmark-circle" : "close-circle"}
                size={15}
                color={isLengthValid ? "green" : "red"}
              />
              <Text
                style={{
                  color: isLengthValid ? "green" : "red",
                  marginBottom: 5,
                }}
              >
                {" "}
                8-20 characters
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={isComplexityValid ? "checkmark-circle" : "close-circle"}
                size={15}
                color={isComplexityValid ? "green" : "red"}
              />
              <Text
                style={{
                  color: isComplexityValid ? "green" : "red",
                }}
              >
                {" "}
                Letters, numbers, and special characters
              </Text>
            </View>
          </>
        )}

      <Button
        mode="contained"
        onPress={changePasswordSubmit}
        disabled={!isFormValid() || isLoading}
        style={{ marginVertical: 25 }}
        contentStyle={{ flexDirection: "row-reverse" }}
        labelStyle={{ marginLeft: 5 }}
      >
        {isLoading ? (
          <View style={globalStyles.loadingContainer}>
            <ActivityIndicator
              animating={true}
              color="#ffffff"
              style={globalStyles.activityIndicator}
            />
            <Text style={globalStyles.loadingText}>Changing Password...</Text>
          </View>
        ) : (
          "Change Password"
        )}
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerText: {
    marginBottom: 16,
  },
});

export default PasswordChangeSettingsScreen;
