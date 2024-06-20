import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { UserRushmore } from "../model/UserRushmore";
import SocialUserCard from "../components/SocialUserCard";
import { RushmoreService } from "../service/RushmoreService";

type UserRushmorLikeListScreenProps =
  StackContainerScreenProps<"UserRushmoreLikeListScreen">;

const rushmoreService = new RushmoreService(); // Replace with your actual API base URL

export const UserRushmorLikeListScreen = ({
  route,
}: UserRushmorLikeListScreenProps) => {
  const [socialUsers, setSocialUsers] = useState<SocialUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [createdDt, setCreatedDt] = useState<string | null>(null);
  const [noMoreItems, setNoMoreItems] = useState<boolean>(false);

  const userRushmore: UserRushmore | undefined = route.params?.userRushmore;

  const fetchUserRushmoreLikes = async () => {
    if (loading || noMoreItems) return;

    setLoading(true);
    try {
      if (userRushmore) {
        const response = await rushmoreService.getUserRushmoreLikeList(
          userRushmore.urId,
          15,
          createdDt
        );
        setSocialUsers((prevUsers) => [...prevUsers, ...response.results]);
        setCreatedDt(response.createdDt);
        if (!response.createdDt) {
          setNoMoreItems(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user rushmore likes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!loading && !noMoreItems) {
      fetchUserRushmoreLikes();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserRushmoreLikes();
    }, [])
  );

  const renderItem = ({ item }: { item: SocialUser }) => (
    <SocialUserCard
      user={item}
      onPressFollow={(followedUid: string) =>
        console.log(`Follow ${followedUid}`)
      }
      onUnfollow={(followedUid: string) =>
        console.log(`Unfollow ${followedUid}`)
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayLarge">Like List</Text>
      <FlatList
        data={socialUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator animating /> : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default UserRushmorLikeListScreen;
