import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Rushmore } from "../model/Rushmore";
import { formatCount } from "../utils/CountUtils";

type RushmoreCardProps = {
  rushmore: Rushmore;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export const RushmoreCard: React.FC<RushmoreCardProps> = ({
  rushmore,
  onPress,
  disabled,
  style,
}) => {
  const [hasFunds, setHasFunds] = useState<boolean>(true);
  const defaultImage = require("../assets/shylo.png");

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Card style={[styles.card, style]}>
        <Card.Content>
          <View style={styles.titleRow}>
            <View style={styles.iconTitleContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={
                    rushmore?.icon ? { uri: rushmore.icon } : defaultImage
                  }
                  style={styles.image}
                  contentFit="contain"
                  transition={1000}
                />
              </View>
              <Text variant="titleMedium" style={styles.titleText}>
                {rushmore.title}
              </Text>
              <Text style={styles.bullet}>•</Text>
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color="black"
              />
              <Text variant="bodyMedium" style={styles.completedCount}>
                {formatCount(rushmore.completedCount)}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <MaterialCommunityIcons name="hammer" size={16} color="black" />
              <Text variant="bodyMedium" style={styles.priceText}>
                {rushmore.price}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 7,
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5, // half of the width and height to make it circular
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
  bullet: {
    marginHorizontal: 5,
    fontSize: 20,
    color: "#888",
  },
  completedCount: {
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    marginLeft: 5,
  },
});

export default RushmoreCard;
