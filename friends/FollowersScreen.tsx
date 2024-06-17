import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { UserService } from "../service/UserService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SocialUserCard from "../components/SocialUserCard";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import * as SecureStore from "expo-secure-store";
import { SettingsStackParamList } from "../nav/params/SettingsStackParamList";
import { useUserFocus } from "../service/UserFocusContext";

type FollowersScreenProps = {
  navigation: NativeStackNavigationProp<
    AppStackParamList & SettingsStackParamList
  >;
  route: any;
};

const userService = new UserService();

export const FollowersScreen = ({
  navigation,
  route,
}: FollowersScreenProps) => {
  const [followersList, setFollowersList] = useState<SocialUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const { userFocus } = useUserFocus();

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userData: SocialUser | undefined = route.params?.params?.user;
      console.log("Route:" + JSON.stringify(route));

      let uid: string = "";
      if (userData?.uid) {
        console.log("userData UID:" + userData?.uid);
        uid = userData?.uid;
      } else {
        console.log("Using UserFocus:" + userFocus);
        uid = userFocus || "";
      }

      const followersList = await userService.getFollowersUserList(uid);
      setFollowersList(followersList);
    } catch (error) {
      console.error("Error fetching followers:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const navigateToUserProfileScreen = async (user: SocialUser) => {
    console.log("navigateToUserProfileScreen");
    let uid = await SecureStore.getItemAsync("uid");
    console.log("Navigating to UID:" + uid);
    if (uid === user.uid) {
      console.log(
        "You need to navigate to your Profile Home. PUSH IT to stack"
      );
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
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ margin: 5 }}
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : followersList.length === 0 ? (
        <View style={styles.messageContainer}>
          <Text style={styles.emptyMessage}>No followers</Text>
        </View>
      ) : (
        <Animated.FlatList
          data={followersList}
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
