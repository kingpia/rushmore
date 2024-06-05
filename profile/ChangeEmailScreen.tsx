import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Alert, View } from "react-native";
import {
  Text,
  TextInput,
  Button,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { Ionicons } from "@expo/vector-icons";
import { CognitoService } from "../service/CognitoService";
import { globalStyles } from "../styles/globalStyles";
import LoadingButton from "../components/LoadingButton";

const validateEmail = (email: string) => {
  // A simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

type ChangeEmailScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: any;
};

export const ChangeEmailScreen = ({ navigation }: ChangeEmailScreenProps) => {
  const cognitoService = new CognitoService();

  const [emailText, setEmailText] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);

  const handleEmailChange = (email: string) => {
    setEmailText(email);
    const isValidEmail = validateEmail(email);
    setEmailError(isValidEmail ? null : "Please enter a valid email address");
  };

  const isEmailValid = validateEmail(emailText);

  const sendVerificationCode = async () => {
    try {
      setIsSendingCode(true);
      await cognitoService.changeEmailSendCode(emailText);
      navigation.navigate("ChangeEmailCodeValidationScreen");
    } catch (error: any) {
      console.error("Error sending verification code:", error.message);
      Alert.alert(
        "Error",
        "Failed to send verification code. Please try again."
      );
    } finally {
      setIsSendingCode(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displaySmall" style={styles.headerText}>
        Change Email
      </Text>
      <TextInput
        mode="outlined"
        label="Email"
        value={emailText}
        right={
          <TextInput.Icon
            icon={(props) => <Ionicons name="mail" {...props} />}
          />
        }
        onChangeText={handleEmailChange}
      />
      <HelperText type="error" visible={!!emailError}>
        {emailError}
      </HelperText>
      <LoadingButton
        onPress={sendVerificationCode}
        isLoading={isSendingCode}
        disabled={!isEmailValid || isSendingCode}
        loadingText="Sending Code..."
        buttonText="Send Code"
        style={styles.sendCodeButton}
      />
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
  sendCodeButton: {
    marginTop: 16,
  },
});

export default ChangeEmailScreen;
