import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeRushmoreStackNavigatorParamList = {
  RushmoreHomeScreen: undefined;
  YourRushmoreHomeScreen: undefined;
  FollowingRushmoreHomeScreen: undefined;
};

export type StackContainerScreenProps<
  S extends keyof HomeRushmoreStackNavigatorParamList
> = NativeStackScreenProps<HomeRushmoreStackNavigatorParamList, S>;
