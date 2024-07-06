import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RushmoreTabContainerParamList } from "../params/RushmoreTabContainerParamList";
import { InboxHomeScreen } from "../../inbox/InboxHomeScreen";
import { HomeStackContainer } from "./HomeStackContainer";
import { CreateRushmoreStackContainer } from "./CreateRushmoreStackContainer";
import { SettingsStackContainer } from "./SettingsStackContainer";
import { UserNetworkTopTabContainer } from "./UserNetworkTopTabContainer";
import { SafeAreaView } from "react-native";
import { MyUserNetworkTopTabContainer } from "./MyUserNetworkTopTabContainer";

const Tab = createBottomTabNavigator<RushmoreTabContainerParamList>();

export const RushmoreTabContainer = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Hide the back button label
        }}
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
          name="MyUserNetworkTopTabContainer"
          component={MyUserNetworkTopTabContainer}
          options={{
            tabBarLabel: "Social",
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
          name="CreateRushmoreStackContainer"
          component={CreateRushmoreStackContainer}
          options={{
            tabBarLabel: "Create",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="plus-box"
                  size={size}
                  color={color}
                />
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
                <MaterialCommunityIcons
                  name="email"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="SettingsStackContainer"
          component={SettingsStackContainer}
          options={({ route }) => ({
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                size={size}
                color={color}
              />
            ),
          })}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
