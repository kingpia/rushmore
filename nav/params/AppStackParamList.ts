import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamList } from "./AuthStackParamList";
import { RushmoreTabContainerParamList } from "../params/RushmoreTabContainerParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserRushmore } from "../../model/UserRushmore";
import { UserRushmoreDTO } from "../../model/UserRushmoreDTO";

export type AppStackParamList = {
  AuthStackContainer: NavigatorScreenParams<AuthStackParamList>;
  RushmoreTabContainer: NavigatorScreenParams<RushmoreTabContainerParamList>;
  RushmoreGameScreen: {
    urId: number;
  };
  EditUserRushmoreScreen: {
    userRushmore: UserRushmoreDTO;
  };
  EditProfileScreen: { user: SocialUser };
  EditNameScreen: { userData: SocialUser };
  EditUsernameScreen: { userData: SocialUser };
  AddFriendScreen: undefined;
  UserNetworkTopTabContainer: { user: SocialUser };
  UserProfileScreen: { user: SocialUser };
  TermsAndPolicyScreen: undefined;
  ProfileSettingsScreen: undefined;
  AccountScreen: undefined;
};

export type StackContainerScreenProps<S extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, S>;
