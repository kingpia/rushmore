import { SafeAreaView, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

export const YourCompledRushmoreCard = (
  yourCompletedRushmoreCard: YourCompletedRushmoreCard
) => {
  return (
    <Card>
      <Card.Title title={yourCompletedRushmoreCard.rushmore} />
      <Card.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <Text variant="bodyMedium">Viewed</Text>
            <Text variant="bodyMedium">
              {yourCompletedRushmoreCard.viewedCount}
            </Text>
          </View>
          <View>
            <Text variant="bodyMedium">Solved</Text>
            <Text variant="bodyMedium">
              {yourCompletedRushmoreCard.solvedCount}
            </Text>
          </View>
          <View>
            <Text variant="bodyMedium">Bookmarked</Text>
            <Text variant="bodyMedium">
              {yourCompletedRushmoreCard.bookmarkedCount}
            </Text>
          </View>
          <View>
            <Text variant="bodyMedium">Liked</Text>
            <Text variant="bodyMedium">
              {yourCompletedRushmoreCard.likedCount}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
