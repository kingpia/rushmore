import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamList } from "./AuthStackParamList";
import { RushmoreTabContainerParamList } from "../params/RushmoreTabContainerParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserRushmore } from "../../model/UserRushmore";
import { Rushmore } from "../../model/Rushmore";
import { UserRushmoreInitialCreateDTO } from "../../model/UserRushmoreInitialCreateDTO";

export type AppStackParamList = {
  AuthStackContainer: NavigatorScreenParams<AuthStackParamList>;
  RushmoreTabContainer: NavigatorScreenParams<RushmoreTabContainerParamList>;
  RushmoreGameScreen: {
    urId: number;
  };
  UserRushmoreScreen: {
    urId: string;
  };
  EditUserRushmoreScreen: {
    userRushmore: UserRushmore | undefined;
    selectedItemUserRushmore: UserRushmore | undefined;
  };
  UserRushmoreVersionScreen: {
    userRushmore: UserRushmore | undefined;
  };
  UserRushmoreLikeListScreen: {
    userRushmore: UserRushmore | undefined;
  };
  UserRushmoreCompletedListScreen: {
    userRushmore: UserRushmore | undefined;
  };
  UserRushmoreLeaderboard: {
    userRushmore: UserRushmore | undefined;
  };
  UserRushmoreTypeScreen: {
    userRushmoreInitialCreate: UserRushmoreInitialCreateDTO;
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
  UserInfoSettingsScreen: undefined;
  PasswordChangeSettingsScreen: undefined;
  DeleteAccountSettingsScreen: undefined;
  DeactivateAccountSettingsScreen: undefined;
  AccountScreen: undefined;
  RushmoreSettingsScreen: {
    userRushmore: UserRushmore;
  };
  ChangeEmailScreen: undefined;
  ChangeEmailCodeValidationScreen: undefined;
};

export type StackContainerScreenProps<S extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, S>;
