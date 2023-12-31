import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FollowingSolvedRushmore } from "../../model/FollowingSolvedRushmore";
import { UserRushmore } from "../../model/UserRushmore";
import { YourInProgressRushmore } from "../../model/YourInProgressRushmore";
import { FollowingInProgressRushmore } from "../../model/FollowingInProgressRushmore";

export type HomeStackParamList = {
  HomeTopTabContainer: undefined;
  YourCompletedRushmoreScreen: {
    rushmoreItem: UserRushmore;
  };
  YourInProgressRushmoreScreen: {
    rushmoreItem: YourInProgressRushmore;
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
