import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type User = {
  userName: string;
};

type UserRushmoreStatsColumnProps = {
  likeCount: number;
  totalCompleted: number;
  highScoreUser: User | undefined;
  firstToCompleteUser: User | undefined;
};

const UserRushmoreStatsColumn: React.FC<UserRushmoreStatsColumnProps> = ({
  likeCount,
  totalCompleted,
  highScoreUser,
  firstToCompleteUser,
}) => {
  const truncateUsername = (username: string): string => {
    const maxLength = 10;
    return username.length > maxLength
      ? username.substring(0, maxLength) + "..."
      : username;
  };

  return (
    <View style={styles.container}>
      {/* Like Count */}
      <TouchableOpacity onPress={() => console.log("Like count pressed")}>
        <View style={styles.touchableArea}>
          <Icon name="heart" size={30} />
          <Text style={styles.countText}>{likeCount}</Text>
        </View>
      </TouchableOpacity>

      {/* Total Completed */}
      <TouchableOpacity onPress={() => console.log("Total completed pressed")}>
        <View style={styles.touchableArea}>
          <Icon name="check" size={30} />
          <Text style={styles.countText}>{totalCompleted}</Text>
        </View>
      </TouchableOpacity>

      {/* High Score User */}
      <TouchableOpacity
        onPress={() => console.log("High score user pressed")}
        disabled={!highScoreUser}
      >
        <View style={styles.touchableArea}>
          <Icon name="crown" size={30} />
          <Text style={styles.usernameText}>
            {truncateUsername(highScoreUser?.userName ?? "N/A")}
          </Text>
        </View>
      </TouchableOpacity>

      {/* First to Complete User */}
      <TouchableOpacity
        onPress={() => console.log("First to complete user pressed")}
        disabled={!firstToCompleteUser}
      >
        <View style={styles.touchableArea}>
          <Icon name="medal" size={30} />
          <Text style={styles.usernameText}>
            {truncateUsername(firstToCompleteUser?.userName ?? "N/A")}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Version pressed")}>
        <View style={styles.touchableArea}>
          <Icon name="clipboard-list-outline" size={30} />
          <Text style={styles.countText}>Latest</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  touchableArea: {
    alignItems: "center",
    paddingVertical: 5, // Increase vertical padding for better touch area
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 8,
  },
  countText: {
    marginTop: 4,
    fontSize: 14,
  },
  usernameText: {
    marginTop: 4,
    fontSize: 14,
    textAlign: "center",
  },
});

export default UserRushmoreStatsColumn;
