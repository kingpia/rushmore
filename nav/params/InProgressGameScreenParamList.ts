import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type InProgressGameScreenParamList = {
  InProgressGameScreen: undefined;
};

export type StackContainerScreenProps<
  S extends keyof InProgressGameScreenParamList
> = NativeStackScreenProps<InProgressGameScreenParamList, S>;
