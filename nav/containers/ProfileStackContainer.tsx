import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ProfileStackParamList } from "../params/ProfileStackParamList";
import { ProfileHomeScreen } from "../../profile/ProfileHomeScreen";
import { EditProfileScreen } from "../../profile/EditProfileScreen";
import { EditNameScreen } from "../../profile/EditNameScreen";
import { EditUsernameScreen } from "../../profile/EditUsernameScreen";

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
      />
      <ProfileStackNavigator.Screen
        name="EditNameScreen"
        component={EditNameScreen}
        options={{
          headerTitle: "", // Empty string to hide the title
        }}
      />
      <ProfileStackNavigator.Screen
        name="EditUsernameScreen"
        component={EditUsernameScreen}
        options={{
          headerTitle: "", // Empty string to hide the title
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
};
