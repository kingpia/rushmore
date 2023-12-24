import { SafeAreaView, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

export const RushmoreCard = (rushmoreCard: RushmoreCard) => {
  return (
    <Card>
      <Card.Title title={rushmoreCard.rushmore} />
      <Card.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <Text variant="bodyMedium">Completed</Text>
            <Text variant="bodyMedium">{rushmoreCard.timesCompleted}</Text>
          </View>
          <View>
            <Text variant="bodyMedium">Favorite</Text>
            <Text variant="bodyMedium">{rushmoreCard.favorite}</Text>
          </View>
          <View>
            <Text variant="bodyMedium">Best</Text>
            <Text variant="bodyMedium">{rushmoreCard.best}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
