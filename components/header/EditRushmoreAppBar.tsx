// CustomAppBar.tsx

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { format } from "date-fns";

type CustomAppBarProps = {
    rushmoreTitle: string;
    rushmoreType: string;
    username: string;
    completedDt: Date | undefined;
};

const CustomAppBar: React.FC<CustomAppBarProps> = ({
    rushmoreTitle,
    rushmoreType,
    username,
    completedDt
}) => {

    const formattedDate = format(completedDt ?? new Date(), "MMM d yyyy");

    return (
        <View style={styles.container}>
            {/* Rushmore Title */}
            <View style={styles.userInfoContainer}>
                <Text style={styles.title}>{rushmoreType} {rushmoreTitle}</Text>
            </View>
            <Text>{formattedDate}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 8,
        justifyContent: "space-around", // Add space between children
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarButton: {
        borderRadius: 20,
        overflow: "hidden",
        marginRight: 8,
    },
    userInfo: {
        flexDirection: "column",
        marginRight: 8,
    },
    username: {
        fontWeight: "bold",
        fontSize: 16,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
    smallUsername: {
        fontSize: 12,
        color: "gray",
    },
    additionalInfo: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    icon: {
        marginRight: 4,
    },
    infoText: {
        fontSize: 12,
        color: "gray",
    },
    favoriteMoviesText: {
        marginLeft: "auto",
        fontWeight: "bold",
        fontSize: 16,
    },
});
export default CustomAppBar;
