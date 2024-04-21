import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { UserService } from "../service/UserService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SocialUserCard from "../components/SocialUserCard";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { RouteProp } from "@react-navigation/native";
import { RushmoreTabContainerParamList } from "../nav/params/RushmoreTabContainerParamList";
import { UserNetworkTopTabContainerParamList } from "../nav/params/UserNetworkTopTabContainerParamList";

type FollowingScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: any;
};

const userService = new UserService(); // Instantiate UserService

export const FollowingScreen = ({
  navigation,
  route,
}: FollowingScreenProps) => {
  const [followingList, setFollowingList] = useState<SocialUser[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const fetchData = async () => {
    console.log(
      "In the folllowing Screen Fetching Data. I need the route stuff:" +
        JSON.stringify(route.params.params.user.uid)
    );

    console.log("THE UID is :" + route.params?.user?.uid);

    setLoading(true);
    try {
      console.log("THE UID is :" + route.params?.user?.uid);
      const userData: SocialUser | undefined = route.params?.params?.user; // Access userData from route params

      const followingUsers = await userService.getFollowingUserList(
        userData?.uid ?? ""
      );
      setFollowingList(followingUsers);
    } catch (error) {
      console.error("Error fetching following users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use useFocusEffect to fetch data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
      const unsubscribe = navigation.addListener("state", (e) => {
        console.log("Current navigation state:", e.data.state);
      });

      return unsubscribe;
    }, [navigation]) // Empty dependency array to run the effect only once when the component mounts
  );

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const navigateToUserProfileScreen = (user: SocialUser) => {
    console.log("navigateToUserProfileScreen");

    navigation.push("UserProfileScreen", {
      user,
    });
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
    <SafeAreaView style={{ flex: 1 }}>
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
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    flex: 1,
  },
});
