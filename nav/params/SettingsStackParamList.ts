import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type SettingsStackParamList = {
  ProfileHomeScreen: undefined;
};

export type StackContainerScreenProps<S extends keyof SettingsStackParamList> =
  NativeStackScreenProps<SettingsStackParamList, S>;
