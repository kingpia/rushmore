import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import {
  Avatar,
  Button,
  IconButton,
  ActivityIndicator,
  Appbar,
  Menu,
  Divider,
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

type ProfileStackContainerScreenProps = NativeStackScreenProps<
  SettingsStackParamList & AppStackParamList
>;

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
  const defaultImage = require("../assets/shylo.png");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userService = new UserService<SocialUser>();
  const [menuVisible, setMenuVisible] = useState(false);

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
  const navigateToFriendsScreen = (user: SocialUser) => {
    navigation.push("UserNetworkTopTabContainer", {
      screen: "FriendsScreen",
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
                onPress={() => userData && navigateToFollowingScreen(userData)}
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
                onPress={() => userData && navigateToFollowersScreen(userData)}
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
    alignSelf: "center",
    margin: 5,
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
    justifyContent: "space-around",
    alignSelf: "center",
  },
});
