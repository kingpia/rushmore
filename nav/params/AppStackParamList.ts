import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamList } from "./AuthStackParamList";
import { RushmoreTabContainerParamList } from "../params/RushmoreTabContainerParamList";

export type AppStackParamList = {
  AuthStackContainer: NavigatorScreenParams<AuthStackParamList>;
  RushmoreTabContainer: NavigatorScreenParams<RushmoreTabContainerParamList>;
};

export type StackContainerScreenProps<S extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, S>;
