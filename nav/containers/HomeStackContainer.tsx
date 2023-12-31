import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeStackParamList } from "../params/HomeStackParamList";
import { YourCompletedRushmoreScreen } from "../../rushmore/YourCompletedRushmoreScreen";
import { HomeTopTabContainer } from "./HomeTopTabContainer";
import { FollowingSolvedRushmoreScreen } from "../../rushmore/FollowingSolvedRushmoreScreen";
import { YourInProgressRushmoreScreen } from "../../rushmore/YourInProgressRushmoreScreen";
import { FollowingInProgressRushmoreScreen } from "../../rushmore/FollowingInProgressRushmoreScreen";

const HomeStackNavigaor = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackContainer = () => {
  return (
    <HomeStackNavigaor.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // Hide the back button label
      }}
    >
      <HomeStackNavigaor.Screen
        name="HomeTopTabContainer"
        component={HomeTopTabContainer}
      />
      <HomeStackNavigaor.Screen
        name="YourCompletedRushmoreScreen"
        component={YourCompletedRushmoreScreen}
        options={({ route }) => ({
          headerTitle:
            `${route.params?.rushmoreItem?.type} ${route.params?.rushmoreItem?.rushmoreTitle}` ||
            "Rushmore", // Set the title from navigation params
        })}
      />
      <HomeStackNavigaor.Screen
        name="YourInProgressRushmoreScreen"
        component={YourInProgressRushmoreScreen}
        options={({ route }) => ({
          headerTitle:
            `${route.params?.rushmoreItem?.type} ${route.params?.rushmoreItem?.rushmoreTitle}` ||
            "Rushmore", // Set the title from navigation params
        })}
      />
      <HomeStackNavigaor.Screen
        name="FollowingSolvedRushmoreScreen"
        component={FollowingSolvedRushmoreScreen}
        options={({ route }) => ({
          headerTitle:
            `${route.params?.rushmoreItem?.type} ${route.params?.rushmoreItem?.rushmoreTitle}` ||
            "Rushmore", // Set the title from navigation params
        })}
      />
      <HomeStackNavigaor.Screen
        name="FollowingInProgressRushmoreScreen"
        component={FollowingInProgressRushmoreScreen}
        options={({ route }) => ({
          headerTitle:
            `${route.params?.rushmoreItem?.type} ${route.params?.rushmoreItem?.rushmoreTitle}` ||
            "Rushmore", // Set the title from navigation params
        })}
      />
    </HomeStackNavigaor.Navigator>
  );
};
