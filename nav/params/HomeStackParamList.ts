import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FollowingSolvedRushmore } from "../../model/FollowingSolvedRushmore";
import { UserRushmore } from "../../model/UserRushmore";
import { FollowingInProgressRushmore } from "../../model/FollowingInProgressRushmore";

export type HomeStackParamList = {
  HomeTopTabContainer: undefined;
  MyCompletedRushmoreScreen: {
    rushmoreItem: UserRushmore;
  };
  MyInProgressRushmoreScreen: {
    rushmoreItem: UserRushmore;
  };
  FollowingInProgressRushmoreScreen: {
    rushmoreItem: FollowingInProgressRushmore;
  };
  FollowingSolvedRushmoreScreen: {
    rushmoreItem: FollowingSolvedRushmore;
  };
};

export type StackContainerScreenProps<S extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, S>;
