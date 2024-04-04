import { SafeAreaView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";

import { AppStackParamList } from "../nav/params/AppStackParamList";
import { MyRushmoreListsComponent } from "../components/MyRushmoreListsComponent";

type MyRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList & AppStackParamList>;
};

export const MyRushmoreHomeScreen = ({
  navigation,
}: MyRushmoreHomeScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyRushmoreListsComponent navigation={navigation} />
    </SafeAreaView>
  );
};
