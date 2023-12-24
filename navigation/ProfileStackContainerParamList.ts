import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { RushmoreTabContainerParamList } from "./RushmoreTabContainerParamList";
import { FriendsTopTabContainerParamList } from "./FriendsTopTabContainerParamList";

export type ProfileStackParamList = {
  ProfileHomeScreen: undefined;
  EditProfileScreen: undefined;
  Tab: NavigatorScreenParams<RushmoreTabContainerParamList>;
  FriendsTopTab: NavigatorScreenParams<FriendsTopTabContainerParamList>;
};

export type StackContainerScreenProps<S extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, S>;
