import * as React from "react";
import { SafeAreaView, View, StyleSheet, Animated } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { AuthStackParamList } from "../nav/params/AuthStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type AuthResetPasswordCodeScreenProps = {
  navigation: NativeStackScreenProps<AuthStackParamList>;
  route: RouteProp<AuthStackParamList, "AuthResetPasswordCodeScreen">;
};

export const AuthResetPasswordCodeScreen = ({
  navigation,
  route,
}: AuthResetPasswordCodeScreenProps) => {
  const [email, setEmail] = useState<string>(route.params?.email || "");
  const [passwordText, setPasswordText] = useState("");
  const [codeText, setCodeText] = React.useState("");
  const [codeError, setCodeError] = React.useState<string | null>(null);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isComplexityValid, setIsComplexityValid] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [fadeInValue] = useState(new Animated.Value(0)); // Animated value for fading animation

  const isFormValid = () => {
    return (
      email.trim() !== "" &&
      passwordText.trim() !== "" &&
      codeText.trim() !== "" &&
      isLengthValid &&
      isComplexityValid
    );
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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleCodeChange = (code: string) => {
    setCodeText(code);

    const codeRegex = /^[a-zA-Z0-9]+$/;
    const isValidCode = codeRegex.test(code);

    setCodeError(isValidCode ? null : "Alphanumeric characters only");
  };

  async function forgotPasswordSubmit() {
    resetFade();

    console.log("forgotPassworldSubmit:");
    try {
      console.log("calling forgot passwordSubmit:");
      const data = await Auth.forgotPasswordSubmit(
        email,
        codeText,
        passwordText
      );
      console.log(JSON.stringify(data));
    } catch (err: any) {
      if (err.code === "CodeMismatchException") {
        console.log("error for Code Mismatch Exception");

        setCodeError("Invalid verification code");
        fadeIn();
      } else if (err.code === "LimitExceededException") {
        console.log("error for rate limit");
        setCodeError("Request limit exceeded. Please try again later.");
        fadeIn();
      } else {
        console.log("error Happening");
        console.error(err);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Code"
        mode="outlined"
        value={codeText}
        onChangeText={handleCodeChange}
        keyboardType="numeric"
      />
      {codeText.trim() !== "" && (
        <Animated.View
          style={{
            opacity: fadeInValue,
          }}
        >
          <HelperText type="error" visible={!!codeError}>
            {codeError}
          </HelperText>
        </Animated.View>
      )}
      <TextInput
        mode="outlined"
        label="Password"
        value={passwordText}
        secureTextEntry={!isPasswordVisible}
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? "eye" : "eye-off"}
            onPress={togglePasswordVisibility}
          />
        }
        onChangeText={handlePasswordChange}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
      />

      {(isPasswordFocused || !isLengthValid || !isComplexityValid) &&
        passwordText !== "" && (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name={isLengthValid ? "md-checkmark-circle" : "md-close-circle"}
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
                name={
                  isComplexityValid ? "md-checkmark-circle" : "md-close-circle"
                }
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
        onPress={forgotPasswordSubmit}
        disabled={!isFormValid()}
        style={{ marginVertical: 25 }}
      >
        Reset
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
