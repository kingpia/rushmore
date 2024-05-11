import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Rushmore } from "../model/Rushmore";
import { formatCount } from "../utils/CountUtils";

type RushmoreCardProps = {
  rushmore: Rushmore;
  onPress: () => void;
};
export const RushmoreCard: React.FC<RushmoreCardProps> = ({
  rushmore,
  onPress,
}) => {
  console.log("RushmoreCard:" + JSON.stringify(rushmore));
  const [hasFunds, setHasFunds] = useState<boolean>(true);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.title_row}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text variant="titleMedium">{rushmore.title}</Text>
            <Text style={styles.bullet}> •</Text>
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color="black"
            />
            <Text variant="bodyMedium">
              {formatCount(rushmore.completedCount)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="hammer" size={16} color="black" />
            <Text variant="bodyMedium">{rushmore.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
  },
  title_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  bullet: {
    marginRight: 5,
    fontSize: 20,
  },
});
