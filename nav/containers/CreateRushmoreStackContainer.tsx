import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateRushmoreStackParamList } from "../params/CreateRushmoreStackParamList";
import { CreateRushmoreHomeScreen } from "../../rushmore/CreateRushmoreHomeScreen";
import { RushmoreRankingScreen } from "../../rushmore/RushmoreRankingScreen";
import { RushmoreSettingsScreen } from "../../rushmore/RushmoreSettingsScreen";

export const CreateRushmoreStackContainer = () => {
  const CreateRushmoreStackNavigator =
    createNativeStackNavigator<CreateRushmoreStackParamList>();
  return (
    <CreateRushmoreStackNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // Hide the back button label
      }}
    >
      <CreateRushmoreStackNavigator.Screen
        name="CreateRushmoreHomeScreen"
        component={CreateRushmoreHomeScreen}
        options={{
          headerShown: true,
        }}
      />
      <CreateRushmoreStackNavigator.Screen
        name="RushmoreSettingsScreen"
        component={RushmoreSettingsScreen}
        options={({ route }) => ({
          headerTitle: `${route.params?.rushmore.title}`,
        })}
      />
      <CreateRushmoreStackNavigator.Screen
        name="RushmoreRankingScreen"
        component={RushmoreRankingScreen}
        options={({ route }) => ({
          headerTitle: `${route.params?.userRushmore.rushmoreType} ${route.params?.userRushmore.rushmore.title}`,
        })}
      />
    </CreateRushmoreStackNavigator.Navigator>
  );
};
