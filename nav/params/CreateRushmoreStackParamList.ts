import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserRushmoreInitialCreateDTO } from "../../model/UserRushmoreInitialCreateDTO";
import { UserRushmore } from "../../model/UserRushmore";
import { Rushmore } from "../../model/Rushmore";

export type CreateRushmoreStackParamList = {
  CreateRushmoreHomeScreen: undefined;
  UserRushmoreTypeScreen: {
    userRushmoreList: UserRushmore[];
    rushmore: Rushmore;
  };
};

export type StackContainerScreenProps<
  S extends keyof CreateRushmoreStackParamList
> = NativeStackScreenProps<CreateRushmoreStackParamList, S>;
