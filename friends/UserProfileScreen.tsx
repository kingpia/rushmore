import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Text, Modal, Portal } from "react-native-paper";
import { UserService } from "../service/UserService";
import { UserRushmore } from "../model/UserRushmore";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { getSocialNetworkButtonText } from "../utils/SocialUtils";
import { useUserFocus } from "../service/UserFocusContext";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import PublishedUserRushmoreCard from "../components/PublishedUserRushmoreCard";

type UserProfileScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "UserProfileScreen">;
};

export const UserProfileScreen = ({
  route,
  navigation,
}: UserProfileScreenProps) => {
  const [userData, setUserData] = useState<SocialUser>();
  const [userRushmoreData, setUserRushmoreData] = useState<UserRushmoreDTO[]>();
  const defaultImage = require("../assets/shylo.png");
  const [categories, setCategories] = useState<string[]>(["All"]); // Initialize with "All"
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [socialButtonText, setSocialButtonText] = useState<string>("");
  const userService = new UserService<User>();
  const { userFocus, setUserFocus } = useUserFocus(); // Destructure setUserFocus here
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility state
  const [fadeAnim] = useState(new Animated.Value(0));

  console.log("UserProfileScreen");

  const renderItemSeparator = () => <View style={styles.divider} />;

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0); // Reset opacity to 0 when screen is focused
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
      const unsubscribe = navigation.addListener("state", (e) => {
        console.log("Current navigation state:", e.data.state);
      });

      return unsubscribe;
    }, [navigation])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userService.getUserByUserId(route.params.user.uid);
        setUserData(user);
        /**
         * Set the focus so if we navigate to UserNetworkTabs, we have the context of which user we are querying for.
         */
        console.log("User Profile Setting UserFocus to uid:" + user.uid);
        setUserFocus(user.uid);

        console.log("User Profile Data:" + JSON.stringify(user));

        //TODO: Need to get the user rushmores for this user. Only the non privates.
        const userRushmoreList = await userService.userRushmoresByUid(
          route.params.user.uid
        );
        console.log(
          "useRushmoreListData:" + JSON.stringify(userRushmoreList, null, 2)
        );
        setUserRushmoreData(userRushmoreList);
        setSocialButtonText(
          getSocialNetworkButtonText(user.socialRelationship)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [route.params.user.uid]);

  const handleCategoryPress = (category: string) => {
    console.log(`Clicked on ${category}`);
    setSelectedCategory(category);
  };

  const countByCategory = (category: string): number => {
    return (
      userRushmoreData?.filter((item) =>
        category === "All"
          ? true
          : item.userRushmore.rushmore.category === category
      ).length || 0
    );
  };

  const getCategoryWithCount = (category: string): string => {
    const count = countByCategory(category);
    return `${category} ${count}`;
  };

  const filteredUserRushmoreData = userRushmoreData?.filter(
    (item) =>
      selectedCategory === "All" ||
      item.userRushmore.rushmore.category === selectedCategory
  );

  const navigateToRushmoreGameScreen = (userRushmore: UserRushmore) => {
    console.log("Navigate to FollowingInProgressRushmore rushmore screen");
    navigation.navigate("RushmoreGameScreen", { urId: userRushmore.urId }); // PassurId
  };

  const navigateToUserRushmore = (userRushmore: UserRushmore) => {
    console.log("Navigate to navigateToUserRushmore rushmore screen");
    if (userRushmore) {
      navigation.navigate("UserRushmoreScreen", { urId: userRushmore.urId });
    }
  };

  const handleSocialAction = () => {
    console.log("handlesocialAction");
    if (!userData) return; // Exit early if `userData` is undefined

    switch (socialButtonText) {
      case "Follow back":
        followUser(userData.uid);
        setSocialButtonText("Friends");
        break;
      case "Friends":
        unfollowUser(userData.uid);
        setSocialButtonText("Follow back");
        break;
      case "Follow":
        followUser(userData.uid);
        setSocialButtonText("Following");
        break;
      case "Following":
        unfollowUser(userData.uid);
        setSocialButtonText("Follow");
        break;
      default:
        break;
    }
  };

  const followUser = async (followedUid: string) => {
    //TODO  Update the Count on screen
    try {
      const updatedUser = await userService.followUser(followedUid);

      // Update the state with followersCount decremented by 1
      setUserData((prevUserData: SocialUser | undefined) => {
        if (!prevUserData) {
          return prevUserData; // Return undefined if prevUserData is undefined
        }

        // Return the updated state with followersCount incremented by 1
        return {
          ...prevUserData,
          followersCount: prevUserData.followersCount + 1,
        };
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const unfollowUser = async (followedUid: string) => {
    console.log("unFollowerUser - followedUid:" + followedUid);
    try {
      // Update the user's following status in searchResults
      const updatedUser = await userService.unfollowUser(followedUid);

      // Update the state with followersCount decremented by 1
      setUserData((prevUserData: SocialUser | undefined) => {
        if (!prevUserData) {
          return prevUserData; // Return undefined if prevUserData is undefined
        }

        // Return the updated state with followersCount decremented by 1
        return {
          ...prevUserData,
          followersCount: prevUserData.followersCount - 1,
        };
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const navigateToFollowingScreen = (user: SocialUser) => {
    console.log("UserData Before Navigate:" + JSON.stringify(user));
    navigation.push("UserNetworkTopTabContainer", {
      screen: "FollowingScreen", // Navigate to the tab navigator
      user: user,
      params: {
        // Pass parameters to the tab navigator
        screen: "FollowingScreen", // Navigate to the FollowingScreen within the tab
        params: {
          // Pass parameters to the FollowingScreen
          user: user,
        },
      },
    });
  };

  const navigateToFollowersScreen = (user: SocialUser) => {
    navigation.push("UserNetworkTopTabContainer", {
      screen: "FollowersScreen",
      user: user,
      params: {
        // Pass parameters to the tab navigator
        screen: "FollowingScreen", // Navigate to the FollowingScreen within the tab
        params: {
          // Pass parameters to the FollowingScreen
          user: user,
        },
      },
    });
  };

  const handleProfileImagePress = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={handleProfileImagePress}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={
                userData?.profileImagePath
                  ? { uri: userData.profileImagePath }
                  : defaultImage
              }
            />
            <Text style={styles.username}>@{route.params.user.userName}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <Button
            mode={
              socialButtonText === "Following" || socialButtonText === "Friends"
                ? "contained-tonal"
                : "contained"
            }
            onPress={handleSocialAction}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            {socialButtonText}
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.centeredText}>
            <Button
              mode="text"
              onPress={() => userData && navigateToFollowingScreen(userData)}
            >
              Following
            </Button>
            <Text style={styles.buttonText}>{userData?.followingCount}</Text>
          </View>
          <Text style={styles.pipeSeparator}>|</Text>
          <View style={styles.centeredText}>
            <Button
              mode="text"
              onPress={() => userData && navigateToFollowersScreen(userData)}
            >
              Followers
            </Button>
            <Text style={styles.buttonText}>{userData?.followersCount}</Text>
          </View>
        </View>

        <RushmoreHorizontalView
          selectedCategory={selectedCategory}
          onPressCategory={handleCategoryPress}
          countByCategory={countByCategory}
          categories={categories}
        />
      </View>

      {filteredUserRushmoreData && filteredUserRushmoreData.length > 0 ? (
        <Animated.FlatList
          data={filteredUserRushmoreData}
          style={{ opacity: fadeAnim }}
          keyExtractor={(item) => item.userRushmore.urId.toString()}
          renderItem={({ item }) => (
            <PublishedUserRushmoreCard
              userRushmoreDTO={item}
              onPress={() => navigateToUserRushmore(item.userRushmore)}
            />
          )}
          ItemSeparatorComponent={renderItemSeparator}
        />
      ) : (
        <Text style={styles.emptyMessage}>No Rushmore Results</Text>
      )}

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Image
            style={styles.fullImage}
            source={
              userData?.profileImagePath
                ? { uri: userData.profileImagePath }
                : defaultImage
            }
          />
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    marginBottom: 10,
    marginTop: 5,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  pipeSeparator: {
    marginHorizontal: 10,
    fontSize: 24,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 18,
  },
  buttonText: {
    fontSize: 16,
    marginBottom: 5,
  },
  centeredText: {
    alignItems: "center",
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  divider: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  fullImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default UserProfileScreen;
