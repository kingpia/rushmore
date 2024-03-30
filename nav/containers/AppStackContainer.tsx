import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "../params/AppStackParamList";
import { AuthStackContainer } from "./AuthStackContainer";
import { RushmoreTabContainer } from "./RushmoreTabContainer";
import { RushmoreGameScreen } from "../../rushmore/RushmoreGameScreen";
import { EditUserRushmoreScreen } from "../../rushmore/EditUserRushmoreScreen";
import AddFriendsScreen from "../../profile/AddFriendScreen";
import { EditUsernameScreen } from "../../profile/EditUsernameScreen";
import { EditNameScreen } from "../../profile/EditNameScreen";
import { EditProfileScreen } from "../../profile/EditProfileScreen";
import { UserNetworkTopTabContainer } from "./UserNetworkTopTabContainer";
import { UserProfileScreen } from "../../friends/UserProfileScreen";
import TermsAndPolicyScreen from "../../profile/TermsAndPolicyScreen";
import AccountScreen from "../../profile/AccountScreen";
import ProfileSettingsScreen from "../../profile/ProfileSettingsScreen";

const AppStackNavigator = createNativeStackNavigator<AppStackParamList>();

export const AppStackContainer = () => {
  return (
    <AppStackNavigator.Navigator
      screenOptions={{
        headerShown: false, // Hide the back button label
        headerBackTitleVisible: false, // Hide the title of the last screen next to the back button
      }}
    >
      <AppStackNavigator.Screen
        name="AuthStackContainer"
        component={AuthStackContainer}
      />
      <AppStackNavigator.Screen
        name="RushmoreTabContainer"
        component={RushmoreTabContainer}
      />
      <AppStackNavigator.Screen
        name="RushmoreGameScreen"
        component={RushmoreGameScreen}
        options={{
          gestureEnabled: false,
          headerShown: false, // You can also hide the header here
        }}
      />
      <AppStackNavigator.Screen
        name="EditUserRushmoreScreen"
        component={EditUserRushmoreScreen}
        options={{
          gestureEnabled: false,
        }}
      />

      <AppStackNavigator.Screen
        name="UserNetworkTopTabContainer"
        component={UserNetworkTopTabContainer}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.user.nickName,
        })}
      />

      <AppStackNavigator.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: "", // Empty string to hide the title
        })}
      />

      <AppStackNavigator.Screen
        name="EditNameScreen"
        component={EditNameScreen}
        options={{
          headerTitle: "", // Empty string to hide the title
        }}
      />
      <AppStackNavigator.Screen
        name="EditUsernameScreen"
        component={EditUsernameScreen}
        options={{
          headerTitle: "", // Empty string to hide the title
        }}
      />
      <AppStackNavigator.Screen
        name="AddFriendScreen"
        component={AddFriendsScreen}
        options={{
          headerShown: true,
          headerTitle: "Add Friends", // Empty string to hide the title
        }}
      />
      <AppStackNavigator.Screen
        name="UserProfileScreen"
        component={UserProfileScreen} // Added here
        options={({ route }) => ({
          title: route.params.user.nickName, // Set the title dynamically
          headerShown: true,
        })}
      />

      <AppStackNavigator.Screen
        name="TermsAndPolicyScreen"
        component={TermsAndPolicyScreen}
        options={{
          headerTitle: "Terms and Policy", // Empty string to hide the title
          headerShown: true,
        }}
      />
      <AppStackNavigator.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerTitle: "Account", // Empty string to hide the title
          headerShown: true,
        }}
      />
      <AppStackNavigator.Screen
        name="ProfileSettingsScreen"
        component={ProfileSettingsScreen}
        options={{
          headerTitle: "Settings", // Empty string to hide the title
          headerShown: true,
        }}
      />
    </AppStackNavigator.Navigator>
  );
};
