import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Avatar, Button, List, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackContainerScreenProps } from "../nav/params/SettingsStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

type EditProfileScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "EditProfileScreen">;
};

export const EditProfileScreen = ({
  navigation,
  route,
}: EditProfileScreenProps) => {
  let userData = route.params?.user;
  console.log("userData:" + JSON.stringify(userData));

  const defaultImage = require("../assets/shylo.png");

  const handleEditPhotoPress = () => {
    console.log("Clicked the Change photo button");
    // Add functionality for editing the photo
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

      {/* List Items */}
      <List.Item
        title="Name"
        description={userData?.nickName}
        onPress={() => navigation.push("EditNameScreen", { userData })}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title="Username"
        description={userData?.userName}
        onPress={() => navigation.push("EditUsernameScreen", { userData })}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
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
    opacity: 0.7,
  },
  cameraIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -20,
    marginLeft: -20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  editPhotoButton: {
    marginTop: 10,
    fontSize: 16,
  },
});
