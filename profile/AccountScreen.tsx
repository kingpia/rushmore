import React from "react";
import { View, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AccountScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateTo = (routeName: string) => {
    console.log("Navigate to:" + routeName);
  };

  return (
    <View>
      <List.Item
        title="User Info"
        onPress={() => navigateTo("UserInfoScreen")}
        left={(props) => <List.Icon {...props} icon="account-circle" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <List.Item
        title="Password"
        onPress={() => navigateTo("PasswordScreen")}
        left={(props) => <List.Icon {...props} icon="lock" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <List.Item
        title="Delete Account"
        onPress={() => navigateTo("DeleteAccountScreen")}
        left={(props) => <List.Icon {...props} icon="delete" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <List.Item
        title="Deactivate Account"
        onPress={() => navigateTo("DeactivateAccountScreen")}
        left={(props) => <List.Icon {...props} icon="cancel" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
