import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { parse, format } from "date-fns";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import { RushmoreVisibilityEnums } from "../model/UserRushmore";
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";
import { Image } from "expo-image";

type MyInProgressRushmoreCardProps = {
  myInProgressRushmore: UserRushmoreDTO;
  onPress: () => void;
};

export const MyInProgressRushmoreCard: React.FC<
  MyInProgressRushmoreCardProps
> = ({ myInProgressRushmore, onPress }) => {
  console.log("createdDt:", myInProgressRushmore.userRushmore.createdDt);

  const { visibility, gameType, rushmore, version } =
    myInProgressRushmore.userRushmore;
  const parsedCreatedDt = parse(
    myInProgressRushmore.userRushmore.createdDt,
    "EEE MMM dd HH:mm:ss 'UTC' yyyy",
    new Date()
  );
  const formattedCreatedDt = format(parsedCreatedDt, "MMM d yyyy");
  const defaultImage = require("../assets/shylo.png");

  let visibilityIcon;
  if (visibility === RushmoreVisibilityEnums.PUBLIC) {
    visibilityIcon = (
      <MaterialCommunityIcons name="eye" size={17} color="#4caf50" />
    );
  } else {
    visibilityIcon = (
      <MaterialCommunityIcons name="eye-off" size={17} color="#f44336" />
    );
  }

  let gameTypeIcon;
  if (gameType === RushmoreGameTypeEnums.GAME) {
    gameTypeIcon = (
      <MaterialCommunityIcons name="puzzle" size={17} color="#ff9800" />
    );
  } else {
    gameTypeIcon = (
      <MaterialCommunityIcons name="earth" size={17} color="#2196f3" />
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: rushmore.imageUrl }}
                placeholder={defaultImage}
                contentFit="contain"
                transition={1000}
              />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.rushmoreType}>
                {myInProgressRushmore.userRushmore.rushmoreType}
              </Text>
              <Text style={styles.title}>
                {myInProgressRushmore.userRushmore.rushmore.title}
              </Text>
            </View>
            <Text style={styles.date}>{formattedCreatedDt}</Text>
          </View>
          <View style={styles.iconRow}>
            <View style={styles.iconContainer}>
              {visibilityIcon}
              <Text style={styles.iconLabel}>Visibility</Text>
            </View>
            <View style={styles.iconContainer}>
              {gameTypeIcon}
              <Text style={styles.iconLabel}>Type</Text>
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
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },
  rushmoreType: {
    fontSize: 14,
    color: "#888",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 14,
    marginLeft: 5,
  },
});

export default MyInProgressRushmoreCard;
