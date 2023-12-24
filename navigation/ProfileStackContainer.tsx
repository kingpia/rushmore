import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RushmoreTabContainer } from "./RushmoreTabContainer";
import { ProfileStackParamList } from "./ProfileStackContainerParamList";
import { ProfileHomeScreen } from "../profile/ProfileHomeScreen";
import { EditProfileScreen } from "../profile/EditProfileScreen";

const ProfileStackNavigator =
  createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackContainer = () => {
  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // Hide the back button label
      }}
    >
      <ProfileStackNavigator.Screen
        name="ProfileHomeScreen"
        component={ProfileHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStackNavigator.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerTitle: "", // Empty string to hide the title
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
};
