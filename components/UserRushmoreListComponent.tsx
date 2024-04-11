import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import { UserRushmore } from "../model/UserRushmore";
import { formatDateToString } from "../utils/DateUtils";

import { format, parse } from "date-fns";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface UserRushmoreListComponentProps {
  userRushmoreDTO: UserRushmoreDTO;
  onPress: (userRushmore: UserRushmore) => void;
}

const UserRushmoreListComponent: React.FC<UserRushmoreListComponentProps> = ({
  userRushmoreDTO,
  onPress,
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
    likeCount,
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

  const parsedFirstCompletedDt = parse(
    firstCompletedDt,
    "EEE MMM dd HH:mm:ss 'GMT' yyyy",
    new Date()
  );

  const formattedFirstCompletedDt = format(
    new Date(parsedFirstCompletedDt),
    "MMM d yyyy"
  );

  let score: number | null = null;
  if (userRushmoreGameSession) {
    score = userRushmoreGameSession.score;
  }

  return (
    <TouchableOpacity onPress={() => onPress(userRushmoreDTO.userRushmore)}>
      <View style={styles.container}>
        <View style={styles.title_row}>
          <Text variant="titleMedium" style={styles.text}>
            {rushmoreType} {title}
            <Text style={styles.bullet}> • </Text>
            <Text variant="bodySmall">{formattedCompletedDt}</Text>
          </Text>
          <Text style={styles.score}>
            Your Score: {score !== null ? score : "N/A"}
          </Text>
        </View>

        <View>
          <Text style={{ marginBottom: 5 }}>
            @{ownerUser ? ownerUser.userName : "N/A"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="heart" size={17} />
              <Text variant="titleSmall"> {likeCount}</Text>
            </View>
            <Text>|</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="bookmark" size={17} />
              <Text variant="titleSmall"> 259</Text>
            </View>
            <Text>|</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="check-circle" size={17} />
              <Text variant="titleSmall"> {completedCount}</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={[styles.itemContainer]}>
            <View style={[styles.itemContent, styles.border]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="crown" size={17} />
                <Text variant="titleSmall">High Score</Text>
              </View>
              <Text variant="bodySmall">{highScore}</Text>
              <Text variant="bodySmall">
                @{highScoreUser ? highScoreUser.userName : "N/A"}
              </Text>
            </View>
          </View>

          <View style={[styles.itemContainer]}>
            <View style={[styles.itemContent, styles.border]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="medal" size={17} />
                <Text variant="titleSmall">First Complete</Text>
              </View>
              <Text variant="bodySmall">{formattedFirstCompletedDt}</Text>
              <Text variant="bodySmall">
                @{firstCompletedUser ? firstCompletedUser.userName : "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
  },
  title_row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bullet: {
    marginRight: 5,
    fontSize: 20,
  },
  text: {
    flex: 1,
  },
  score: {
    fontWeight: "bold",
  },
  itemContainer: {
    width: "50%", // Set to half of the container width to have equal space for both items
    padding: 5,
  },
  itemContent: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  border: {
    borderColor: "gray",
  },
});

export default UserRushmoreListComponent;
