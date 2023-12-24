import React from "react";
import { SafeAreaView, View } from "react-native";
import { Button } from "react-native-paper";
import { TabContainerScreenProps } from "../navigation/RushmoreTabContainerParamList";

export type RushmoreHomeScreenProps =
  TabContainerScreenProps<"RushmoreHomeScreen">;

export const RushmoreHomeScreen = ({ navigation }: RushmoreHomeScreenProps) => {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          mode="elevated"
          onPress={() => navigation.push("YourRushmoreHomeScreen")}
        >
          Yours
        </Button>
        <Button
          mode="elevated"
          onPress={() => navigation.push("FollowingRushmoreHomeScreen")}
        >
          Following
        </Button>
      </View>
    </SafeAreaView>
  );
};
