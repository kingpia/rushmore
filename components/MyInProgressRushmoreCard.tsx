import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { UserRushmore } from "../model/UserRushmore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RushmoreGameTypeEnums } from "../model/RushmoreGameTypeEnums";
import { format, parse } from "date-fns";

type MyInProgressRushmoreCardProps = {
  myInProgressRushmore: UserRushmore;
  onPress: () => void;
};

export const MyInProgressRushmoreCard: React.FC<
  MyInProgressRushmoreCardProps
> = ({ myInProgressRushmore, onPress }) => {
  const parsedCompletedDt = parse(
    myInProgressRushmore.createdDt,
    "EEE MMM dd HH:mm:ss 'GMT' yyyy",
    new Date()
  );
  const formattedCreatedDt = format(new Date(parsedCompletedDt), "MMM d yyyy");

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ margin: 2 }}>
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Circular Avatar */}
          <Avatar.Image
            size={60}
            source={{ uri: myInProgressRushmore.icon }}
            style={{ marginRight: 10 }}
          />

          {/* Title and User Info */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {myInProgressRushmore.rushmoreType}{" "}
                {myInProgressRushmore.rushmore.title}
              </Text>
              {myInProgressRushmore.gameType === RushmoreGameTypeEnums.GAME && (
                <MaterialCommunityIcons name="puzzle" size={18} color="black" />
              )}
              <Text style={{ fontSize: 12, color: "gray", marginLeft: 5 }}>
                • {formattedCreatedDt}
              </Text>
            </View>
            {/* Additional Info */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="eye" size={24} color="black" />
                <Text variant="bodyMedium">
                  {myInProgressRushmore.visibility}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
