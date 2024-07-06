import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { RushmoreStackParamList } from "./RushmoreStackParamList";

export type MyUserNetworkTopTabContainerParamList = {
  MyFollowingScreen: {
    user: SocialUser | undefined;
  };
  MyFollowersScreen: {
    user: SocialUser | undefined;
  };
  MyFriendsScreen: undefined;
};

export type TabContainerScreenProps<
  S extends keyof MyUserNetworkTopTabContainerParamList
> = CompositeScreenProps<
  MaterialTopTabScreenProps<MyUserNetworkTopTabContainerParamList, S>,
  NativeStackScreenProps<RushmoreStackParamList>
>;
