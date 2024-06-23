import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { UserRushmore } from "../model/UserRushmore";

type UserRushmoreScreenBottomProps = {
  handleExitPress: () => void;
};

const UserRushmoreScreenBottom: React.FC<UserRushmoreScreenBottomProps> = ({
  handleExitPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleExitPress} style={styles.touchable}>
        <IconButton icon="exit-to-app" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  touchable: {
    alignItems: "center",
  },
  publishButton: {
    marginHorizontal: 20,
  },
  publishButtonContent: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  spacer: {
    flex: 1,
  },
});

export default UserRushmoreScreenBottom;
