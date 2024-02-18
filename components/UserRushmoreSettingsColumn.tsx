// UserRushmoreSettingsColumn.tsx

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, IconButton } from "react-native-paper";
import {
    RushmoreVisibilityEnums,
    RushmoreGameTypeEnums,
    RushmoreType,
    UserRushmore,
} from "../model/UserRushmore";

// Import icons from react-native-vector-icons
import Icon from "react-native-vector-icons/FontAwesome";

type UserRushmoreSettingsColumnProps = {
    userRushmore: UserRushmore;
    onVisibilityToggle: () => void;
    onGameTypeToggle: () => void;
    onRushmoreTypeToggle: () => void;
};

const UserRushmoreSettingsColumn: React.FC<UserRushmoreSettingsColumnProps> = ({
    userRushmore,
    onVisibilityToggle,
    onGameTypeToggle,
    onRushmoreTypeToggle,
}) => {
    const [visibilityIcon, setVisibilityIcon] = useState(
        userRushmore.visibility === RushmoreVisibilityEnums.PUBLIC
            ? "eye"
            : "eye-off"
    );
    const [visibilityText, setVisibilityText] = useState(
        userRushmore.visibility === RushmoreVisibilityEnums.PUBLIC
            ? "Public"
            : "Private"
    );

    const [gameTypeIcon, setGameTypeIcon] = useState(
        userRushmore.gameType === RushmoreGameTypeEnums.GAME ? "puzzle" : "floppy"
    );
    const [gameTypeText, setGameTypeText] = useState(
        userRushmore.gameType === RushmoreGameTypeEnums.GAME ? "Game" : "Open"
    );

    const [rushmoreTypeIcon, setRushmoreTypeIcon] = useState(
        userRushmore.rushmoreType === RushmoreType.Favorite ? "heart" : "trophy"
    );
    const [rushmoreTypeText, setRushmoreTypeText] = useState(
        userRushmore.rushmoreType === RushmoreType.Favorite ? "Favorite" : "Best"
    );

    const toggleVisibility = () => {
        onVisibilityToggle();
        setVisibilityIcon((prev) =>
            prev === "eye" ? "eye-off" : "eye"
        );
        setVisibilityText((prev) =>
            prev === "Public" ? "Private" : "Public"
        );
        // If visibility is private, hide the Game Type button
        if (userRushmore.visibility === RushmoreVisibilityEnums.PRIVATE) {
            setGameTypeIcon("hidden");
        } else {
            // If visibility is public, show the Game Type button
            setGameTypeIcon(
                userRushmore.gameType === RushmoreGameTypeEnums.GAME ? "puzzle" : "earth"
            );
        }
    };


    const toggleGameType = () => {
        onGameTypeToggle();
        setGameTypeIcon((prev) =>
            prev === "puzzle" ? "earth" : "puzzle"
        );
        setGameTypeText((prev) =>
            prev === "Game" ? "Open" : "Game"
        );
    };

    const toggleRushmoreType = () => {
        onRushmoreTypeToggle();
        setRushmoreTypeIcon((prev) =>
            prev === "heart" ? "trophy" : "heart"
        );
        setRushmoreTypeText((prev) =>
            prev === "Favorite" ? "Best" : "Favorite"
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleVisibility}>
                <View style={styles.iconContainer}>
                    <IconButton icon={visibilityIcon} size={30} />
                    <Text>{visibilityText}</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={toggleRushmoreType}>
                <View style={styles.iconContainer}>
                    <IconButton icon={rushmoreTypeIcon} size={30} />
                    <Text>{rushmoreTypeText}</Text>
                </View>
            </TouchableOpacity>

            {gameTypeIcon !== "hidden" && ( // Conditionally render Game Type button
                <TouchableOpacity onPress={toggleGameType}>
                    <View style={styles.iconContainer}>
                        <IconButton icon={gameTypeIcon} size={30} />
                        <Text>{gameTypeText}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
    },
    iconContainer: {
        marginBottom: 8,
        alignItems: "center",
    },
});

export default UserRushmoreSettingsColumn;
