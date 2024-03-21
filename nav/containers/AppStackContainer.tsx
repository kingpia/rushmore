import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "../params/AppStackParamList";
import { AuthStackContainer } from "./AuthStackContainer";
import { RushmoreTabContainer } from "./RushmoreTabContainer";
import { RushmoreGameScreen } from "../../rushmore/RushmoreGameScreen";
import { EditUserRushmoreScreen } from "../../rushmore/EditUserRushmoreScreen";
import { UserProfileScreen } from "../../friends/UserProfileScreen";

const AppStackNavigator = createNativeStackNavigator<AppStackParamList>();

export const AppStackContainer = () => {
  return (
    <AppStackNavigator.Navigator>
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
          headerShown: true, // You can also hide the header here
        }}
      />
      <AppStackNavigator.Screen
        name="UserProfileScreen"
        component={UserProfileScreen} // Added here
        options={{
          headerShown: true, // You can also hide the header here
        }}
      />
    </AppStackNavigator.Navigator>
  );
};
