import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { FollowingInProgressRushmore } from "../model/FollowingInProgressRushmore";

type FollowingInProgressRushmoreCardProps = {
  followingInProgressRushmore: FollowingInProgressRushmore;
  onPress: () => void;
};

export const FollowingInProgressRushmoreCard: React.FC<
  FollowingInProgressRushmoreCardProps
> = ({ followingInProgressRushmore, onPress }) => {
  console.log(
    "FollowingInProgressRushmoreCard:" +
      JSON.stringify(followingInProgressRushmore)
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ margin: 2 }}>
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Circular Avatar */}
          <Avatar.Image
            size={60}
            source={{ uri: followingInProgressRushmore.icon }}
            style={{ marginRight: 10 }}
          />

          {/* Title and User Info */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {followingInProgressRushmore.type}{" "}
              {followingInProgressRushmore.rushmoreTitle}
            </Text>

            <Text>@{followingInProgressRushmore.username}</Text>

            {/* Additional Info */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View>
                <Text variant="bodyMedium">Current Score</Text>
                <Text variant="bodyMedium">
                  {followingInProgressRushmore.currentScore}
                </Text>
              </View>
              <View>
                <Text variant="bodyMedium">High Score</Text>
                <Text variant="bodyMedium">
                  {followingInProgressRushmore.highScore}
                </Text>
              </View>
              <View>
                <Text variant="bodyMedium">Solved Count</Text>
                <Text variant="bodyMedium">
                  {followingInProgressRushmore.solvedCount}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
