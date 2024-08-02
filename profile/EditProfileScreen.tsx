import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  Avatar,
  Button,
  List,
  Divider,
  IconButton,
  Portal,
} from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { RouteProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { UserService } from "../service/UserService";

type EditProfileScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "EditProfileScreen">;
};

export const EditProfileScreen = ({
  navigation,
  route,
}: EditProfileScreenProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const userService = new UserService<SocialUser>();
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [userData, setUserData] = useState<SocialUser>();

  const defaultImage = require("../assets/shylo.png");

  useEffect(() => {
    if (route.params?.user) {
      console.log("SettingUserData:" + JSON.stringify(route.params.user));
      setUserData(route.params.user);
    } else {
      console.error(
        "For some reason route is not set, shouldn't happen, but maybe need to fetch infor here"
      );
    }
  }, [route.params?.user]);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleErrorModalClose = () => {
    setErrorModalVisible(false);
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
        const { uri, width, height } = result.assets[0];
        let compressedImageUri = uri;
        let fileSize = await getImageSize(uri);
        console.log("Initial File Size:", fileSize);

        // Initial image manipulation
        let croppedImage = await ImageManipulator.manipulateAsync(
          uri,
          [
            {
              crop: {
                originX: 0,
                originY: 0,
                width,
                height,
              },
            },
            {
              resize: {
                width: 200,
                height: 200,
              },
            },
          ],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );

        // Ensure the image is below 65KB by adjusting the compression
        let quality = 1;
        fileSize = await getImageSize(croppedImage.uri);
        console.log("Cropped Image Size:", fileSize);

        while (fileSize > 65 * 1024 && quality > 0) {
          quality -= 0.005;
          console.log("Adjusting Compression, Quality:", quality);

          croppedImage = await ImageManipulator.manipulateAsync(
            croppedImage.uri, // Use the manipulated image URI for further compression
            [{ resize: { width: 200, height: 200 } }],
            { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
          );

          fileSize = await getImageSize(croppedImage.uri);
          console.log("New File Size:", fileSize);
        }

        console.log("Final Image Size:", fileSize);

        const blob = await fetch(croppedImage.uri).then((res) => res.blob());

        const file = new File([blob], "profile_image.jpg", {
          type: "image/jpeg",
        });

        await userService.userProfileImageUpdate(croppedImage.uri);

        setUserData((prevUserData: UserDataState) => ({
          ...prevUserData,
          profileImagePath: `${croppedImage.uri}?${new Date().getTime()}`, // Adding timestamp to bypass cache
        }));
      }
    } catch (error) {
      setErrorModalVisible(true);
    } finally {
      setIsModalVisible(false);
    }
  };

  // Helper function to get image size
  const getImageSize = async (uri: string): Promise<number> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob.size;
  };

  const handleRemoveButtonPress = async () => {
    try {
      setProfileImage(undefined);
      await userService.removeProfileImage();
    } catch (error) {
      console.log("Error removing image:", error);
      setErrorModalVisible(true);
    } finally {
      setUserData((prevUserData: UserDataState) => ({
        ...prevUserData,
        profileImagePath: null,
      }));
      setIsModalVisible(false);
    }
  };
  const handleCameraButtonPress = () => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={120}
          source={
            userData?.profileImagePath
              ? { uri: userData.profileImagePath }
              : defaultImage
          }
          style={styles.dimmedAvatar}
        />
        <View style={styles.cameraIconContainer}>
          <IconButton
            icon="camera"
            size={35}
            onPress={handleCameraButtonPress}
            style={styles.cameraIcon}
          />
        </View>
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

      <Portal>
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
                  style={{ marginRight: 10 }}
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
      </Portal>
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
    marginTop: 5,
  },
  dimmedAvatar: {
    opacity: 0.7,
  },
  cameraIconContainer: {
    position: "absolute",
    top: "25%",
  },
  editPhotoButton: {
    marginTop: 10,
    fontSize: 16,
  },
  cameraIcon: {
    backgroundColor: "white",
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
  },
});
