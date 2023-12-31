import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ProfileStackParamList } from "../params/ProfileStackParamList";
import { ProfileHomeScreen } from "../../profile/ProfileHomeScreen";
import { EditProfileScreen } from "../../profile/EditProfileScreen";

const ProfileStackNavigator =
  createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackContainer = () => {
  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: true, // Hide the back button label
      }}
    >
      <ProfileStackNavigator.Screen
        name="ProfileHomeScreen"
        component={ProfileHomeScreen}
        options={{
          headerShown: true,
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
