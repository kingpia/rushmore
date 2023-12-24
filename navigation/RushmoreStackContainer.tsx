import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthHomeScreen } from "../auth/AuthHomeScreen";
import { AuthEmailSignUpScreen } from "../auth/AuthEmailSignUpScreen";
import { AuthResetPasswordEmailScreen } from "../auth/AuthResetPasswordEmailScreen";
import { AuthCreateUsernameScreen } from "../auth/AuthCreateUsernameScreen";
import { AuthLogInScreen } from "../auth/AuthLogInScreen";
import React from "react";
import { RushmoreStackParamList } from "./RushmoreStackParamList";
import { RushmoreTabContainer } from "./RushmoreTabContainer";

const RushmoreStackNavigator =
  createNativeStackNavigator<RushmoreStackParamList>();

export const RushmoreStackContainer = () => {
  return (
    <RushmoreStackNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // Hide the back button label
      }}
    >
      <RushmoreStackNavigator.Screen
        name="AuthHomeScreen"
        component={AuthHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <RushmoreStackNavigator.Screen
        name="AuthEmailSignUpScreen"
        component={AuthEmailSignUpScreen}
        options={{
          headerTitle: "", // Empty string to hide the title
        }}
      />
      <RushmoreStackNavigator.Screen
        name="AuthLogInScreen"
        component={AuthLogInScreen}
        options={{
          headerTitle: "", // Empty string to hide the title
        }}
      />
      <RushmoreStackNavigator.Screen
        name="AuthResetPasswordEmailScreen"
        component={AuthResetPasswordEmailScreen}
        options={{
          title: "Title: Auth Reset Password Email Screen",
        }}
      />
      <RushmoreStackNavigator.Screen
        name="AuthCreateUsernameScreen"
        component={AuthCreateUsernameScreen}
        options={{
          title: "Title: Auth Create Username Screen",
        }}
      />
      <RushmoreStackNavigator.Screen
        name="Tab"
        component={RushmoreTabContainer}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </RushmoreStackNavigator.Navigator>
  );
};
