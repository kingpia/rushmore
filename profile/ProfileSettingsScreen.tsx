import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Divider } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import * as SecureStore from "expo-secure-store";

type ProfileSettingsScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  navigation,
}) => {
  const handleAccountPress = () => {
    navigation.push("AccountScreen"); // Navigate to AccountScreen
  };

  const handleTermsAndPolicyPress = () => {
    navigation.push("TermsAndPolicyScreen"); // Navigate to AccountScreen
  };

  const handleLogoutPress = async () => {
    console.log("Logout Pressed. Implement Me");

    // Delete accessToken and refreshToken from SecureStore
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");

    navigation.reset({
      index: 0,
      routes: [{ name: "AuthStackContainer" }],
    });
  };

  return (
    <View style={styles.container}>
      <List.Item
        title="Account"
        onPress={handleAccountPress} // Call handleAccountPress onPress
        left={(props) => <List.Icon {...props} icon="account" />}
        right={() => <List.Icon icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title="Terms and Policy"
        onPress={handleTermsAndPolicyPress}
        left={(props) => <List.Icon {...props} icon="file-document" />}
        right={() => <List.Icon icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title="Logout"
        onPress={handleLogoutPress}
        left={(props) => <List.Icon {...props} icon="logout" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileSettingsScreen;
