import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { RushmoreStackParamList } from "./RushmoreStackParamList";

export type RushmoreTopTabContainerParamList = {
  YourRushmoreHomeScreen: undefined;
  FollowingRushmoreHomeScreen: undefined;
};

export type TabContainerScreenProps<
  S extends keyof RushmoreTopTabContainerParamList
> = CompositeScreenProps<
  MaterialTopTabScreenProps<RushmoreTopTabContainerParamList, S>,
  NativeStackScreenProps<RushmoreStackParamList>
>;
