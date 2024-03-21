import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Divider } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../nav/params/AppStackParamList";

type ProfileSettingsScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  navigation,
}) => {
  const handleAccountPress = () => {
    // Handle navigation to Account screen
  };

  const handleTermsAndPolicyPress = () => {
    // Handle navigation to Terms and Policy screen
  };

  const handleLogoutPress = () => {
    // Handle logout action
  };

  return (
    <View style={styles.container}>
      <List.Item
        title="Account"
        onPress={handleAccountPress}
        left={(props) => <List.Icon {...props} icon="account" />}
      />
      <Divider />
      <List.Item
        title="Terms and Policy"
        onPress={handleTermsAndPolicyPress}
        left={(props) => <List.Icon {...props} icon="file-document" />}
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
