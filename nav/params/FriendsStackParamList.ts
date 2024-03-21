import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type FriendsStackParamList = {
  FriendsTopTabContainer: undefined;
};

export type StackContainerScreenProps<S extends keyof FriendsStackParamList> =
  NativeStackScreenProps<FriendsStackParamList, S>;
