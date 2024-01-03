import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Rushmore } from "../../model/Rushmore";

export type CreateRushmoreStackParamList = {
  CreateRushmoreHomeScreen: undefined;
  RushmoreSettingsScreen: {
    rushmore: Rushmore;
  };
  RushmoreRankingScreen: undefined;
};

export type StackContainerScreenProps<
  S extends keyof CreateRushmoreStackParamList
> = NativeStackScreenProps<CreateRushmoreStackParamList, S>;
