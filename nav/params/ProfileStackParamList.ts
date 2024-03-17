import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { FriendsTopTabContainerParamList } from "./FriendsTopTabContainerParamList";
import { FriendsStackParamList } from "./FriendsStackParamList";

export type ProfileStackParamList = {
  ProfileHomeScreen: undefined;
  EditProfileScreen: { userData: User };
  FriendsStackContainer: NavigatorScreenParams<FriendsStackParamList>;
  FriendsTopTabContainer: NavigatorScreenParams<FriendsTopTabContainerParamList>;
  EditNameScreen: { userData: User };
  EditUsernameScreen: { userData: User };
  AddFriendScreen: undefined;
};

export type StackContainerScreenProps<S extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, S>;
