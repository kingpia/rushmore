import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FollowingScreen } from "../../friends/FollowingScreen";
import { FollowersScreen } from "../../friends/FollowersScreen";
import { FriendsScreen } from "../../friends/FriendsScreen";
import { MyUserNetworkTopTabContainerParamList } from "../params/MyUserNetworkTopTabContainerParamList";
import { MyFollowersScreen } from "../../friends/MyFollowersScreen";
import { MyFollowingScreen } from "../../friends/MyFollowingScreen";

const MyUserNetworkTopTab =
  createMaterialTopTabNavigator<MyUserNetworkTopTabContainerParamList>();

export const MyUserNetworkTopTabContainer = () => {
  return (
    <MyUserNetworkTopTab.Navigator
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
      <MyUserNetworkTopTab.Screen
        name="MyFollowingScreen"
        component={MyFollowingScreen}
        options={{
          tabBarLabel: "Following",
        }}
      />
      <MyUserNetworkTopTab.Screen
        name="MyFollowersScreen"
        component={MyFollowersScreen}
        options={{
          tabBarLabel: "Followers",
        }}
      />
    </MyUserNetworkTopTab.Navigator>
  );
};
