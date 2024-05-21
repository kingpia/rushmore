import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { AppStackParamList } from "../nav/params/AppStackParamList";

type AccountScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: any;
};

export const AccountScreen = ({ navigation, route }: AccountScreenProps) => {
  const navigateToUserInfoSettingsScreen = () => {
    navigation.navigate("UserInfoSettingsScreen");
  };

  const PasswordChangeSettingsScreen = () => {
    navigation.navigate("PasswordChangeSettingsScreen");
  };

  const DeleteAccountSettingsScreen = () => {
    navigation.navigate("DeleteAccountSettingsScreen");
  };

  const DeactivateAccountSettingsScreen = () => {
    navigation.navigate("DeactivateAccountSettingsScreen");
  };
  return (
    <View>
      <List.Item
        title="User Info"
        onPress={() => navigateToUserInfoSettingsScreen()}
        left={(props) => <List.Icon {...props} icon="account-circle" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <List.Item
        title="Password"
        onPress={() => PasswordChangeSettingsScreen()}
        left={(props) => <List.Icon {...props} icon="lock" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <List.Item
        title="Delete Account"
        onPress={() => DeleteAccountSettingsScreen()}
        left={(props) => <List.Icon {...props} icon="delete" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <List.Item
        title="Deactivate Account"
        onPress={() => DeactivateAccountSettingsScreen()}
        left={(props) => <List.Icon {...props} icon="cancel" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
