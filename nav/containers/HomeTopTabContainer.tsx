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
      <HomeTopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            textTransform: "none",
            color: "#235868", // Blue Dianne
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#A9CFC8", // Jet Stream
            height: 4,
          },
          tabBarStyle: {
            backgroundColor: "#F5F5F5", // Light background to contrast with colors
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
          },
          tabBarActiveTintColor: "#235868", // Blue Dianne
          tabBarInactiveTintColor: "#868649", // Shadow
        }}
      >
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

export default HomeTopTabContainer;
