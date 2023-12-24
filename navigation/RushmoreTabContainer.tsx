import { RushmoreTabContainerParamList } from "./RushmoreTabContainerParamList";
import { StackContainerScreenProps } from "./RushmoreStackParamList";
import { FriendsHomeScreen } from "../friends/FriendsHomeScreen";
import { CreateRushmoreHomeScreen } from "../rushmore/CreateRushmoreHomeScreen";
import { InboxHomeScreen } from "../inbox/InboxHomeScreen";
import { ProfileHomeScreen } from "../profile/ProfileHomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeRushmoreStackContainer } from "./HomeRushmoreStackContainer";
import { HomeTopTabContainer } from "./HomeTopTabContainer";
import { FriendsTopTabContainer } from "./FriendsTopTabContainer";
import { ProfileStackContainer } from "./ProfileStackContainer";

const Tab = createBottomTabNavigator<RushmoreTabContainerParamList>();

export const RushmoreTabContainer = () => {
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen
        name="HomeTopTabContainer"
        component={HomeTopTabContainer}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="FriendsTopTabContainer"
        component={FriendsTopTabContainer}
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account-group"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="CreateRushmoreHomeScreen"
        component={CreateRushmoreHomeScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="plus-box" size={38} color="green" />
            );
          },
        }}
      />
      <Tab.Screen
        name="InboxHomeScreen"
        component={InboxHomeScreen}
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="email" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileStackContainer"
        component={ProfileStackContainer}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account-circle"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
