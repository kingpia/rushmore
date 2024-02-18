import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type UserRushmoreStatsColumnProps = {
    likeCount: number;
    totalCompleted: number;
    highScoreUser: User | undefined;
    firstToCompleteUser: User | undefined;
};

const UserRushmoreStatsColumn: React.FC<UserRushmoreStatsColumnProps> = ({
    likeCount,
    totalCompleted,
    highScoreUser,
    firstToCompleteUser,
}) => {
    const truncateUsername = (username: string): string => {
        const maxLength = 10;
        return username.length > maxLength
            ? username.substring(0, maxLength) + "..."
            : username;
    };

    return (
        <View style={styles.container}>
            {/* Like Count */}
            <TouchableOpacity onPress={() => console.log("Like count pressed")}>
                <View style={styles.iconContainer}>
                    <Icon name="heart" size={30} color="red" />
                    <Text style={styles.countText}>{likeCount}</Text>
                </View>
            </TouchableOpacity>

            {/* Total Completed */}
            <TouchableOpacity onPress={() => console.log("Total completed pressed")}>
                <View style={styles.iconContainer}>
                    <Icon name="check" size={30} color="green" />
                    <Text style={styles.countText}>{totalCompleted}</Text>
                </View>
            </TouchableOpacity>

            {/* High Score User */}
            <TouchableOpacity onPress={() => console.log("High score user pressed")}>
                <View style={styles.iconContainer}>
                    <Icon name="crown" size={30} color="gold" />
                    <Text style={styles.usernameText}>
                        @{truncateUsername(highScoreUser?.userName ?? "")}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* First to Complete User */}
            <TouchableOpacity onPress={() => console.log("First to complete user pressed")}>
                <View style={styles.iconContainer}>
                    <Icon name="ribbon" size={30} color="purple" />
                    <Text style={styles.usernameText}>
                        @{truncateUsername(firstToCompleteUser?.userName ?? "")}
                    </Text>
                </View>
            </TouchableOpacity>
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
    usernameText: {
        marginTop: 4,
        fontSize: 14,
        textAlign: "center",
    },
});

export default UserRushmoreStatsColumn;
