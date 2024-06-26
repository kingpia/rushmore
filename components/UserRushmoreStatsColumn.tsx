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
  firstToCompleteUser: SocialUser | undefined;
  displayVersion: string;
  handleLeaderboardClick: () => void;
  handleLikeClick: () => void;
  handleRushmoreVersionClick: () => void;
  handleCompletedClick: () => void;
  handleProfileClick: (user: SocialUser | undefined) => void;
  liked: boolean;
};

const UserRushmoreStatsColumn: React.FC<UserRushmoreStatsColumnProps> = ({
  likeCount,
  totalCompleted,
  highScoreUser,
  firstToCompleteUser,
  displayVersion,
  handleLeaderboardClick,
  handleLikeClick,
  handleRushmoreVersionClick,
  handleCompletedClick,
  handleProfileClick,
  liked,
}) => {
  const truncateUsername = (username: string): string => {
    const maxLength = 10;
    return username.length > maxLength
      ? username.substring(0, maxLength) + "..."
      : username;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLikeClick}>
        <View style={styles.touchableArea}>
          <Icon name="heart" size={30} color={liked ? "red" : "black"} />
          <Text style={styles.countText}>{likeCount}</Text>
        </View>
      </TouchableOpacity>

      {/* Total Completed */}
      <TouchableOpacity onPress={handleCompletedClick}>
        <View style={styles.touchableArea}>
          <Icon name="check" size={30} />
          <Text style={styles.countText}>{totalCompleted}</Text>
        </View>
      </TouchableOpacity>

      {/* First to Complete User */}
      <TouchableOpacity
        onPress={() => handleProfileClick(firstToCompleteUser)}
        disabled={!firstToCompleteUser}
      >
        <View style={styles.touchableArea}>
          <Icon name="medal" size={30} />
          <Text style={styles.usernameText}>
            {truncateUsername(firstToCompleteUser?.userName ?? "N/A")}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRushmoreVersionClick}>
        <View style={styles.touchableArea}>
          <Icon name="clipboard-list-outline" size={30} />
          <Text style={styles.countText}>{displayVersion}</Text>
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
