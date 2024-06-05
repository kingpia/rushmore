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
import AddRushmoreItemsScreen from "../../rushmore/AddRushmoreItemsScreen";
import { RushmoreSettingsScreen } from "../../rushmore/RushmoreSettingsScreen";
import { UserInfoSettingsScreen } from "../../profile/UserInfoSettingsScreen";
import { PasswordChangeSettingsScreen } from "../../profile/PasswordChangeSettingsScreen";
import { DeleteAccountSettingsScreen } from "../../profile/DeleteAccountSettingsScreen";
import { DeactivateAccountSettingsScreen } from "../../profile/DeactivateAccountSettingsScreen";
import { ChangeEmailScreen } from "../../profile/ChangeEmailScreen";
import ChangeEmailCodeValidationScreen from "../../profile/ChangeEmailCodeValidationScreen";
import { IconButton } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const AppStackNavigator = createNativeStackNavigator<AppStackParamList>();

interface AppStackContainerProps {
  initialScreen: keyof AppStackParamList; // Define initialScreen prop
}

export const AppStackContainer: React.FC<AppStackContainerProps> = ({
  initialScreen,
}) => {
  return (
    <AppStackNavigator.Navigator
      screenOptions={{
        headerShown: false, // Hide the back button label
        headerBackTitleVisible: false, // Hide the title of the last screen next to the back button
      }}
      initialRouteName={initialScreen}
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
        name="AddRushmoreItemsScreen"
        component={AddRushmoreItemsScreen}
        options={{
          gestureEnabled: false,
        }}
      />

      <AppStackNavigator.Screen
        name="UserNetworkTopTabContainer"
        component={UserNetworkTopTabContainer}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: route.params.user.nickName,
          headerRight: () => (
            <View style={styles.iconContainer}>
              <IconButton
                icon="account-plus"
                size={24}
                iconColor="black"
                onPress={() => navigation.navigate("AddFriendScreen")}
              />
            </View>
          ),
        })}
      />

      <AppStackNavigator.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: "Edit Profile", // Empty string to hide the title
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
      <AppStackNavigator.Screen
        name="RushmoreSettingsScreen"
        component={RushmoreSettingsScreen}
        options={({ route }) => ({
          headerTitle: `${route.params?.rushmore.title}`,
        })}
      />

      <AppStackNavigator.Screen
        name="UserInfoSettingsScreen"
        component={UserInfoSettingsScreen}
        options={{
          headerTitle: "Account Settings", // Empty string to hide the title
          headerShown: true,
        }}
      />

      <AppStackNavigator.Screen
        name="PasswordChangeSettingsScreen"
        component={PasswordChangeSettingsScreen}
        options={{
          headerTitle: "Account Settings", // Empty string to hide the title
          headerShown: true,
        }}
      />

      <AppStackNavigator.Screen
        name="DeleteAccountSettingsScreen"
        component={DeleteAccountSettingsScreen}
        options={{
          headerTitle: "Account Settings", // Empty string to hide the title
          headerShown: true,
        }}
      />

      <AppStackNavigator.Screen
        name="DeactivateAccountSettingsScreen"
        component={DeactivateAccountSettingsScreen}
        options={{
          headerTitle: "Account Settings", // Empty string to hide the title
          headerShown: true,
        }}
      />

      <AppStackNavigator.Screen
        name="ChangeEmailScreen"
        component={ChangeEmailScreen}
        options={{
          headerTitle: "Account Settings", // Empty string to hide the title
          headerShown: true,
        }}
      />
      <AppStackNavigator.Screen
        name="ChangeEmailCodeValidationScreen"
        component={ChangeEmailCodeValidationScreen}
        options={{
          headerTitle: "Account Settings", // Empty string to hide the title
          headerShown: true,
        }}
      />
    </AppStackNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    height: "110%",
  },
});
