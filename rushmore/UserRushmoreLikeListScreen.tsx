import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Text, Appbar } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { UserRushmore } from "../model/UserRushmore";
import { UserLike } from "../model/UserLike";
import SocialUserCard from "../components/SocialUserCard";
import { RushmoreService } from "../service/RushmoreService";
import { UserLikeResponseDTO } from "../model/UserLikeResponseDTO";
import { UserService } from "../service/UserService";

type UserRushmorLikeListScreenProps =
  StackContainerScreenProps<"UserRushmoreLikeListScreen">;

const rushmoreService = new RushmoreService(); // Replace with your actual API base URL
const userService = new UserService();

export const UserRushmorLikeListScreen = ({
  route,
  navigation,
}: UserRushmorLikeListScreenProps) => {
  const [socialUsers, setSocialUsers] = useState<SocialUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUserLike, setLastUserLike] = useState<UserLike | null>(null);
  const [noMoreItems, setNoMoreItems] = useState<boolean>(false);

  const userRushmore: UserRushmore | undefined = route.params?.userRushmore;

  const fetchUserRushmoreLikes = async (reset: boolean = false) => {
    if (loading || noMoreItems) return;

    setLoading(true);
    try {
      if (userRushmore) {
        const userLike: UserLike = {
          urId: userRushmore.urId,
          uid: reset ? "" : lastUserLike?.uid || "",
          createdDt: reset ? "" : lastUserLike?.createdDt || "",
        };

        const response: UserLikeResponseDTO[] =
          await rushmoreService.getUserRushmoreLikeList(userLike, 15);
        console.log("UserLikeResponse:", JSON.stringify(response, null, 2));

        const validResponses = response.filter(
          (res) => res.socialUserResponseDTO && res.userLike
        );
        const newSocialUsers = validResponses.map(
          (res) => res.socialUserResponseDTO
        );
        const newLastUserLike = validResponses.length
          ? validResponses[validResponses.length - 1].userLike
          : null;

        setSocialUsers((prevUsers) =>
          reset ? newSocialUsers : [...prevUsers, ...newSocialUsers]
        );
        if (newLastUserLike && newLastUserLike.createdDt) {
          setLastUserLike(newLastUserLike);
        } else {
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
      console.log("userCallback()");
      setLastUserLike(null); // Reset last user like on screen focus
      setNoMoreItems(false); // Reset no more items on screen focus
      setSocialUsers([]); // Clear the list on screen focus
      fetchUserRushmoreLikes(true); // Fetch new data with reset
    }, [])
  );

  const navigateToUserProfileScreen = (user: SocialUser) => {
    navigation.navigate("UserProfileScreen", { user });
  };

  const followUser = async (followedUid: string) => {
    try {
      const updatedUser = await userService.followUser(followedUid);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async (followedUid: string) => {
    try {
      const updatedUser = await userService.unfollowUser(followedUid);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const renderItem = ({ item }: { item: SocialUser }) => (
    <TouchableOpacity onPress={() => navigateToUserProfileScreen(item)}>
      <SocialUserCard
        user={item}
        onPressFollow={followUser}
        onUnfollow={unfollowUser}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Likes" />
      </Appbar.Header>
      <View style={styles.listContainer}>
        {loading && socialUsers.length === 0 ? (
          <ActivityIndicator animating />
        ) : socialUsers.length === 0 ? (
          <Text style={styles.emptyMessage}>Nobody likes this</Text>
        ) : (
          <FlatList
            data={socialUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.uid}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              loading ? <ActivityIndicator animating /> : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    margin: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default UserRushmorLikeListScreen;
