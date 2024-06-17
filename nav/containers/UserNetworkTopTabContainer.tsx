import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FollowingScreen } from "../../friends/FollowingScreen";
import { FollowersScreen } from "../../friends/FollowersScreen";
import { FriendsScreen } from "../../friends/FriendsScreen";
import { UserNetworkTopTabContainerParamList } from "../params/UserNetworkTopTabContainerParamList";

const UserNetworkTopTab =
  createMaterialTopTabNavigator<UserNetworkTopTabContainerParamList>();

export const UserNetworkTopTabContainer = () => {
  return (
    <UserNetworkTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "none",
          color: "#235868", // Blue Dianne
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#A9CFC8", // Jet Stream
          height: 4,
        },
        tabBarStyle: {
          backgroundColor: "#F5F5F5", // Light background to contrast with colors
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        },
        tabBarActiveTintColor: "#235868", // Blue Dianne
        tabBarInactiveTintColor: "#868649", // Shadow
      }}
    >
      <UserNetworkTopTab.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{
          tabBarLabel: "Following",
        }}
      />
      <UserNetworkTopTab.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{
          tabBarLabel: "Followers",
        }}
      />
    </UserNetworkTopTab.Navigator>
  );
};
