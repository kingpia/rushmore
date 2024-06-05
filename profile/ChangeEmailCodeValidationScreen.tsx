import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { CognitoService } from "../service/CognitoService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import LoadingButton from "../components/LoadingButton";

type ChangeEmailCodeValidationScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

export const ChangeEmailCodeValidationScreen = ({
  navigation,
}: ChangeEmailCodeValidationScreenProps) => {
  const cognitoService = new CognitoService();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isChangingEmail, setIsChangingEmail] = useState<boolean>(false);

  const handleChangeEmail = async () => {
    if (!/^[a-zA-Z0-9]+$/.test(verificationCode)) {
      setError("Verification code must be alphanumeric.");
      return;
    }

    try {
      setIsChangingEmail(true);
      setError(null);
      await cognitoService.changeEmailVerifyCode(verificationCode);
      Alert.alert("Success", "Email changed successfully!");
      navigation.navigate("UserInfoSettingsScreen");
    } catch (err: any) {
      console.error(
        "Error in change email code validation screen:" + err.message
      );

      setError(err.message);
    } finally {
      setIsChangingEmail(false);
    }
  };

  const isCodeValid = /^[a-zA-Z0-9]+$/.test(verificationCode);

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displaySmall" style={styles.headerText}>
        Code Validation
      </Text>
      <TextInput
        mode="outlined"
        label="Verification Code"
        value={verificationCode}
        keyboardType="numeric"
        onChangeText={setVerificationCode}
        error={!!error}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <LoadingButton
        onPress={handleChangeEmail}
        isLoading={isChangingEmail}
        disabled={!isCodeValid || isChangingEmail}
        loadingText="Changing Email..."
        buttonText="Change Email"
        style={styles.changeEmailButton}
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
  changeEmailButton: {
    marginTop: 16,
  },
});

export default ChangeEmailCodeValidationScreen;
