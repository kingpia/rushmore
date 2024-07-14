import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateRushmoreStackParamList } from "../params/CreateRushmoreStackParamList";
import { CreateRushmoreHomeScreen } from "../../rushmore/CreateRushmoreHomeScreen";
import { UserRushmoreTypeScreen } from "../../rushmore/UserRushmoreTypeScreen";

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
          headerTitle: "Create Rushmore",
        }}
      />
      <CreateRushmoreStackNavigator.Screen
        name="UserRushmoreTypeScreen"
        component={UserRushmoreTypeScreen}
        options={({ route }) => ({
          headerTitle: route.params.rushmore.title,
        })}
      />
    </CreateRushmoreStackNavigator.Navigator>
  );
};
