import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeStackParamList } from "../params/HomeStackParamList";
import { MyCompletedRushmoreScreen } from "../../rushmore/MyCompletedRushmoreScreen";
import { HomeTopTabContainer } from "./HomeTopTabContainer";
import { FollowingSolvedRushmoreScreen } from "../../rushmore/FollowingSolvedRushmoreScreen";
import { MyInProgressRushmoreScreen } from "../../rushmore/MyInProgressRushmoreScreen";

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
        name="MyCompletedRushmoreScreen"
        component={MyCompletedRushmoreScreen}
        options={({ route }) => ({
          headerTitle:
            `${route.params?.rushmoreItem?.rushmoreType} ${route.params?.rushmoreItem?.rushmore.title}` ||
            "Rushmore", // Set the title from navigation params
        })}
      />
      <HomeStackNavigaor.Screen
        name="MyInProgressRushmoreScreen"
        component={MyInProgressRushmoreScreen}
        options={({ route }) => ({
          headerTitle:
            `${route.params?.rushmoreItem?.rushmoreType} ${route.params?.rushmoreItem?.rushmore.title}` ||
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
    </HomeStackNavigaor.Navigator>
  );
};
