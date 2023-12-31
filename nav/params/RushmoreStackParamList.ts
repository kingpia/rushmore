import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RushmoreStackParamList = {};

export type StackContainerScreenProps<S extends keyof RushmoreStackParamList> =
  NativeStackScreenProps<RushmoreStackParamList, S>;
