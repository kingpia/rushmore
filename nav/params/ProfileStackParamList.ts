import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { FriendsTopTabContainerParamList } from "./FriendsTopTabContainerParamList";
import { FriendsStackParamList } from "./FriendsStackparamList";

export type ProfileStackParamList = {
  ProfileHomeScreen: undefined;
  EditProfileScreen: undefined;
  FriendsStackContainer: NavigatorScreenParams<FriendsStackParamList>;
  FriendsTopTabContainer: NavigatorScreenParams<FriendsTopTabContainerParamList>;
};

export type StackContainerScreenProps<S extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, S>;
