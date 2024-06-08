import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RushmoreTopTabContainerParamList } from "../params/HomeTopTabContainerParamList";
import { MyRushmoreHomeScreen } from "../../rushmore/MyRushmoreHomeScreen";
import { FollowingRushmoreHomeScreen } from "../../rushmore/FollowingRushmoreHomeScreen";
import { SafeAreaView, StyleSheet } from "react-native";

const HomeTopTab =
  createMaterialTopTabNavigator<RushmoreTopTabContainerParamList>();

export const HomeTopTabContainer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeTopTab.Navigator screenOptions={{}}>
        <HomeTopTab.Screen
          name="MyRushmoreHomeScreen"
          component={MyRushmoreHomeScreen}
          options={{
            tabBarLabel: "My Rushmores",
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
