import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, IconButton, Text } from "react-native-paper";
import { ProfileStackParamList } from "../navigation/ProfileStackContainerParamList";

type ProfileStackContainerScreenProps =
  NativeStackScreenProps<ProfileStackParamList>;

export const ProfileHomeScreen = ({
  navigation,
}: ProfileStackContainerScreenProps) => {
  const defaultImage = require("../assets/shylo.png");

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
      <Text style={styles.username}>@shylo</Text>
      {/* Edit Profile Button */}
      <Button mode="text" onPress={() => navigation.push("EditProfileScreen")}>
        Edit Profile
      </Button>

      {/* Following, Followers, and Friends Buttons */}
      <View style={styles.buttonContainer}>
        <View>
          <Button
            mode="text"
            onPress={() => {
              console.log("pressed to go to following");
              navigation.navigate("Tab", { screen: "FriendsTopTabContainer" });
            }}
          >
            Following
          </Button>
          <Text>12</Text>
        </View>
        <Text style={styles.pipeSeparator}>|</Text>
        <View>
          <Button mode="text" onPress={() => console.log("Followers")}>
            Followers
          </Button>
          <Text>2</Text>
        </View>
        <Text style={styles.pipeSeparator}>|</Text>
        <View>
          <Button
            mode="text"
            onPress={() => {
              console.log("pressed to go to following");
              navigation.navigate("FriendsTopTab", { screen: "FriendsScreen" });
            }}
          >
            Friends
          </Button>
          <Text>2</Text>
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
