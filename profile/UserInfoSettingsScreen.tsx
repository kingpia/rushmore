import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { List, Divider, Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList"; // Adjust the import path as necessary
import { UserService } from "../service/UserService";
import { useFocusEffect } from "@react-navigation/native";

type UserInfoSettingsScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

export const UserInfoSettingsScreen = ({
  navigation,
}: UserInfoSettingsScreenProps) => {
  const userService = new UserService();

  const [userData, setUserData] = useState<User | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      console.log("inside useFocusEffect");
      const fetchUserData = async () => {
        try {
          const userInfo = await userService.getUserAccountInformation();
          setUserData(userInfo);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displaySmall" style={styles.headerText}>
        User Info
      </Text>
      <List.Item
        title="Name"
        description={userData?.nickName || "Loading..."}
      />
      <Divider />
      <List.Item
        title="Username"
        description={userData?.userName || "Loading..."}
      />
      <Divider />
      <List.Item
        title="Email"
        description={userData?.email || "Loading..."}
        onPress={() => navigation.navigate("ChangeEmailScreen")}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title="Date of Birth"
        description={userData?.dob || "Loading..."}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerText: {
    marginBottom: 16,
  },
});

export default UserInfoSettingsScreen;
