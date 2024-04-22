import * as React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../nav/params/AuthStackParamList";

type AuthResetPasswordEmailScreenProps =
  NativeStackScreenProps<AuthStackParamList>;

export const AuthResetPasswordEmailScreen = ({
  navigation,
}: AuthResetPasswordEmailScreenProps) => {
  const [emailText, setEmailText] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const isResetDisabled = !emailText || !!emailError;

  const validateEmail = (email: string) => {
    // A simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    try {
      await Auth.forgotPassword(emailText);
      console.log("Password reset instructions sent to:", emailText);
      // Navigate to the next screen (e.g., confirmation screen)
      navigation.push("AuthResetPasswordCodeScreen", {
        email: emailText,
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle error (e.g., display error message)
    }
  };

  const handleEmailChange = (email: string) => {
    setEmailText(email);
    const isValidEmail = validateEmail(email);
    setEmailError(isValidEmail ? null : "Please enter a valid email address");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ marginBottom: 10 }}>
        Enter your email address to reset your password. We will send an email
        with a confirmation code to reset your password.
      </Text>
      <TextInput
        mode="outlined"
        label="Email"
        value={emailText}
        right={<TextInput.Icon icon="email" />}
        onChangeText={handleEmailChange}
      />

      <HelperText type="error" visible={!!emailError}>
        {emailError}
      </HelperText>
      <Button
        mode="contained"
        onPress={handleResetPassword}
        disabled={isResetDisabled}
        style={{ marginVertical: 10 }}
      >
        Reset Password
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
