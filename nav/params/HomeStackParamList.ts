import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FollowingSolvedRushmore } from "../../model/FollowingSolvedRushmore";
import { UserRushmore } from "../../model/UserRushmore";
import { AppStackParamList } from "./AppStackParamList";
import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  HomeTopTabContainer: undefined;
  MyCompletedRushmoreScreen: {
    rushmoreItem: UserRushmore;
  };
  MyInProgressRushmoreScreen: {
    rushmoreItem: UserRushmore;
  };
  FollowingSolvedRushmoreScreen: {
    rushmoreItem: FollowingSolvedRushmore;
  };
  AppStackContainer: NavigatorScreenParams<AppStackParamList>;
};

export type StackContainerScreenProps<S extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, S>;
