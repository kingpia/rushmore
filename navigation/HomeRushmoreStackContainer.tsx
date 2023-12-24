import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeRushmoreStackNavigatorParamList } from "./HomeRushmoreStackNavigatorParamList";
import { YourRushmoreHomeScreen } from "../rushmore/YourRushmoreHomeScreen";
import { RushmoreHomeScreen } from "../rushmore/RushmoreHomeScreen";
import { FollowingRushmoreHomeScreen } from "../rushmore/FollowingRushmoreHomeScreen";

const HomeRushmoreStackNavigator =
  createNativeStackNavigator<HomeRushmoreStackNavigatorParamList>();

export const HomeRushmoreStackContainer = () => {
  return (
    <HomeRushmoreStackNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // Hide the back button label
        headerShown: false,
      }}
    >
      <HomeRushmoreStackNavigator.Screen
        name="RushmoreHomeScreen"
        component={RushmoreHomeScreen}
      />
      <HomeRushmoreStackNavigator.Screen
        name="YourRushmoreHomeScreen"
        component={YourRushmoreHomeScreen}
      />
      <HomeRushmoreStackNavigator.Screen
        name="FollowingRushmoreHomeScreen"
        component={FollowingRushmoreHomeScreen}
      />
    </HomeRushmoreStackNavigator.Navigator>
  );
};
