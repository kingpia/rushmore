import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Card, Avatar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { parse, format } from "date-fns";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import { UserRushmore } from "../model/UserRushmore";

interface PublishedUserRushmoreCardProps {
  userRushmoreDTO: UserRushmoreDTO;
  onPress: (userRushmore: UserRushmore) => void;
}

const PublishedUserRushmoreCard: React.FC<PublishedUserRushmoreCardProps> = ({
  userRushmoreDTO,
  onPress,
}) => {
  const {
    rushmoreType,
    completedDt,
    highScoreUser,
    highScore,
    firstCompletedUser,
    completedCount,
    firstCompletedDt,
    bookmarkCount,
    likeCount,
    displayVersion,
    rushmore,
  } = userRushmoreDTO.userRushmore;
  const { userRushmoreGameSession } = userRushmoreDTO;

  const { title } = userRushmoreDTO.userRushmore.rushmore;

  const parsedCompletedDt = parse(
    completedDt,
    "EEE MMM dd HH:mm:ss 'GMT' yyyy",
    new Date()
  );

  const formattedCompletedDt = format(
    new Date(parsedCompletedDt),
    "MMM d yyyy"
  );

  let formattedFirstCompletedDt = "N/A";

  if (firstCompletedDt) {
    const parsedFirstCompletedDt = parse(
      firstCompletedDt,
      "EEE MMM dd HH:mm:ss 'GMT' yyyy",
      new Date()
    );

    formattedFirstCompletedDt = format(
      new Date(parsedFirstCompletedDt),
      "MMM d yyyy"
    );
  }

  let score: number | null = null;
  if (userRushmoreGameSession) {
    score = userRushmoreGameSession.score;
  }
  console.log("VERSION:" + displayVersion);

  return (
    <TouchableOpacity onPress={() => onPress(userRushmoreDTO.userRushmore)}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Avatar.Image size={40} source={{ uri: rushmore.imageUrl }} />
              <View style={styles.headerText}>
                <Text style={styles.rushmoreType}>{rushmoreType}</Text>
                <Text style={styles.title}>{title}</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.version}>Version: {displayVersion}</Text>
              <Text style={styles.date}>{formattedCompletedDt}</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <MaterialCommunityIcons name="heart" size={17} color="#e91e63" />
              <Text style={styles.statsText}>{likeCount}</Text>
            </View>
            <View style={styles.statsItem}>
              <MaterialCommunityIcons
                name="bookmark"
                size={17}
                color="#ffc107"
              />
              <Text style={styles.statsText}>{bookmarkCount}</Text>
            </View>
            <View style={styles.statsItem}>
              <MaterialCommunityIcons
                name="check-circle"
                size={17}
                color="#4caf50"
              />
              <Text style={styles.statsText}>{completedCount}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="crown" size={17} color="#ff9800" />
              <Text style={styles.infoLabel}>High Score:</Text>
              <Text style={styles.infoText}>{highScore}</Text>
              <Text style={styles.infoText}>
                @{highScoreUser ? highScoreUser.userName : "N/A"}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="medal" size={17} color="#ff5722" />
              <Text style={styles.infoLabel}>First:</Text>
              <Text style={styles.infoText}>{formattedFirstCompletedDt}</Text>
              <Text style={styles.infoText}>
                @{firstCompletedUser ? firstCompletedUser.userName : "N/A"}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 7,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 10,
  },
  rushmoreType: {
    fontSize: 14,
    color: "#888",
  },
  version: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsText: {
    fontSize: 14,
    marginLeft: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
  },
  headerRight: {
    alignItems: "flex-end",
  },
});

export default PublishedUserRushmoreCard;
