import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { RushmoreStackParamList } from "./RushmoreStackParamList";

export type UserNetworkTopTabContainerParamList = {
  FollowingScreen: undefined;
  FollowersScreen: undefined;
  FriendsScreen: undefined;
};

export type TabContainerScreenProps<
  S extends keyof UserNetworkTopTabContainerParamList
> = CompositeScreenProps<
  MaterialTopTabScreenProps<UserNetworkTopTabContainerParamList, S>,
  NativeStackScreenProps<RushmoreStackParamList>
>;
