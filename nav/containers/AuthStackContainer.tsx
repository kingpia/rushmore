import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthHomeScreen } from "../../auth/AuthHomeScreen";
import { AuthEmailSignUpScreen } from "../../auth/AuthEmailSignUpScreen";
import { AuthResetPasswordEmailScreen } from "../../auth/AuthResetPasswordEmailScreen";
import { AuthCreateUsernameScreen } from "../../auth/AuthCreateUsernameScreen";
import { AuthLogInScreen } from "../../auth/AuthLogInScreen";
import { AuthStackParamList } from "../params/AuthStackParamList";
import { AuthResetPasswordCodeScreen } from "../../auth/AuthResetPassswordCodeScreen";

const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackContainer = () => {
  return (
    <AuthStackNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // Hide the back button label
      }}
    >
      <AuthStackNavigator.Screen
        name="AuthHomeScreen"
        component={AuthHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStackNavigator.Screen
        name="AuthEmailSignUpScreen"
        component={AuthEmailSignUpScreen}
        options={{
          headerTitle: "", // Empty string to hide the title
        }}
      />
      <AuthStackNavigator.Screen
        name="AuthLogInScreen"
        component={AuthLogInScreen}
        options={{
          headerTitle: "Sign In", // Empty string to hide the title
        }}
      />
      <AuthStackNavigator.Screen
        name="AuthResetPasswordEmailScreen"
        component={AuthResetPasswordEmailScreen}
        options={{
          title: "Forgot Password",
        }}
      />
      <AuthStackNavigator.Screen
        name="AuthResetPasswordCodeScreen"
        component={AuthResetPasswordCodeScreen}
        options={{
          title: "Forgot Password",
        }}
      />
      <AuthStackNavigator.Screen
        name="AuthCreateUsernameScreen"
        component={AuthCreateUsernameScreen}
        options={{
          title: "Title: Auth Create Username Screen",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </AuthStackNavigator.Navigator>
  );
};
