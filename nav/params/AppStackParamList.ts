import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamList } from "./AuthStackParamList";
import { RushmoreTabContainerParamList } from "../params/RushmoreTabContainerParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserRushmore } from "../../model/UserRushmore";
import { Rushmore } from "../../model/Rushmore";

export type AppStackParamList = {
  AuthStackContainer: NavigatorScreenParams<AuthStackParamList>;
  RushmoreTabContainer: NavigatorScreenParams<RushmoreTabContainerParamList>;
  RushmoreGameScreen: {
    urId: number;
  };
  EditUserRushmoreScreen: {
    userRushmore: UserRushmore | undefined;
    selectedItemUserRushmore: UserRushmore | undefined;
  };
  AddRushmoreItemsScreen: {
    userRushmore: UserRushmore;
  };
  EditProfileScreen: { user: SocialUser };
  EditNameScreen: { userData: SocialUser };
  EditUsernameScreen: { userData: SocialUser };
  AddFriendScreen: undefined;
  UserNetworkTopTabContainer: { user: SocialUser };
  UserProfileScreen: { user: SocialUser };
  TermsAndPolicyScreen: undefined;
  ProfileSettingsScreen: undefined;
  AccountSettingsScreen: undefined;
  UserInfoSettingsScreen: { user: User };
  PasswordChangeSettingsScreen: undefined;
  DeleteAccountSettingsScreen: undefined;
  DeactivateAccountSettingsScreen: undefined;
  AccountScreen: undefined;
  RushmoreSettingsScreen: {
    rushmore: Rushmore;
  };
};

export type StackContainerScreenProps<S extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, S>;
