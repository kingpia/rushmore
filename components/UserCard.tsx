import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";

type UserCardProps = {
  user: User;
  onPress: () => void;
};

export const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const defaultImage = require("../assets/shylo.png");

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ margin: 2 }}>
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Circular Image */}
          <Avatar.Image
            size={60}
            source={defaultImage} // Replace with the path to the user's avatar
            style={{ marginRight: 10 }}
          />

          {/* User Info */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {user.name}
            </Text>
            <Text variant="bodyMedium">@{user.userName}</Text>
          </View>

          {/* Following Button with adjusted height */}
          <Button mode="outlined" style={{ marginRight: 5 }}>
            Following
          </Button>

          {/* Bell Icon Button */}
          <IconButton
            icon="bell"
            size={30}
            onPress={() => {
              // Handle button press if needed
            }}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
