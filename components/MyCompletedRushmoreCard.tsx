import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { parse, format } from "date-fns";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import { UserRushmore } from "../model/UserRushmore";
import { Image } from "expo-image";

const defaultImage = require("../assets/shylo.png");

interface MyCompletedRushmoreCardProps {
  userRushmoreDTO: UserRushmoreDTO;
  onPress: (userRushmore: UserRushmore) => void;
  styleLatest?: boolean; // Optional prop to style the latest version
}

const MyCompletedRushmoreCard: React.FC<MyCompletedRushmoreCardProps> = ({
  userRushmoreDTO,
  onPress,
  styleLatest = false,
}) => {
  const {
    rushmoreType,
    completedDt,
    ownerUser,
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

  // Log all properties to check for null values
  console.log("userRushmoreDTO:", userRushmoreDTO);

  // Ensure rushmore properties are not null
  const rushmoreImageUrl = rushmore?.imageUrl || defaultImage;
  const rushmoreTitle = rushmore?.title || "N/A";

  const parsedCompletedDt = completedDt
    ? parse(completedDt, "EEE MMM dd HH:mm:ss 'GMT' yyyy", new Date())
    : null;

  const formattedCompletedDt = parsedCompletedDt
    ? format(new Date(parsedCompletedDt), "MMM d yyyy")
    : "N/A";

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

  const isLatestVersion = userRushmoreDTO.userRushmore.version === "Latest";

  return (
    <TouchableOpacity onPress={() => onPress(userRushmoreDTO.userRushmore)}>
      <Card
        style={[
          styles.card,
          styleLatest && isLatestVersion && styles.latestCard,
        ]}
      >
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                style={styles.avatar}
                source={rushmoreImageUrl}
                placeholder={defaultImage}
                contentFit="contain"
                transition={1000}
              />
              <View style={styles.headerText}>
                <Text style={styles.rushmoreType}>{rushmoreType}</Text>
                <Text style={styles.title}>{rushmoreTitle}</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.version}>
                Version: {displayVersion || "N/A"}
              </Text>
              <Text style={styles.date}>{formattedCompletedDt}</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <MaterialCommunityIcons name="heart" size={17} color="#e91e63" />
              <Text style={styles.statsText}>{likeCount ?? "N/A"}</Text>
            </View>
            <View style={styles.statsItem}>
              <MaterialCommunityIcons
                name="bookmark"
                size={17}
                color="#ffc107"
              />
              <Text style={styles.statsText}>{bookmarkCount ?? "N/A"}</Text>
            </View>
            <View style={styles.statsItem}>
              <MaterialCommunityIcons
                name="check-circle"
                size={17}
                color="#4caf50"
              />
              <Text style={styles.statsText}>{completedCount ?? "N/A"}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="crown" size={17} color="#ff9800" />
              <Text style={styles.infoLabel}>High Score:</Text>
              <Text style={styles.infoText}>{highScore ?? "N/A"}</Text>
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
  latestCard: {
    borderColor: "#4caf50",
    borderWidth: 2,
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default MyCompletedRushmoreCard;
