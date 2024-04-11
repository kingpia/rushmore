import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { UserRushmoreGameSession } from "../model/UserRushmoreGameSession";

type FollowingInProgressRushmoreCardProps = {
  inProgressUserRushmoreGameSession: UserRushmoreGameSession;
  onPress: () => void;
};

export const FollowingInProgressRushmoreCard: React.FC<
  FollowingInProgressRushmoreCardProps
> = ({ inProgressUserRushmoreGameSession, onPress }) => {
  console.log(
    "FollowingInProgressRushmoreCard:" +
      JSON.stringify(inProgressUserRushmoreGameSession)
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ margin: 2 }}>
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Circular Avatar */}
          <Avatar.Image
            size={60}
            source={{
              uri: inProgressUserRushmoreGameSession.userRushmore.rushmore.icon,
            }}
            style={{ marginRight: 10 }}
          />

          {/* Title and User Info */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {inProgressUserRushmoreGameSession.userRushmore.rushmoreType}{" "}
              {inProgressUserRushmoreGameSession.userRushmore.rushmore.title}
            </Text>

            <Text>
              @
              {
                inProgressUserRushmoreGameSession.userRushmore.ownerUser
                  .userName
              }
            </Text>

            {/* Additional Info */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View>
                <Text variant="bodyMedium">Current Score</Text>
                <Text variant="bodyMedium">
                  {inProgressUserRushmoreGameSession.score}
                </Text>
              </View>
              <View>
                <Text variant="bodyMedium">High Score</Text>
                <Text variant="bodyMedium">
                  {inProgressUserRushmoreGameSession.userRushmore.highScore}
                </Text>
              </View>
              <View>
                <Text variant="bodyMedium">Solved Count</Text>
                <Text variant="bodyMedium">
                  {
                    inProgressUserRushmoreGameSession.userRushmore
                      .completedCount
                  }
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
