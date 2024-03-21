import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { FriendsStackParamList } from "../params/FriendsStackParamList";
import { FriendsTopTabContainer } from "./FriendsTopTabContainer";
import { UserProfileScreen } from "../../friends/UserProfileScreen";

const FriendsStackNavigator =
  createNativeStackNavigator<FriendsStackParamList>();

export const FriendsStackContainer = () => {
  return (
    <FriendsStackNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false, // Hide the header
      }}
    >
      <FriendsStackNavigator.Screen
        name="FriendsTopTabContainer"
        component={FriendsTopTabContainer}
      />
    </FriendsStackNavigator.Navigator>
  );
};
