import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { RushmoreTabContainerParamList } from "./RushmoreTabContainerParamList";
import { HomeRushmoreStackNavigatorParamList } from "./HomeRushmoreStackNavigatorParamList";

export type RushmoreStackParamList = {
  AuthHomeScreen: undefined;
  AuthEmailSignUpScreen: undefined;
  AuthCreateUsernameScreen: undefined;
  AuthResetPasswordEmailScreen: undefined;
  AuthLogInScreen: undefined;
  Tab: NavigatorScreenParams<RushmoreTabContainerParamList>;
  YourRushmoreStackNavigator: NavigatorScreenParams<HomeRushmoreStackNavigatorParamList>;
};

export type StackContainerScreenProps<S extends keyof RushmoreStackParamList> =
  NativeStackScreenProps<RushmoreStackParamList, S>;
