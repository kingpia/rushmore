import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RushmoreTopTabContainerParamList } from "../params/HomeTopTabContainerParamList";
import { YourRushmoreHomeScreen } from "../../rushmore/YourRushmoreHomeScreen";
import { FollowingRushmoreHomeScreen } from "../../rushmore/FollowingRushmoreHomeScreen";

const HomeTopTab =
  createMaterialTopTabNavigator<RushmoreTopTabContainerParamList>();

export const HomeTopTabContainer = () => {
  return (
    <HomeTopTab.Navigator screenOptions={{}}>
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
          tabBarLabel: "Solving",
        }}
      />
    </HomeTopTab.Navigator>
  );
};
