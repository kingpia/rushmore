import { SafeAreaView, View } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";

export const UserCard = (user: User) => {
  return (
    <Card>
      <Card.Title title={user.name} />
      <Card.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text variant="bodyMedium">{user.userName}</Text>
          <View>
            <Text variant="bodyMedium">Completed</Text>
            <Text variant="bodyMedium">{user.rushmoresCompletedCount}</Text>
          </View>
          <Button>Following</Button>
          <IconButton
            icon="bell"
            size={30} // Specify your desired size
            onPress={() => {
              // Handle button press if needed
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );
};
