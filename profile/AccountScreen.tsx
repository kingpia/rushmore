import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AccountScreen: React.FC = () => {
  const navigateTo = (routeName: string) => {};

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Account" />
      </Appbar.Header>
      <TouchableOpacity onPress={() => navigateTo("UserInfoScreen")}>
        <List.Item title="User Info" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo("PasswordScreen")}>
        <List.Item title="Password" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo("DeleteAccountScreen")}>
        <List.Item title="Delete Account" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo("DeactivateAccountScreen")}>
        <List.Item title="Deactivate Account" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AccountScreen;
