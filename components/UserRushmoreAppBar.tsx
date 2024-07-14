import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";

type Props = {
  displayVersion: string;
  userRushmore?: {
    rushmoreType?: string;
    rushmore?: {
      title?: string;
    };
  };
  userRushmoreGameSession?: {
    completedDt?: string;
  };
};

const UserRushmoreAppBar: React.FC<Props> = ({
  displayVersion,
  userRushmore,
  userRushmoreGameSession,
}) => {
  return (
    <Appbar.Header statusBarHeight={0} style={styles.header}>
      <View style={styles.leftContainer}>
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
      {userRushmoreGameSession?.completedDt && (
        <Text style={styles.completedDtText}>
          {userRushmoreGameSession.completedDt}
        </Text>
      )}
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
  completedDtText: {
    fontSize: 14,
    marginRight: 16,
  },
});

export default UserRushmoreAppBar;
