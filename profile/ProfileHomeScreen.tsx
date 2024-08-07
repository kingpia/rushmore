import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Button,
  IconButton,
  ActivityIndicator,
  Appbar,
  Menu,
  Divider,
  Portal,
} from "react-native-paper";
import { UserService } from "../service/UserService";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { ErrorMessage } from "../components/error/ErrorMessage";
import { IMAGE_UPDATE_ERROR_MESSAGE } from "../constants/ErrorMessages";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { SettingsStackParamList } from "../nav/params/SettingsStackParamList";
import { MyRushmoreListsComponent } from "../components/MyRushmoreListsComponent";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FollowingRushmoreListsComponent from "../components/FollowingRushmoreListsComponent";
import { MyBookmarkedListsComponent } from "../components/MyBookmarkedListComponent";
import { MyLikedListsComponent } from "../components/MyLikedListComponent";
import { useUserFocus } from "../service/UserFocusContext";

type ProfileStackContainerScreenProps = NativeStackScreenProps<
  SettingsStackParamList & AppStackParamList
>;
const Item = ({ title }) => <Text style={styles.item}>{title}</Text>;

const Tab = createMaterialTopTabNavigator();

const ProfileTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Lists"
        component={MyRushmoreListsComponent}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="format-list-numbered"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Puzzle"
        component={FollowingRushmoreListsComponent}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="puzzle" size={24} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={MyBookmarkedListsComponent}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="bookmark" size={24} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Like"
        component={MyLikedListsComponent}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="heart" size={24} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export const ProfileHomeScreen = ({
  navigation,
}: ProfileStackContainerScreenProps) => {
  const [userData, setUserData] = useState<SocialUser>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userService = new UserService<SocialUser>();
  const [menuVisible, setMenuVisible] = useState(false);
  console.log("ProfileHomeScreen");
  const { setUserFocus } = useUserFocus(); // Destructure setUserFocus here
  const defaultImage = require("../assets/shylo.png");

  // Inside ProfileHomeScreen component
  useFocusEffect(
    React.useCallback(() => {
      console.log("ProfileHome Use Effect Running...");
      const fetchData = async () => {
        console.log("Fetching user Data:");
        try {
          const data = await userService.getMyUserProfile();
          console.log("UserData" + JSON.stringify(data));
          setUserData(data);
          /**
           * Null the user focus.
           */
          setUserFocus(null);

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching rushmore data:", error);
          setIsLoading(false);
        }
      };

      fetchData();

      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  const navigateToEditProfileScreen = (user: SocialUser) => {
    navigation.push("EditProfileScreen", {
      user: user,
    });
  };

  const navigateToMyFollowingScreen = (user: SocialUser) => {
    console.log("UserData Before Navigate:" + JSON.stringify(user));
    navigation.push("MyUserNetworkTopTabContainer", {
      screen: "MyFollowingScreen", // Navigate to the tab navigator
      user: user,
      params: {
        // Pass parameters to the tab navigator
        screen: "MyFollowingScreen", // Navigate to the FollowingScreen within the tab
        params: {
          // Pass parameters to the FollowingScreen
          user: user,
        },
      },
    });
  };

  const navigateToMyFollowersScreen = (user: SocialUser) => {
    navigation.push("MyUserNetworkTopTabContainer", {
      screen: "MyFollowersScreen",
      user: user,
      params: {
        // Pass parameters to the tab navigator
        screen: "MyFollowersScreen", // Navigate to the FollowingScreen within the tab
        params: {
          // Pass parameters to the FollowingScreen
          user: user,
        },
      },
    });
  };
  const navigateToMyFriendsScreen = (user: SocialUser) => {
    navigation.push("MyUserNetworkTopTabContainer", {
      screen: "MyFriendsScreen",
      user: user,
      params: {
        // Pass parameters to the tab navigator
        screen: "MyFollowingScreen", // Navigate to the FollowingScreen within the tab
        params: {
          // Pass parameters to the FollowingScreen
          user: user,
        },
      },
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

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleErrorModalClose = () => {
    setErrorModalVisible(false);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleSettingsPress = () => {
    closeMenu();
    navigation.navigate("ProfileSettingsScreen");
  };

  const handleMenuPress = () => {
    setMenuVisible(true);
  };
  const DATA = Array.from({ length: 50 }, (_, index) => ({
    id: index.toString(),
    title: `Item ${index + 1}`,
  }));
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {userData && (
        <Appbar.Header statusBarHeight={0}>
          <Appbar.Content title={userData?.nickName} />
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton icon="dots-vertical" onPress={handleMenuPress} />
            }
          >
            <Menu.Item onPress={handleSettingsPress} title="Settings" />
          </Menu>
        </Appbar.Header>
      )}

      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <>
          <View style={styles.container}>
            <Image
              style={styles.avatar}
              source={
                userData?.profileImagePath
                  ? { uri: userData.profileImagePath }
                  : defaultImage
              }
            />
            <IconButton
              icon="camera"
              size={25}
              onPress={handleCameraButtonPress}
              style={styles.plusIcon}
            />
          </View>

          <Text style={styles.username}>@{userData?.userName}</Text>

          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => userData && navigateToEditProfileScreen(userData)}
              style={{
                marginRight: 3, // Add margin to the right of the "Edit Profile" button
              }}
            >
              Edit Profile
            </Button>
            <Button
              mode="contained"
              onPress={() => userData && navigateToEditProfileScreen(userData)}
            >
              Share Profile
            </Button>

            {/* Add Friend Button */}
            <IconButton
              icon="account-plus"
              size={25}
              onPress={handleAddFriendButtonPress} // Call the function to navigate to AddFriendsScreen
              style={styles.addFriendIcon}
            />
          </View>

          <View style={styles.networkButtons}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Button
                mode="text"
                onPress={() =>
                  userData && navigateToMyFollowingScreen(userData)
                }
              >
                Following
              </Button>
              <Text>{userData?.followingCount}</Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Button
                mode="text"
                onPress={() =>
                  userData && navigateToMyFollowersScreen(userData)
                }
              >
                Followers
              </Button>
              <Text>{userData?.followersCount}</Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            ></View>
          </View>
          <Divider style={{ marginTop: 10 }} />
          <ProfileTabs />

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
    alignSelf: "center",
    margin: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
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
    alignSelf: "center",
  },
  networkButtons: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
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

export default ProfileHomeScreen;
