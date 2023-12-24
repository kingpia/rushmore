import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";

import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeRushmoreStackNavigatorParamList } from "./HomeRushmoreStackNavigatorParamList";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

export type RushmoreTopTabContainerParamList = {
  YourRushmoreHomeScreen: undefined;
  FollowingRushmoreHomeScreen: undefined;
};

export type TabContainerScreenProps<
  S extends keyof RushmoreTopTabContainerParamList
> = CompositeScreenProps<
  MaterialTopTabScreenProps<RushmoreTopTabContainerParamList, S>,
  NativeStackScreenProps<HomeRushmoreStackNavigatorParamList>
>;
