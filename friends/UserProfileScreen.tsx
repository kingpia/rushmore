import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { UserService } from "../service/UserService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";
import { UserRushmore } from "../model/UserRushmore";
import { UserRushmoreCard } from "../components/UserRushmoreCard";
import { categories } from "../model/Categories";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { getSocialNetworkButtonText } from "../utils/SocialUtils";

type UserProfileScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "UserProfileScreen">;
};

export const UserProfileScreen = ({
  route,
  navigation,
}: UserProfileScreenProps) => {
  const [userData, setUserData] = useState<SocialUser>();
  const [userRushmoreData, setUserRushmoreData] = useState<UserRushmore[]>();
  const defaultImage = require("../assets/shylo.png");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [socialButtonText, setSocialButtonText] = useState<string>("");
  const userService = new UserService<User>();

  useFocusEffect(
    React.useCallback(() => {
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

        const userRushmoreData = await userService.getUserRushmoreList(
          route.params.user.uid
        );
        console.log("User Profile Data:" + JSON.stringify(user));
        setUserRushmoreData(userRushmoreData);
        setSocialButtonText(
          getSocialNetworkButtonText(user.socialRelationship)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [route.params.user.uid, navigation]);

  const handleCategoryPress = (category: string) => {
    console.log(`Clicked on ${category}`);
    setSelectedCategory(category);
  };

  const countByCategory = (category: string): number => {
    return (
      userRushmoreData?.filter((item) =>
        category === "All" ? true : item.rushmore.category === category
      ).length || 0
    );
  };

  const getCategoryWithCount = (category: string): string => {
    const count = countByCategory(category);
    return `${category} ${count}`;
  };

  const filteredUserRushmoreData = userRushmoreData?.filter(
    (item) =>
      selectedCategory === "All" || item.rushmore.category === selectedCategory
  );

  const navigateToRushmoreGameScreen = (userRushmore: UserRushmore) => {
    console.log("Navigate to FollowingInProgressRushmore rushmore screen");
    navigation.navigate("RushmoreGameScreen", { urId: userRushmore.urId }); // PassurId
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

  const handleSocialAction = () => {
    console.log("handlesocialAction");
    switch (socialButtonText) {
      case "Follow back":
        followUser(userData?.uid ?? "");
        setSocialButtonText("Friends");
        break;
      case "Friends":
        unfollowUser(userData?.uid ?? "");
        setSocialButtonText("Follow back");
        break;
      case "Follow":
        followUser(userData?.uid ?? "");
        setSocialButtonText("Following");
        break;
      case "Following":
        unfollowUser(userData?.uid ?? "");
        setSocialButtonText("Follow");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={120}
            source={defaultImage}
            style={styles.avatar}
          />
          <Text style={styles.username}>@{route.params.user.userName}</Text>
        </View>

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
              onPress={() =>
                navigation.push("UserNetworkTopTabContainer", {
                  user: userData,
                  screen: "FollowingScreen", // Specify the screen to navigate to
                })
              }
            >
              Following
            </Button>
            <Text style={styles.buttonText}>{userData?.followingCount}</Text>
          </View>
          <Text style={styles.pipeSeparator}>|</Text>
          <View style={styles.centeredText}>
            <Button
              mode="text"
              onPress={() =>
                navigation.push("UserNetworkTopTabContainer", {
                  user: userData,
                  screen: "FollowersScreen", // Specify the screen to navigate to
                })
              }
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
        />
      </View>

      {filteredUserRushmoreData && filteredUserRushmoreData.length > 0 ? (
        <FlatList
          data={filteredUserRushmoreData}
          keyExtractor={(item) => item.urId.toString()}
          renderItem={({ item }) => (
            <UserRushmoreCard
              userRushmore={item}
              onPress={() => navigateToRushmoreGameScreen(item)}
            />
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No Rushmore Results</Text>
      )}
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
  noResultsText: {
    fontSize: 15,
    marginTop: 20,
    alignSelf: "center",
  },
});
