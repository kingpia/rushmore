import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Rushmore } from "../../model/Rushmore";
import { UserRushmore } from "../../model/UserRushmore";

export type CreateRushmoreStackParamList = {
  CreateRushmoreHomeScreen: undefined;
  RushmoreSettingsScreen: {
    rushmore: Rushmore;
  };
  RushmoreRankingScreen: {
    userRushmore: UserRushmore;
  };
};

export type StackContainerScreenProps<
  S extends keyof CreateRushmoreStackParamList
> = NativeStackScreenProps<CreateRushmoreStackParamList, S>;
