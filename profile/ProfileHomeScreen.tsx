import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, IconButton, Text } from "react-native-paper";
import { ProfileStackParamList } from "../nav/params/ProfileStackParamList";
import { UserService } from "../service/UserService";

type ProfileStackContainerScreenProps =
  NativeStackScreenProps<ProfileStackParamList>;

export const ProfileHomeScreen = ({
  navigation,
}: ProfileStackContainerScreenProps) => {
  const [userData, setUserData] = useState<User>();
  const defaultImage = require("../assets/shylo.png");
  //Fetch Profile Information
  //Send profile information when clicking edit profile

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = "PiA_ID"; // Replace with the actual user ID
        const userService = new UserService<User>();

        const data = await userService.getUserByUserId(uid, uid);

        console.log("Data from fetch: " + JSON.stringify(data));
        setUserData(data);
      } catch (error) {
        console.error("Error fetching rushmore data:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [userData]);

  const navigateToEditProfileScreen = (userData: User) => {
    navigation.navigate("EditProfileScreen", {
      userData,
    });
  };

  return (
    <View style={styles.container}>
      {/* Circular Image */}
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={150}
          source={defaultImage} // Replace with the path to your image
          style={styles.avatar}
        />
        {/* "+" Icon Button */}
        <IconButton
          icon="plus"
          size={20}
          onPress={() => console.log("Change Avatar")}
          style={styles.plusIcon}
        />
      </View>

      {/* Username */}
      <Text style={styles.username}>@{userData?.userName}</Text>
      {/* Edit Profile Button */}
      <Button
        mode="text"
        onPress={() => userData && navigateToEditProfileScreen(userData)}
      >
        Edit Profile
      </Button>

      {/* Following, Followers, and Friends Buttons */}
      <View style={styles.buttonContainer}>
        <View>
          <Button
            mode="text"
            onPress={() =>
              navigation.navigate("FriendsStackContainer", {
                screen: "FriendsTopTabContainer",
                params: {
                  screen: "FollowingScreen",
                },
              })
            }
          >
            Following
          </Button>
          <Text>{userData?.followingCount}</Text>
        </View>
        <Text style={styles.pipeSeparator}>|</Text>
        <View>
          <Button
            mode="text"
            onPress={() =>
              navigation.navigate("FriendsStackContainer", {
                screen: "FriendsTopTabContainer",
                params: {
                  screen: "FollowersScreen",
                },
              })
            }
          >
            Followers
          </Button>
          <Text>{userData?.followerCount}</Text>
        </View>
        <Text style={styles.pipeSeparator}>|</Text>
        <View>
          <Button
            mode="text"
            onPress={() =>
              navigation.navigate("FriendsStackContainer", {
                screen: "FriendsTopTabContainer",
                params: {
                  screen: "FriendsScreen",
                },
              })
            }
          >
            Friends
          </Button>
          <Text>{userData?.friendCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    marginBottom: 10,
  },
  plusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white", // Add a background color to the button
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  pipeSeparator: {
    marginHorizontal: 5,
    fontSize: 20,
  },
});
function UseState<T>(): any {
  throw new Error("Function not implemented.");
}
