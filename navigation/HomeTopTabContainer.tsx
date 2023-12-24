import { StackContainerScreenProps } from "./RushmoreStackParamList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RushmoreTopTabContainerParamList } from "./HomeTopTabContainerParamList";
import { YourRushmoreHomeScreen } from "../rushmore/YourRushmoreHomeScreen";
import { FollowingRushmoreHomeScreen } from "../rushmore/FollowingRushmoreHomeScreen";

const HomeTopTab =
  createMaterialTopTabNavigator<RushmoreTopTabContainerParamList>();

export const HomeTopTabContainer = () => {
  return (
    <HomeTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <HomeTopTab.Screen
        name="YourRushmoreHomeScreen"
        component={YourRushmoreHomeScreen}
        options={{
          tabBarLabel: "Yours",
        }}
      />
      <HomeTopTab.Screen
        name="FollowingRushmoreHomeScreen"
        component={FollowingRushmoreHomeScreen}
        options={{
          tabBarLabel: "Following",
        }}
      />
    </HomeTopTab.Navigator>
  );
};
