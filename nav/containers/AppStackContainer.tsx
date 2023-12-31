import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "../params/AppStackParamList";
import { AuthStackContainer } from "./AuthStackContainer";
import { RushmoreTabContainer } from "./RushmoreTabContainer";

const AppStackNavigator = createNativeStackNavigator<AppStackParamList>();

export const AppStackContainer = () => {
  return (
    <AppStackNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // Hide the back button label
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
    </AppStackNavigator.Navigator>
  );
};
