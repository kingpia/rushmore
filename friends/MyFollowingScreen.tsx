import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Searchbar, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { UserService } from "../service/UserService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SocialUserCard from "../components/SocialUserCard";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import * as SecureStore from "expo-secure-store";
import { SettingsStackParamList } from "../nav/params/SettingsStackParamList";
import { useUserFocus } from "../service/UserFocusContext";

type MyFollowingScreenProps = {
  navigation: NativeStackNavigationProp<
    AppStackParamList & SettingsStackParamList
  >;
  route: any;
};

const userService = new UserService();

export const MyFollowingScreen = ({
  navigation,
  route,
}: MyFollowingScreenProps) => {
  const [followingList, setFollowingList] = useState<SocialUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const { userFocus } = useUserFocus();

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const fetchData = async () => {
    setLoading(true);

    try {
      const followingUsers = await userService.getMyFollowingUserList();
      setFollowingList(followingUsers);
    } catch (error) {
      console.error("Error fetching following users:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [userFocus, route.params?.params?.user])
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const navigateToUserProfileScreen = async (user: SocialUser) => {
    let uid = await SecureStore.getItemAsync("uid");
    if (uid === user.uid) {
      navigation.navigate("ProfileHomeScreen");
    } else {
      navigation.navigate("UserProfileScreen", {
        user,
      });
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : followingList.length === 0 ? (
        <View style={styles.messageContainer}>
          <Text style={styles.emptyMessage}>Not following anyone</Text>
        </View>
      ) : (
        <Animated.FlatList
          data={followingList}
          keyExtractor={(item) => item.uid}
          style={[styles.flatList, { opacity: fadeAnim }]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToUserProfileScreen(item)}>
              <SocialUserCard
                user={item}
                onPressFollow={followUser}
                onUnfollow={unfollowUser}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  searchbar: {
    marginBottom: 16,
    borderRadius: 12,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#888",
  },
});
