import { View, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";

type RushmoreCardProps = {
  rushmoreCard: RushmoreCard; // Use RushmoreCardType instead of passing individual props
  onPress: () => void; // Define the onPress prop
};

export const RushmoreCard: React.FC<RushmoreCardProps> = ({
  rushmoreCard,
  onPress, // Include onPress in props
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <Card.Title title={rushmoreCard.rushmore} />
        <Card.Content>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
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
    </TouchableOpacity>
  );
};
