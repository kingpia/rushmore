import * as React from "react";
import { Button, HelperText, Text } from "react-native-paper";
import {
  Platform,
  Pressable,
  SafeAreaView,
  View,
  StyleSheet,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js"; // Import CognitoUser from the appropriate package
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../nav/params/AuthStackParamList";
import { Hub } from "aws-amplify";
import * as SecureStore from "expo-secure-store";

type AuthEmailSignUpScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

export const AuthEmailSignUpScreen = ({
  navigation,
}: AuthEmailSignUpScreenProps) => {
  //Form
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [countdown, setCountdown] = useState(0);
  // Flag to track if the countdown is active
  const [countdownActive, setCountdownActive] = useState(false);

  //Control Date Picker visibility and textInput
  const [date, setDate] = useState(new Date());
  //Showing DatePicker Field
  const [showDatePicker, setShowDatePicker] = useState(false); //Showing datepicker

  //Error Notices
  const [emailError, setEmailError] = useState<string | null>(null);
  const [codeError, setCodeError] = React.useState<string | null>(null);

  // PasswordValidation field - Need Separate to handle both errors independently
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isComplexityValid, setIsComplexityValid] = useState(false);

  //Toggles the visibility of the password
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //Handles focus in order to show/don't show hints.
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  //Age Verification
  const [isAgeValid, setIsAgeValid] = useState<boolean | undefined>(true); // Add new state for age validation

  //codeText
  const [codeText, setCodeText] = React.useState("");

  // New state to handle the phone signup toggle
  const [isPhoneSignup, setIsPhoneSignup] = useState(false);

  // New state for phone number
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState<string>(); //the returned user from signup

  const [isFormDisabled, setIsFormDisabled] = useState(false);

  // Toggle function for the "Sign up with phone" button
  const togglePhoneSignup = () => {
    setIsPhoneSignup(!isPhoneSignup);
    setPhoneNumber(""); // Clear phone number when toggling
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Function to handle button click
  const handleSendCodeClick = () => {
    // Start the countdown if not already active
    if (!countdownActive) {
      setCountdown(180);
      setCountdownActive(true);

      // Logic to send code can be added here if needed
      //Call handleSendCodeHere
      console.log("Email:" + emailText);
      console.log("Password:" + passwordText);
      console.log("DOB:" + dateOfBirth);
      handleSendCode(emailText, passwordText);
    }
  };

  // Effect to manage countdown
  useEffect(() => {
    listenToAutoSignInEvent();

    let countdownInterval: string | number | NodeJS.Timeout | undefined;

    if (countdownActive && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCountdownActive(false);
    }

    // Clear the interval when component unmounts or countdown is complete
    return () => clearInterval(countdownInterval);
  }, [countdownActive, countdown]);

  const validateEmail = (email: string) => {
    // A simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,20}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleEmailChange = (email: string) => {
    setEmailText(email);
    const isValidEmail = validateEmail(email);
    setEmailError(isValidEmail ? null : "Please enter a valid email address");
  };

  const handlePasswordChange = (password: string) => {
    setPasswordText(password);
    setIsLengthValid(password.length >= 8 && password.length <= 20);
    setIsComplexityValid(validatePassword(password));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleAgeValidation = (selectedDate?: Date) => {
    const thirteenYearsAgo = new Date();
    thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
    const isDateValid = selectedDate && selectedDate <= thirteenYearsAgo;
    setIsAgeValid(isDateValid);
    return isDateValid;
  };

  const onDatePickerChange = (
    { type }: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (type === "set" && selectedDate) {
      const currentDate: Date = selectedDate;

      // Perform age validation
      const isDateValid = handleAgeValidation(selectedDate);

      // Update state accordingly
      setDate(currentDate);
      setIsAgeValid(isDateValid);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    console.log("conrifmIOSDate" + date.toDateString);
    setDateOfBirth(date.toDateString());
    toggleDatePicker();
  };

  const handleCodeChange = (code: string) => {
    setCodeText(code);

    // Check for non-alphanumeric characters
    const codeRegex = /^[a-zA-Z0-9]+$/;
    const isValidCode = codeRegex.test(code);

    setCodeError(isValidCode ? null : "Alphanumeric characters only");
  };

  // Function to handle sending verification code
  const handleSendCode = async (email: string, password: string) => {
    try {
      const signUpResponse = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });

      // console.log(signUpResponse);

      setEmail(email);
      console.log("Cognito Sign Up Response:" + JSON.stringify(signUpResponse));

      // Handle success (e.g., show confirmation message to the user)
    } catch (error: any) {
      if (error.code === "UsernameExistsException") {
        resendConfirmationCode(email);
        //Fetch the user from AUTH since it already exists.
      } else {
        console.error("Error sending verification code:", error);
        setCodeError(error instanceof Error ? error.message : String(error));
        // Handle other errors
      }
    }
  };

  // Function to resend confirmation code
  const resendConfirmationCode = async (email: string) => {
    console.log("resending confiirmation email:" + email);
    try {
      const data: CognitoUser = await Auth.resendSignUp(email);
      console.log("RsendConfirmationCode:" + JSON.stringify(data));

      console.log("RE-confirmation code resent successfully setting the user");
      setEmail(email);
      // Handle success (e.g., show confirmation message to the user)
    } catch (error) {
      console.error("Error resending confirmation code:", error);
      setCodeError(error instanceof Error ? error.message : String(error));
    }
  };

  const handleNextButtonClick = async () => {
    console.log("Next button email click:" + email);

    try {
      if (!email) {
        throw new Error("Email is required."); // Throw an error if email is undefined
      }

      //DISABLE all the inputs and buttons. DateTimePicker, email, code, send code and next button.
      // Disable the form to prevent further user input
      setIsFormDisabled(true);
      //Call the confirm, which will eventually return an event that we are listening to with Hub.listen
      await Auth.confirmSignUp(
        email, // Use email directly
        codeText
      );
    } catch (error) {
      setIsFormDisabled(false);
      console.log("error confirming sign up", error);
      setCodeError(error instanceof Error ? error.message : String(error));
      //TODO Show Helper error here
    }
  };

  async function listenToAutoSignInEvent() {
    //TODO figure out a way to unsubscribe after getting the auth event
    const unsubscribe = Hub.listen("auth", async ({ payload }) => {
      const { event } = payload;
      if (event === "autoSignIn") {
        console.log("AutoSignInEvent received");
        const user = payload.data;
        //console.log("userPayload:" + JSON.stringify(user));

        // If signUpResponse contains the tokens and set access token
        const accessToken = user?.signInUserSession?.accessToken?.jwtToken;
        const refreshToken = user?.signInUserSession?.refreshToken?.token;

        console.log("The refres token is :" + refreshToken);

        if (accessToken) {
          // Store the access token securely
          saveToken("accessToken", accessToken);
          saveToken("refreshToken", refreshToken);

          console.log("calling unsubscribe");

          navigation.navigate("AuthCreateUsernameScreen"); // Change 'user' to 'cognitoUser'
        }

        // assign user
      } else if (event === "autoSignIn_failure") {
        console.log("Auto sign in failed:");
        console.log("autosignin failed:" + JSON.stringify(event));
        // redirect to sign in page
      }
    });
  }

  async function saveToken(key: string, value: string) {
    console.log("Saving Token" + key);
    await SecureStore.setItemAsync(key, value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Date of Birth</Text>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            value={date}
            onChange={onDatePickerChange}
            style={styles.datePicker}
            disabled={isFormDisabled} // Disable the input if the form is disabled
          />
        )}
        {showDatePicker && Platform.OS === "ios" && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button mode="text" onPress={toggleDatePicker}>
              Cancel
            </Button>
            <Button mode="contained" onPress={confirmIOSDate}>
              Confirm
            </Button>
          </View>
        )}

        {!showDatePicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              mode="outlined"
              label="Date of Birth"
              value={dateOfBirth}
              right={<TextInput.Icon icon="calendar" />}
              onChangeText={setDateOfBirth}
              editable={false}
              onPressIn={toggleDatePicker}
            />
          </Pressable>
        )}

        {isAgeValid || !dateOfBirth ? null : (
          <HelperText type="error" visible={!isAgeValid}>
            Minimum age requirements not met
          </HelperText>
        )}
        <Text>Date of birth will not be used publicly</Text>

        <View>
          <Text>Email</Text>
        </View>
        <TextInput
          mode="outlined"
          label="Email"
          value={emailText}
          right={<TextInput.Icon icon="email" />}
          onChangeText={handleEmailChange}
          disabled={isFormDisabled} // Disable the input if the form is disabled
        />

        <HelperText type="error" visible={!!emailError}>
          {emailError}
        </HelperText>
        <Text>Password</Text>

        <View>
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
            disabled={isFormDisabled} // Disable the input if the form is disabled
          />

          {(isPasswordFocused || !isLengthValid || !isComplexityValid) &&
            passwordText !== "" && (
              <>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name={
                      isLengthValid ? "md-checkmark-circle" : "md-close-circle"
                    }
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name={
                      isComplexityValid
                        ? "md-checkmark-circle"
                        : "md-close-circle"
                    }
                    size={15}
                    color={isComplexityValid ? "green" : "red"}
                  />
                  <Text style={{ color: isComplexityValid ? "green" : "red" }}>
                    {" "}
                    Letters, numbers, and special characters
                  </Text>
                </View>
              </>
            )}
        </View>

        <Text>Code</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TextInput
            label="Code"
            mode="outlined"
            value={codeText}
            onChangeText={handleCodeChange}
            style={{ flex: 7 }}
            keyboardType="numeric" // Set the keyboardType prop to 'numeric'
            disabled={isFormDisabled} // Disable the input if the form is disabled
          />

          <Button
            mode="text"
            disabled={
              !isAgeValid ||
              !isLengthValid ||
              !isComplexityValid ||
              !validatePassword(passwordText) ||
              !validateEmail(emailText) ||
              countdown > 0 ||
              isFormDisabled
            }
            onPress={handleSendCodeClick}
            style={{ flex: 3, alignSelf: "center" }}
          >
            {countdown > 0 ? `${countdown}` : "Send Code"}
          </Button>
        </View>
        {codeText.trim() !== "" && (
          <HelperText type="error" visible={!!codeError}>
            {codeError}
          </HelperText>
        )}
        <Button
          mode="contained"
          disabled={
            !(
              (validateEmail(emailText) &&
                isLengthValid &&
                isComplexityValid &&
                validatePassword(passwordText) &&
                (isAgeValid || false) &&
                dateOfBirth !== null &&
                dateOfBirth !== "" &&
                codeText !== "" &&
                !codeError &&
                countdown > 0) ||
              isFormDisabled
            )
          }
          style={styles.button}
          onPress={handleNextButtonClick} // Add onPress event handler
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    height: 190,
    marginTop: -10,
  },

  container: {
    flex: 1,
    margin: 10,
  },
  button: {
    margin: 10,
  },
  text: {
    paddingVertical: 10,
  },
});
