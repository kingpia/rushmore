import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamList } from "./AuthStackParamList";
import { RushmoreTabContainerParamList } from "../params/RushmoreTabContainerParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserRushmore } from "../../model/UserRushmore";

export type AppStackParamList = {
  AuthStackContainer: NavigatorScreenParams<AuthStackParamList>;
  RushmoreTabContainer: NavigatorScreenParams<RushmoreTabContainerParamList>;
  RushmoreGameScreen: {
    urId: number;
  };
  EditUserRushmoreScreen: {
    userRushmore: UserRushmore;
  };
};

export type StackContainerScreenProps<S extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, S>;
