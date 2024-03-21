import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import {
  Avatar,
  Button,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import { ProfileStackParamList } from "../nav/params/ProfileStackParamList";
import { UserService } from "../service/UserService";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { ErrorMessage } from "../components/error/ErrorMessage";
import { IMAGE_UPDATE_ERROR_MESSAGE } from "../constants/ErrorMessages";

type ProfileStackContainerScreenProps =
  NativeStackScreenProps<ProfileStackParamList>;

export const ProfileHomeScreen = ({
  navigation,
}: ProfileStackContainerScreenProps) => {
  const [userData, setUserData] = useState<User>();
  const defaultImage = require("../assets/shylo.png");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userService = new UserService<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = "6662";
        const data = await userService.getUserByUserId(uid, uid);
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching rushmore data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToEditProfileScreen = (userData: User) => {
    navigation.navigate("EditProfileScreen", {
      userData,
    });
  };

  const handleCameraButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleAddFriendButtonPress = () => {
    // Navigate to AddFriendsScreen
    navigation.navigate("AddFriendScreen");
  };

  const handleGalleryButtonPress = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const croppedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [
            {
              crop: {
                originX: 0,
                originY: 0,
                width: result.assets[0].width,
                height: result.assets[0].height,
              },
            },
            {
              resize: {
                width: 150,
                height: 150,
              },
            },
          ],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );

        const blob = await fetch(croppedImage.uri).then((res) => res.blob());

        const file = new File([blob], "profile_image.png", {
          type: "image/png",
        });

        await userService.userProfileImageUpdate(croppedImage.uri);

        setUserData((prevUserData: UserDataState) => ({
          ...prevUserData,
          profileImagePath: croppedImage.uri,
        }));
      }
    } catch (error) {
      setErrorModalVisible(true);
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleRemoveButtonPress = async () => {
    try {
      setProfileImage(undefined);
      await userService.updateUserProfileImage(null);
    } catch (error) {
      console.log("Error removing image:", error);
      setErrorModalVisible(true);
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleErrorModalClose = () => {
    setErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={150}
              source={{
                uri: userData?.profileImagePath || "",
              }}
              style={styles.avatar}
            />
            <IconButton
              icon="camera"
              size={25}
              onPress={handleCameraButtonPress}
              style={styles.plusIcon}
            />
          </View>

          <Text style={styles.username}>@{userData?.userName}</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Button
                mode="contained"
                onPress={() =>
                  userData && navigateToEditProfileScreen(userData)
                }
              >
                Edit Profile
              </Button>
            </View>

            {/* Add Friend Button */}
            <IconButton
              icon="account-plus"
              size={25}
              onPress={handleAddFriendButtonPress} // Call the function to navigate to AddFriendsScreen
              style={styles.addFriendIcon}
            />
          </View>

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
              <Text>{userData?.followersCount}</Text>
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

          <Modal
            visible={isModalVisible}
            transparent={true}
            onRequestClose={handleModalClose}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={handleModalClose}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Profile Photo</Text>
                <View style={styles.buttonRow}>
                  <Button
                    icon="image"
                    mode="contained"
                    onPress={handleGalleryButtonPress}
                  >
                    Gallery
                  </Button>
                  <Button
                    icon="delete"
                    mode="contained"
                    onPress={handleRemoveButtonPress}
                  >
                    Remove
                  </Button>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <ErrorMessage
            isVisible={errorModalVisible}
            onClose={handleErrorModalClose}
            message={IMAGE_UPDATE_ERROR_MESSAGE}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: 75,
  },
  plusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
  },
  addFriendIcon: {
    backgroundColor: "white",
    borderRadius: 17, // Make the button square
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
