import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Rushmore } from "../model/Rushmore";

type RushmoreCardProps = {
  rushmore: Rushmore;
  onPress: () => void;
};
export const RushmoreCard: React.FC<RushmoreCardProps> = ({
  rushmore,
  onPress,
}) => {
  console.log("RushmoreCard:" + JSON.stringify(rushmore));

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {/* Circular Avatar */}
          <Avatar.Image
            size={60}
            source={{ uri: rushmore.icon }}
            style={styles.avatar}
          />

          {/* Title and User Info */}
          <View style={styles.titleUserInfoContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>{rushmore.title}</Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color="black"
              />
              <Text variant="bodyMedium">{rushmore.timesCompleted}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  titleUserInfoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  crownUsernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  username: {
    marginLeft: 5,
    fontSize: 14,
  },
  additionalInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  infoItem: {
    alignItems: "center",
  },
});
