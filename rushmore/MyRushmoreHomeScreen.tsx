import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { MyRushmoreListsComponent } from "../components/MyRushmoreListsComponent";
import { useUserFocus } from "../service/UserFocusContext";
import { useFocusEffect } from "@react-navigation/native";

type MyRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList & AppStackParamList>;
};

export const MyRushmoreHomeScreen = ({
  navigation,
}: MyRushmoreHomeScreenProps) => {
  const { setUserFocus } = useUserFocus(); // Destructure setUserFocus here

  useFocusEffect(
    React.useCallback(() => {
      setUserFocus(null);
      console.log("Home screen focused, userFocus set to null");
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <MyRushmoreListsComponent navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
