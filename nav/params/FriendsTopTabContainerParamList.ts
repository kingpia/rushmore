import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { RushmoreStackParamList } from "./RushmoreStackParamList";

export type FriendsTopTabContainerParamList = {
  FollowingScreen: undefined;
  FollowersScreen: undefined;
  FriendsScreen: undefined;
};

export type TabContainerScreenProps<
  S extends keyof FriendsTopTabContainerParamList
> = CompositeScreenProps<
  MaterialTopTabScreenProps<FriendsTopTabContainerParamList, S>,
  NativeStackScreenProps<RushmoreStackParamList>
>;
