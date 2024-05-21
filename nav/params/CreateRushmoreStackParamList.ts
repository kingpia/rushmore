import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Rushmore } from "../../model/Rushmore";
import { NavigatorScreenParams } from "@react-navigation/native";
import { AppStackParamList } from "./AppStackParamList";

export type CreateRushmoreStackParamList = {
  CreateRushmoreHomeScreen: undefined;
};

export type StackContainerScreenProps<
  S extends keyof CreateRushmoreStackParamList
> = NativeStackScreenProps<CreateRushmoreStackParamList, S>;
