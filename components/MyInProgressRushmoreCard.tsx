import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { parse, format } from "date-fns";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import { RushmoreVisibilityEnums } from "../model/UserRushmore";
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";

type MyInProgressRushmoreCardProps = {
  myInProgressRushmore: UserRushmoreDTO;
  onPress: () => void;
};

export const MyInProgressRushmoreCard: React.FC<
  MyInProgressRushmoreCardProps
> = ({ myInProgressRushmore, onPress }) => {
  const { visibility, gameType, rushmore, version } =
    myInProgressRushmore.userRushmore;
  const parsedCreatedDt = parse(
    myInProgressRushmore.userRushmore.createdDt,
    "EEE MMM dd HH:mm:ss 'GMT' yyyy",
    new Date()
  );
  const formattedCreatedDt = format(parsedCreatedDt, "MMM d yyyy");

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
            <View style={styles.headerLeft}>
              <Avatar.Image size={40} source={{ uri: rushmore.imageUrl }} />
              <View style={styles.headerText}>
                <Text style={styles.rushmoreType}>
                  {myInProgressRushmore.userRushmore.rushmoreType}
                </Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.version}>Version: {version}</Text>
              <Text style={styles.date}>{formattedCreatedDt}</Text>
            </View>
          </View>
          <Text style={styles.title}>
            {myInProgressRushmore.userRushmore.rushmore.title}
          </Text>
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
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "#fff",
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
  headerRight: {
    alignItems: "flex-end",
  },
  rushmoreType: {
    fontSize: 14,
    color: "#888",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: "#555",
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
