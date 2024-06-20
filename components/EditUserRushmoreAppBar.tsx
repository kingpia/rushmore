import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Avatar, IconButton, Menu, Text } from "react-native-paper";

type Props = {
  displayVersion: string;
  userRushmore?: {
    rushmoreType?: string;
    rushmore?: {
      title?: string;
    };
  };
  menuVisible: boolean;
  closeMenu: () => void;
  handleMenuPress: () => void;
  handleDeleteUserRushmorePress: () => void;
  handleEditPress: () => void;
  isEditMode: boolean;
};

const EditUserRushmoreAppBar: React.FC<Props> = ({
  displayVersion,
  userRushmore,
  menuVisible,
  closeMenu,
  handleMenuPress,
  handleDeleteUserRushmorePress,
  handleEditPress,
  isEditMode,
}) => {
  return (
    <Appbar.Header statusBarHeight={0} style={styles.header}>
      <View style={styles.leftContainer}>
        <Text style={styles.versionText}>{displayVersion}</Text>
        <Avatar.Icon size={40} icon="account" style={styles.avatar} />
      </View>
      <Appbar.Content
        title={
          <View style={styles.titleContainer}>
            <Text style={styles.rushmoreType}>
              {userRushmore?.rushmoreType || ""}
            </Text>
            <Text style={styles.rushmoreTitle}>
              {userRushmore?.rushmore?.title || ""}
            </Text>
          </View>
        }
      />
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPress={handleMenuPress} />}
      >
        <Menu.Item
          onPress={handleDeleteUserRushmorePress}
          title="Delete Rushmore"
        />
        {!isEditMode && (
          <Menu.Item onPress={handleEditPress} title="Edit Rushmore" />
        )}
      </Menu>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 16,
  },
  versionText: {
    fontSize: 12,
    marginBottom: 4,
  },
  avatar: {
    marginBottom: 8,
  },
  titleContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  rushmoreType: {
    fontSize: 14,
  },
  rushmoreTitle: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default EditUserRushmoreAppBar;
