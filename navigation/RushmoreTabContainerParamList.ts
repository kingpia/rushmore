import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";

import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeRushmoreStackNavigatorParamList } from "./HomeRushmoreStackNavigatorParamList";

export type RushmoreTabContainerParamList = {
  RushmoreHomeScreen: undefined;
  FriendsHomeScreen: undefined;
  InboxHomeScreen: undefined;
  CreateRushmoreHomeScreen: undefined;
  HomeRushmoreStackContainer: undefined;
  HomeTopTabContainer: undefined;
  FriendsTopTabContainer: undefined;
  ProfileStackContainer: undefined;
};

export type TabContainerScreenProps<
  S extends keyof RushmoreTabContainerParamList
> = CompositeScreenProps<
  MaterialBottomTabScreenProps<RushmoreTabContainerParamList, S>,
  NativeStackScreenProps<HomeRushmoreStackNavigatorParamList>
>;
