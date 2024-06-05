import * as React from "react";
import { SafeAreaView, View, StyleSheet, Alert } from "react-native";

import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../nav/params/AuthStackParamList";
import LoadingButton from "../components/LoadingButton";

type AuthResetPasswordEmailScreenProps =
  NativeStackScreenProps<AuthStackParamList>;

export const AuthResetPasswordEmailScreen = ({
  navigation,
}: AuthResetPasswordEmailScreenProps) => {
  const [emailText, setEmailText] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const isResetDisabled = !emailText || !!emailError;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    // A simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      await Auth.forgotPassword(emailText);
      console.log("Password reset instructions sent to:", emailText);
      navigation.push("AuthResetPasswordCodeScreen", {
        email: emailText,
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      Alert.alert("Error", "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
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
      <LoadingButton
        onPress={handleResetPassword}
        isLoading={isLoading}
        disabled={isResetDisabled}
        loadingText="Sending Code..."
        buttonText="Reset Password"
        style={{ marginVertical: 10 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
