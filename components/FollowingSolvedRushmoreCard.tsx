import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { UserRushmoreGameSession } from "../model/UserRushmoreGameSession";

type FollowingSolvedRushmoreCardProps = {
  solvedUserRushmoreGameSession: UserRushmoreGameSession;
  onPress: () => void;
};

export const FollowingSolvedRushmoreCard: React.FC<
  FollowingSolvedRushmoreCardProps
> = ({ solvedUserRushmoreGameSession, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ margin: 2 }}>
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Circular Avatar */}
          <Avatar.Image
            size={60}
            source={{
              uri: solvedUserRushmoreGameSession.userRushmore.rushmore.icon,
            }}
            style={{ marginRight: 10 }}
          />

          {/* Title and User Info */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {solvedUserRushmoreGameSession.userRushmore.rushmoreType}{" "}
              {solvedUserRushmoreGameSession.userRushmore.rushmore.title}
            </Text>
            <Text>
              @{solvedUserRushmoreGameSession.userRushmore.ownerUser.userName}
            </Text>

            {/* Additional Info */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View>
                <Text variant="bodyMedium">Your Score</Text>
                <Text variant="bodyMedium">
                  {solvedUserRushmoreGameSession.score}
                </Text>
              </View>
              <View>
                <Text variant="bodyMedium">High Score</Text>
                <Text variant="bodyMedium">
                  {solvedUserRushmoreGameSession.userRushmore.highScore}
                </Text>
              </View>
              <View>
                <Text variant="bodyMedium">Solved Count</Text>
                <Text variant="bodyMedium">
                  {solvedUserRushmoreGameSession.userRushmore.completedCount}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
