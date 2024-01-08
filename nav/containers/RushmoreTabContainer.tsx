import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RushmoreTabContainerParamList } from "../params/RushmoreTabContainerParamList";
import { InboxHomeScreen } from "../../inbox/InboxHomeScreen";
import { ProfileStackContainer } from "./ProfileStackContainer";
import { HomeStackContainer } from "./HomeStackContainer";
import { FriendsStackContainer } from "./FriendsStackContainer";
import { CreateRushmoreStackContainer } from "./CreateRushmoreStackContainer";

const Tab = createBottomTabNavigator<RushmoreTabContainerParamList>();

export const RushmoreTabContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        headerShown: false, // Hide the header
      })} // Add this option
    >
      <Tab.Screen
        name="HomeStackContainer"
        component={HomeStackContainer}
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
        name="FriendsStackContainer"
        component={FriendsStackContainer}
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
          headerShown: false, // Hide the header
        }}
      />
      <Tab.Screen
        name="CreateRushmoreStackContainer"
        component={CreateRushmoreStackContainer}
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
