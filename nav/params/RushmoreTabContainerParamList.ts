import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";

import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RushmoreStackParamList } from "./RushmoreStackParamList";

export type RushmoreTabContainerParamList = {
  HomeStackContainer: undefined;
  InboxHomeScreen: undefined;
  CreateRushmoreStackContainer: undefined;
  UserNetworkTopTabContainer: undefined;
  SettingsStackContainer: undefined;
};

export type TabContainerScreenProps<
  S extends keyof RushmoreTabContainerParamList
> = CompositeScreenProps<
  MaterialBottomTabScreenProps<RushmoreTabContainerParamList, S>,
  NativeStackScreenProps<RushmoreStackParamList>
>;
