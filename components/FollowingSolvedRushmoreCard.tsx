import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { FollowingSolvedRushmore } from "../model/FollowingSolvedRushmore";

type FollowingSolvedRushmoreCardProps = {
  followingSolvedRushmore: FollowingSolvedRushmore;
  onPress: () => void;
};

export const FollowingSolvedRushmoreCard: React.FC<
  FollowingSolvedRushmoreCardProps
> = ({ followingSolvedRushmore, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ margin: 2 }}>
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Circular Avatar */}
          <Avatar.Image
            size={60}
            source={{ uri: followingSolvedRushmore.icon }}
            style={{ marginRight: 10 }}
          />

          {/* Title and User Info */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {followingSolvedRushmore.type}{" "}
              {followingSolvedRushmore.rushmoreTitle}
            </Text>
            <Text>@{followingSolvedRushmore.username}</Text>

            {/* Additional Info */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View>
                <Text variant="bodyMedium">Your Score</Text>
                <Text variant="bodyMedium">
                  {followingSolvedRushmore.yourScore}
                </Text>
              </View>
              <View>
                <Text variant="bodyMedium">High Score</Text>
                <Text variant="bodyMedium">
                  {followingSolvedRushmore.highScore}
                </Text>
              </View>
              <View>
                <Text variant="bodyMedium">Solved Count</Text>
                <Text variant="bodyMedium">
                  {followingSolvedRushmore.solvedCount}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
