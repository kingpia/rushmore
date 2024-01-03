import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { UserRushmore } from "../model/UserRushmore";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Make sure to import the appropriate icons library
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";

type MyCompletedRushmoreCardProps = {
  myCompletedRushmore: UserRushmore;
  onPress: () => void;
};

export const MyCompletedRushmoreCard: React.FC<
  MyCompletedRushmoreCardProps
> = ({ myCompletedRushmore, onPress }) => {
  const isGameType =
    myCompletedRushmore.gameType === RushmoreGameTypeEnums.GAME;
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {/* Circular Avatar */}
          <Avatar.Image
            size={60}
            source={{ uri: myCompletedRushmore.icon }}
            style={styles.avatar}
          />

          {/* Title and User Info */}
          <View style={styles.titleUserInfoContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>
                {myCompletedRushmore.rushmore.type}{" "}
                {myCompletedRushmore.rushmore.title}{" "}
              </Text>
              {myCompletedRushmore.gameType === RushmoreGameTypeEnums.GAME && (
                <MaterialCommunityIcons name="puzzle" size={18} color="black" />
              )}
            </View>

            {/* Crown Icon and Username (if type is GAME) */}
            {isGameType && (
              <View style={styles.crownUsernameContainer}>
                <MaterialCommunityIcons name="crown" size={18} color="black" />
                <Text style={styles.username}>
                  @{myCompletedRushmore.highScoreUser.userName}
                </Text>
              </View>
            )}

            {/* Additional Info */}
            <View style={styles.additionalInfoContainer}>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons name="eye" size={24} color="black" />
                <Text variant="bodyMedium">
                  {myCompletedRushmore.visibility}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="thumb-up"
                  size={24}
                  color="black"
                />
                <Text variant="bodyMedium">
                  {myCompletedRushmore.likeCount}
                </Text>
              </View>
              {isGameType && (
                <View style={styles.infoItem}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={24}
                    color="black"
                  />
                  <Text variant="bodyMedium">
                    {myCompletedRushmore.completedCount}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  titleUserInfoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  crownUsernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  username: {
    marginLeft: 5,
    fontSize: 14,
  },
  additionalInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  infoItem: {
    alignItems: "center",
  },
});
