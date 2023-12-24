import { SafeAreaView, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

export const FollowingRushmoreCard = (
  followingRushmoreCard: FollowingRushmoreCard
) => {
  return (
    <Card>
      <Card.Title title={followingRushmoreCard.rushmore} />
      <Card.Content>
        <View>
          <Text>{followingRushmoreCard.followingUsername}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <Text variant="bodyMedium">Current Score</Text>
            <Text variant="bodyMedium">{followingRushmoreCard.yourScore}</Text>
          </View>
          <View>
            <Text variant="bodyMedium">Total Completes</Text>
            <Text variant="bodyMedium">
              {followingRushmoreCard.totalTimesCompleted}
            </Text>
          </View>
          <View>
            <Text variant="bodyMedium">High Score</Text>
            <Text variant="bodyMedium">{followingRushmoreCard.highScore}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
