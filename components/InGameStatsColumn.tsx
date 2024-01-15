// InGameStatsColumn.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type InGameStatsColumnProps = {
    totalCompleted: number;
    likes: number;
    shares: number;
};

const InGameStatsColumn: React.FC<InGameStatsColumnProps> = ({
    totalCompleted,
    likes,
    shares,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name="check" size={30} color="green" />
                <Text style={styles.countText}>{totalCompleted}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name="heart" size={30} color="red" />
                <Text style={styles.countText}>{likes}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name="share" size={30} color="blue" />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
    },
    iconContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 8,
    },
    countText: {
        marginTop: 4,
        fontSize: 14,
    },
});

export default InGameStatsColumn;
