import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FollowingScreen } from "../../friends/FollowingScreen";
import { FollowersScreen } from "../../friends/FollowersScreen";
import { FriendsScreen } from "../../friends/FriendsScreen";
import { UserNetworkTopTabContainerParamList } from "../params/UserNetworkTopTabContainerParamList";

const UserNetworkTopTab =
  createMaterialTopTabNavigator<UserNetworkTopTabContainerParamList>();

export const UserNetworkTopTabContainer = () => {
  return (
    <UserNetworkTopTab.Navigator screenOptions={{}}>
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
      <UserNetworkTopTab.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{
          tabBarLabel: "Friends",
        }}
      />
    </UserNetworkTopTab.Navigator>
  );
};
