import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FriendsTopTabContainerParamList } from "./FriendsTopTabContainerParamList";
import { FollowingScreen } from "../friends/FollowingScreen";
import { FollowersScreen } from "../friends/FollowersScreen";
import { FriendsScreen } from "../friends/FriendsScreen";

const FriendsTopTab =
  createMaterialTopTabNavigator<FriendsTopTabContainerParamList>();

export const FriendsTopTabContainer = () => {
  return (
    <FriendsTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <FriendsTopTab.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{
          tabBarLabel: "Following",
        }}
      />
      <FriendsTopTab.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{
          tabBarLabel: "Followers",
        }}
      />
      <FriendsTopTab.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{
          tabBarLabel: "Friends",
        }}
      />
    </FriendsTopTab.Navigator>
  );
};
