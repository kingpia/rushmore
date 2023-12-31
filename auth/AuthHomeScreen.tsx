import * as React from "react";
import { Button, Text } from "react-native-paper";
import { SafeAreaView, View, StyleSheet } from "react-native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { AuthStackParamList } from "../nav/params/AuthStackParamList";

type HomeScreenProps = NativeStackScreenProps<AuthStackParamList>;

export const AuthHomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          <View style={styles.socialButton}>
            <Button
              icon="google"
              mode="contained"
              onPress={() => {}}
              style={styles.socialButtonInner}
            >
              Continue with Google
            </Button>
          </View>

          <View style={styles.socialButton}>
            <Button
              icon="apple"
              mode="contained"
              onPress={() => {}}
              style={styles.socialButtonInner}
            >
              Continue with Apple
            </Button>
          </View>

          <View style={styles.socialButton}>
            <Button
              icon="facebook"
              mode="contained"
              onPress={() => {}}
              style={styles.socialButtonInner}
            >
              Continue with Facebook
            </Button>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              navigation.push("AuthEmailSignUpScreen");
            }}
          >
            Continue with Email or Phone
          </Button>
        </View>
        {/* Already have an account? */}
        <View style={styles.loginContainer}>
          <Text>Already have an account?</Text>
          <Button onPress={() => navigation.push("AuthLogInScreen")}>
            Log in
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    width: "100%",
  },
  socialButtonsContainer: {
    marginVertical: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  socialButtonInner: {
    flex: 1,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});
