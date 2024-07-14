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
import SocialUserCard from "../components/SocialUserCard";
import { RushmoreService } from "../service/RushmoreService";
import { UserService } from "../service/UserService";
import { UserRushmoreViewComplete } from "../model/UserRushmoreViewComplete";
import { UserRushmoreViewCompleteResponseDTO } from "../model/UserRushmoreViewCompleteResponseDTO";

type UserRushmoreCompletedListScreenProps =
  StackContainerScreenProps<"UserRushmoreCompletedListScreen">;

const rushmoreService = new RushmoreService(); // Replace with your actual API base URL
const userService = new UserService();

export const UserRushmoreCompletedListScreen = ({
  route,
  navigation,
}: UserRushmoreCompletedListScreenProps) => {
  const [socialUsers, setSocialUsers] = useState<SocialUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUserRushmoreViewComplete, setLastUserRushmoreViewComplete] =
    useState<UserRushmoreViewComplete | null>(null);
  const [noMoreItems, setNoMoreItems] = useState<boolean>(false);

  const userRushmore: UserRushmore | undefined = route.params?.userRushmore;

  const fetchUserRushmoreViewCompletes = async (reset: boolean = false) => {
    if (loading || noMoreItems) return;
    setLoading(true);
    try {
      if (userRushmore) {
        const userRushmoreViewComplete: UserRushmoreViewComplete = {
          urId: userRushmore.urId,
          uid: reset ? "" : lastUserRushmoreViewComplete?.uid || "",
          createdDt: reset ? "" : lastUserRushmoreViewComplete?.createdDt || "",
        };

        const response: UserRushmoreViewCompleteResponseDTO[] =
          await rushmoreService.getUserRushmoreViewCompleteList(
            userRushmoreViewComplete,
            15
          );
        console.log(
          "UserRushmoreViewComplete Response:",
          JSON.stringify(response, null, 2)
        );

        const validResponses = response.filter(
          (res) => res.socialUserResponseDTO && res.userRushmoreViewComplete
        );
        const newSocialUsers = validResponses.map(
          (res) => res.socialUserResponseDTO
        );
        const newLastUserRushmoreViewComplete = validResponses.length
          ? validResponses[validResponses.length - 1].userRushmoreViewComplete
          : null;

        setSocialUsers((prevUsers) =>
          reset ? newSocialUsers : [...prevUsers, ...newSocialUsers]
        );
        if (
          newLastUserRushmoreViewComplete &&
          newLastUserRushmoreViewComplete.createdDt
        ) {
          setLastUserRushmoreViewComplete(newLastUserRushmoreViewComplete);
        } else {
          setNoMoreItems(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user rushmore view completes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!loading && !noMoreItems) {
      fetchUserRushmoreViewCompletes();
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("userCallback()");
      setLastUserRushmoreViewComplete(null); // Reset last user like on screen focus
      setNoMoreItems(false); // Reset no more items on screen focus
      setSocialUsers([]); // Clear the list on screen focus
      fetchUserRushmoreViewCompletes(true); // Fetch new data with reset
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
        <Appbar.Content title="Views" />
      </Appbar.Header>
      <View style={styles.listContainer}>
        {loading && socialUsers.length === 0 ? (
          <ActivityIndicator animating />
        ) : socialUsers.length === 0 ? (
          <Text style={styles.emptyMessage}>No Views</Text>
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

export default UserRushmoreCompletedListScreen;
