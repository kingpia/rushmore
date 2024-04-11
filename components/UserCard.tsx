// UserCard.js
import React from "react";
import { View } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";

export enum FollowingStatus {
  FOLLOWING = "FOLLOWING",
  NOT_FOLLOWING = "NOT_FOLLOWING",
  REQUESTED = "REQUESTED",
  FRIEND = "FRIEND",
}

type UserCardProps = {
  user: User;
  onPressFollow: (followedUid: string) => void; // Callback to handle follow action
  onUnfollow: (followedUid: string) => void; // Callback to handle unfollow action
};

const UserCard: React.FC<UserCardProps> = ({
  user,
  onPressFollow,
  onUnfollow,
}) => {
  const defaultImage = require("../assets/shylo.png");

  const handleFollow = () => {
    if (user.following === "Y") {
      onUnfollow(user.uid);
    } else {
      onPressFollow(user.uid);
    }
  };

  // Determine button text based on following status
  const getButtonText = () => {
    switch (user.followingStatus) {
      case FollowingStatus.FOLLOWING:
        return "Following";
      case FollowingStatus.NOT_FOLLOWING:
        return "Follow";
      case FollowingStatus.REQUESTED:
        return "Requested";
      case FollowingStatus.FRIEND:
        return "Friend";
      default:
        return "Follow";
    }
  };

  return (
    <Card style={{ margin: 2 }}>
      <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image
          size={60}
          source={defaultImage}
          style={{ marginRight: 10 }}
        />

        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {user.nickName}
          </Text>
          <Text variant="bodyMedium">@{user.userName}</Text>
        </View>

        <Button
          mode={user.following === "Y" ? "contained" : "outlined"}
          onPress={handleFollow}
        >
          {user.following === "Y" ? "Following" : "Follow"}
        </Button>

        <IconButton
          icon="bell"
          size={30}
          onPress={() => {
            // Handle button press if needed
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default UserCard;
