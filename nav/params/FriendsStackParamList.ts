import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type FriendsStackParamList = {
  FriendsTopTabContainer: undefined;
  UserProfileScreen: { user: SocialUser };
};

export type StackContainerScreenProps<S extends keyof FriendsStackParamList> =
  NativeStackScreenProps<FriendsStackParamList, S>;
