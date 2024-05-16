import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import { UserRushmore } from "../model/UserRushmore";

import { format, parse } from "date-fns";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface MyCompletedRushmoreCardProps {
  userRushmoreDTO: UserRushmoreDTO;
  onPress: (userRushmore: UserRushmore) => void;
}

const MyCompletedRushmoreCard: React.FC<MyCompletedRushmoreCardProps> = ({
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
    bookmarkCount,
    likeCount,
  } = userRushmoreDTO.userRushmore;

  console.log("Inside UserRushmoreListComponent");
  console.log("CompletedDt:" + completedDt);
  //console.log("bookmark count is:" + bookmarkCount);
  const { userRushmoreGameSession } = userRushmoreDTO;

  const { title } = userRushmoreDTO.userRushmore.rushmore;

  const parsedCompletedDt = parse(
    completedDt,
    "EEE MMM dd HH:mm:ss 'GMT' yyyy",
    new Date()
  );

  //This is the published date
  const formattedCompletedDt = format(
    new Date(parsedCompletedDt),
    "MMM d yyyy"
  );
  console.log("Inside Formatted Completed Dt set:" + formattedCompletedDt);

  let formattedFirstCompletedDt = "N/A";

  if (firstCompletedDt) {
    const parsedFirstCompletedDt = parse(
      firstCompletedDt,
      "EEE MMM dd HH:mm:ss 'GMT' yyyy",
      new Date()
    );
    console.log(
      "Inside Formatted First Completed Dt set:" + parsedFirstCompletedDt
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

  return (
    <TouchableOpacity onPress={() => onPress(userRushmoreDTO.userRushmore)}>
      <View style={styles.container}>
        <View style={styles.title_row}>
          <Text variant="titleMedium" style={styles.text}>
            {rushmoreType} {title}
            <Text style={styles.bullet}> • </Text>
            <Text variant="bodySmall">{formattedCompletedDt}</Text>
          </Text>
        </View>

        <View>
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
              <Text variant="titleSmall"> {bookmarkCount}</Text>
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
                <Text variant="bodySmall">: {highScore}</Text>
              </View>
              <Text variant="bodySmall">
                @{highScoreUser ? highScoreUser.userName : "N/A"}
              </Text>
            </View>
          </View>

          <View style={[styles.itemContainer]}>
            <View style={[styles.itemContent, styles.border]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="medal" size={17} />
                <Text variant="titleSmall">First</Text>
                <Text variant="bodySmall">: {formattedFirstCompletedDt}</Text>
              </View>
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
    padding: 3,
    borderRadius: 5,
  },
  border: {
    borderColor: "gray",
  },
});

export default MyCompletedRushmoreCard;
