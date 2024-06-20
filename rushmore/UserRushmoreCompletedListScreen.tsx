import React from "react";
import { useFocusEffect } from "@react-navigation/native";

import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { UserRushmore } from "../model/UserRushmore";
import { RushmoreService } from "../service/RushmoreService";

type UserRushmoreCompletedListScreenProps =
  StackContainerScreenProps<"UserRushmoreCompletedListScreen">;

const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService

export const UserRushmoreCompletedListScreen = ({
  route,
}: UserRushmoreCompletedListScreenProps) => {
  // Inside ProfileHomeScreen component
  useFocusEffect(
    React.useCallback(() => {
      console.log("EdiUserRushmore Use Effect Focus Running...");

      const fetchData = async () => {
        let userRushmore: UserRushmore = route.params.userRushmore;
        console.log("UserRushmore:" + JSON.stringify(userRushmore, null, 2));
      };

      fetchData();
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayLarge">Completed List</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default UserRushmoreCompletedListScreen;
