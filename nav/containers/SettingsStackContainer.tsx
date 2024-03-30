import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TermsAndPolicyScreen from "../../profile/TermsAndPolicyScreen";
import AccountScreen from "../../profile/AccountScreen";
import ProfileSettingsScreen from "../../profile/ProfileSettingsScreen";
import { SettingsStackParamList } from "../params/SettingsStackParamList";
import { ProfileHomeScreen } from "../../profile/ProfileHomeScreen";

const SettingsStackNavigator =
  createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStackContainer = () => {
  return (
    <SettingsStackNavigator.Navigator
      screenOptions={{
        headerShown: false, // Hide the back button label
      }}
    >
      <SettingsStackNavigator.Screen
        name="ProfileHomeScreen"
        component={ProfileHomeScreen}
      />
    </SettingsStackNavigator.Navigator>
  );
};
