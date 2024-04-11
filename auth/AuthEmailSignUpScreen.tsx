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

export const AuthEmailSignUpScreen = () => {
  //TODO: On the of all the fields, you need to enable or disable "send code" or "next"

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
      setCountdown(45);
      setCountdownActive(true);

      // Logic to send code can be added here if needed
    }
  };

  // Effect to manage countdown
  useEffect(() => {
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
  const handleSendCode = async (
    email: string,
    password: string,
    dob: string
  ) => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          birthdate: dob,
        },
      });
      console.log("Verification code sent successfully");
      // Handle success (e.g., show confirmation message to the user)
    } catch (error) {
      console.error("Error sending verification code:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Rushmore</Text>
        <Text>Date of Birth</Text>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            value={date}
            onChange={onDatePickerChange}
            style={styles.datePicker}
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
                icon={isPasswordVisible ? "eye-off" : "eye"}
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
                    name={
                      isLengthValid ? "md-checkmark-circle" : "md-close-circle"
                    }
                    size={15}
                    color={isLengthValid ? "green" : "red"}
                  />
                  <Text style={{ color: isLengthValid ? "green" : "red" }}>
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
          />
          <Button
            mode="text"
            disabled={
              !isAgeValid ||
              !isLengthValid ||
              !isComplexityValid ||
              !validatePassword(passwordText) ||
              !validateEmail(emailText) ||
              countdown > 0
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
              validateEmail(emailText) &&
              isLengthValid &&
              isComplexityValid &&
              validatePassword(passwordText) &&
              (isAgeValid || false) &&
              dateOfBirth !== null &&
              dateOfBirth !== "" &&
              codeText !== "" &&
              !codeError &&
              countdown > 0
            )
          }
          style={styles.button}
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
