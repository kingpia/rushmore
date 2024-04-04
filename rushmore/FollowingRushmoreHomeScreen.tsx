import React, { useState, useCallback } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { RushmoreService } from "../service/RushmoreService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { FollowingSolvedRushmoreCard } from "../components/FollowingSolvedRushmoreCard";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FollowingSolvedRushmore } from "../model/FollowingSolvedRushmore";
import { FollowingInProgressRushmoreCard } from "../components/FollowingInProgressRushmoreCard";
import { FollowingInProgressRushmore } from "../model/FollowingInProgressRushmore";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import FollowingRushmoreListsComponent from "../components/FollowingRushmoreListsComponent";

type FollowingRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList & AppStackParamList>;
};

export const FollowingRushmoreHomeScreen = ({
  navigation,
}: FollowingRushmoreHomeScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FollowingRushmoreListsComponent navigation={navigation} />
    </SafeAreaView>
  );
};
