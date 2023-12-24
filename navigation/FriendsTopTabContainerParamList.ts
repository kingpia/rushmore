import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";

import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeRushmoreStackNavigatorParamList } from "./HomeRushmoreStackNavigatorParamList";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

export type FriendsTopTabContainerParamList = {
  FollowingScreen: undefined;
  FollowersScreen: undefined;
  FriendsScreen: undefined;
};

export type TabContainerScreenProps<
  S extends keyof FriendsTopTabContainerParamList
> = CompositeScreenProps<
  MaterialTopTabScreenProps<FriendsTopTabContainerParamList, S>,
  NativeStackScreenProps<HomeRushmoreStackNavigatorParamList>
>;
