import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import { getSocialNetworkButtonText } from "../utils/SocialUtils";

type SocialUserCardProps = {
  user: SocialUser;
  onPressFollow: (followedUid: string) => void; // Callback to handle follow action
  onUnfollow: (followedUid: string) => void; // Callback to handle unfollow action
};

const SocialUserCard: React.FC<SocialUserCardProps> = ({
  user,
  onPressFollow,
  onUnfollow,
}) => {
  const defaultImage = require("../assets/shylo.png");
  const [buttonText, setButtonText] = useState<string>("");

  useEffect(() => {
    // Update button text based on the initial relationship status
    //console.log("should be updating button tnext here:" + JSON.stringify(user));

    setButtonText(getSocialNetworkButtonText(user.socialRelationship));
  }, [user.socialRelationship]);

  const handleSocialAction = () => {
    console.log("handlesocialAction");
    switch (buttonText) {
      case "Follow back":
        onPressFollow(user.uid);
        setButtonText("Friends");
        break;
      case "Friends":
        onUnfollow(user.uid);
        setButtonText("Follow back");
        break;
      case "Follow":
        onPressFollow(user.uid);
        setButtonText("Following");
        break;
      case "Following":
        onUnfollow(user.uid);
        setButtonText("Follow");
        break;
      case "Its You":
        setButtonText("Hi");
        break;
      default:
        break;
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Avatar.Image size={60} source={defaultImage} style={styles.avatar} />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.nickName}</Text>
          <Text variant="bodySmall">{user.userName}</Text>
        </View>

        <Button
          mode={
            buttonText === "Following" || buttonText === "Friends"
              ? "contained-tonal"
              : "contained"
          }
          onPress={handleSocialAction}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          disabled={buttonText === "Its you"} // Disable the button when buttonText is "Its you"
        >
          {buttonText}
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  button: {
    width: 120,
    marginRight: 10,
  },
  buttonLabel: {
    fontSize: 12,
  },
});

export default SocialUserCard;
