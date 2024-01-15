// CustomAppBar.tsx

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import the icon library you want to use

type CustomAppBarProps = {
    username: string;
    avatarUri: string;
    highScorer: string;
    firstToComplete: string;
};

const CustomAppBar: React.FC<CustomAppBarProps> = ({
    username,
    avatarUri,
    highScorer,
    firstToComplete,
}) => {
    const handleAvatarPress = () => {
        console.log("Avatar clicked!");
    };

    return (
        <View style={styles.container}>
            {/* Avatar (now a button) and Username */}
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={handleAvatarPress}>
                    <View style={styles.avatarButton}>
                        <Avatar.Image size={40} source={{ uri: avatarUri }} />
                    </View>
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{`Favorite Movies`}</Text>
                    <Text style={styles.smallUsername}>{`@${username}`}</Text>
                </View>
            </View>

            {/* Additional Information on the Same Row */}
            <View style={styles.additionalInfo}>
                <View style={styles.infoRow}>
                    <Icon name="trophy" size={18} color="gold" style={styles.icon} />
                    <Text style={styles.infoText}>{`@${highScorer} - 850`}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon name="check-circle" size={18} color="green" style={styles.icon} />
                    <Text style={styles.infoText}>{`@${firstToComplete} - Jan 20, 2023`}</Text>
                </View>
            </View>


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
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
