import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { UserRushmore } from "../model/UserRushmore";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Make sure to import the appropriate icons library
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";

type YourInProgressRushmoreCardProps = {
  yourInProgressRushmore: UserRushmore;
  onPress: () => void;
};

export const YourInProgressRushmoreCard: React.FC<
  YourInProgressRushmoreCardProps
> = ({ yourInProgressRushmore, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ margin: 2 }}>
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Circular Avatar */}
          <Avatar.Image
            size={60}
            source={{ uri: yourInProgressRushmore.icon }}
            style={{ marginRight: 10 }}
          />

          {/* Title and User Info */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {yourInProgressRushmore.type}{" "}
                {yourInProgressRushmore.rushmoreTitle}{" "}
              </Text>
              {yourInProgressRushmore.gameType ===
                RushmoreGameTypeEnums.GAME && (
                <MaterialCommunityIcons name="puzzle" size={18} color="black" />
              )}
            </View>
            {/* Additional Info */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="eye" size={24} color="black" />
                <Text variant="bodyMedium">
                  {yourInProgressRushmore.visibility}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color="black"
                />
                <Text variant="bodyMedium">
                  {yourInProgressRushmore.completedCount}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
