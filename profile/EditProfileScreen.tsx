import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  ProfileStackParamList,
  StackContainerScreenProps,
} from "../nav/params/ProfileStackParamList";

type EditProfileScreenProps = StackContainerScreenProps<"EditProfileScreen">;

export const EditProfileScreen = ({
  navigation,
  route,
}: EditProfileScreenProps) => {
  let userData = route.params.userData;
  const defaultImage = require("../assets/shylo.png");
  // Need the userinformation from ProfileScreen.

  const handleEditPhotoPress = () => {
    console.log("Clicked the Change photo button");
    // Add functionality for editing the photo
  };

  const navigateToEditName = () => {
    //Send User information to next screen
    //navigation.push("EditNameScreen", {});
    navigation.push("EditNameScreen", { userData });
  };

  const navigateToEditUsername = () => {
    //send username information to next screen
    //navigation.push("EditUsernameScreen"{});
    navigation.push("EditUsernameScreen", { userData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={120}
          source={defaultImage}
          style={styles.dimmedAvatar}
        />
        <View style={styles.cameraIconContainer}>
          <Icon name="photo-camera" size={40} color="white" />
        </View>
        <Button
          mode="text"
          onPress={handleEditPhotoPress}
          style={styles.editPhotoButton}
        >
          Change photo
        </Button>
      </View>

      {/* Name Button */}

      <Button mode="text" onPress={navigateToEditName}>
        <View style={styles.textContainer}>
          <Text>Name</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>{route.params?.userData.name}</Text>
            <Icon name="keyboard-arrow-right" size={24} color="black" />
          </View>
        </View>
      </Button>

      <Button mode="text" onPress={navigateToEditUsername}>
        <View style={styles.textContainer}>
          <Text>Username</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>{route.params?.userData.userName}</Text>
            <Icon name="keyboard-arrow-right" size={24} color="black" />
          </View>
        </View>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  dimmedAvatar: {
    opacity: 0.7, // Adjust the opacity as needed
  },
  cameraIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -20, // Half of the camera icon size
    marginLeft: -20, // Half of the camera icon size
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  editPhotoButton: {
    marginTop: 10,
    fontSize: 16,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
});
