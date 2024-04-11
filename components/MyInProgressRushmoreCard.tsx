import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { RushmoreVisibilityEnums, UserRushmore } from "../model/UserRushmore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";
import { format, parse } from "date-fns";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";

type MyInProgressRushmoreCardProps = {
  myInProgressRushmore: UserRushmoreDTO;
  onPress: () => void;
};

export const MyInProgressRushmoreCard: React.FC<
  MyInProgressRushmoreCardProps
> = ({ myInProgressRushmore, onPress }) => {
  const { visibility, gameType } = myInProgressRushmore.userRushmore;
  const parsedCreatedDt = parse(
    myInProgressRushmore.userRushmore.createdDt,
    "EEE MMM dd HH:mm:ss 'GMT' yyyy",
    new Date()
  );

  const formattedCreatedDt = format(parsedCreatedDt, "MMM d yyyy");

  let visibilityIcon;
  if (visibility === RushmoreVisibilityEnums.PUBLIC) {
    visibilityIcon = <MaterialCommunityIcons name="eye" size={17} />;
  } else {
    visibilityIcon = <MaterialCommunityIcons name="lock" size={17} />;
  }

  let gameTypeIcon;
  if (gameType === RushmoreGameTypeEnums.GAME) {
    gameTypeIcon = <MaterialCommunityIcons name="puzzle" size={17} />;
  } else {
    gameTypeIcon = <MaterialCommunityIcons name="earth" size={17} />;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.title_row}>
          <Text variant="titleMedium" style={styles.text}>
            {myInProgressRushmore.userRushmore.rushmoreType}{" "}
            {myInProgressRushmore.userRushmore.rushmore.title}
            <Text style={styles.bullet}> • </Text>
            <Text variant="bodySmall">{formattedCreatedDt}</Text>
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text variant="titleSmall">Visibility: </Text>
            {visibilityIcon}
          </View>

          <Text>|</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text variant="titleSmall">Type: </Text>
            {gameTypeIcon}
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
