import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button, Dialog, Portal } from "react-native-paper";



type InGameKeyboardProps = {
    onPress: (value: string) => void;
    pressedKeys: string[];
    setPressedKeys: React.Dispatch<React.SetStateAction<string[]>>;
};



const InGameKeyboard: React.FC<InGameKeyboardProps> = ({ onPress, pressedKeys, setPressedKeys }) => {
    const rows = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m", "Solves"],
    ];


    const [guessesModalVisible, setGuessesModalVisible] = useState(false);

    const showGuessesModal = () => {
        setGuessesModalVisible(true);
    };

    const closeGuessesModal = () => {
        setGuessesModalVisible(false);
    };

    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
    const [selectedKey, setSelectedKey] = useState("");

    const handleKeyPress = (key: string) => {
        if (!pressedKeys.includes(key)) {
            setSelectedKey(key);
            setConfirmationDialogVisible(true);
        }
    };

    const confirmKeyPress = () => {
        setPressedKeys([...pressedKeys, selectedKey.toLowerCase()]);
        onPress(selectedKey);
        setConfirmationDialogVisible(false);
    };


    const cancelKeyPress = () => {
        setSelectedKey("");
        setConfirmationDialogVisible(false);
    };

    const isKeyPressed = (key: string) => pressedKeys.includes(key.toLowerCase());

    return (
        <View style={styles.keyboardContainer}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((key, keyIndex) => (
                        <TouchableOpacity
                            key={keyIndex}
                            style={[
                                styles.key,
                                isKeyPressed(key) && styles.keyPressed,
                            ]}
                            onPress={() => handleKeyPress(key)}
                            disabled={isKeyPressed(key)}
                        >
                            <Text>{key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}

            <Portal>
                <Dialog visible={confirmationDialogVisible} onDismiss={cancelKeyPress}>
                    <Dialog.Title>{`Confirm "${selectedKey}" selected`}</Dialog.Title>
                    <Dialog.Actions>
                        <Button onPress={cancelKeyPress}>Cancel</Button>
                        <Button onPress={confirmKeyPress}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>

                {/* Guesses Modal */}
                <Dialog visible={guessesModalVisible} onDismiss={closeGuessesModal}>
                    <Dialog.Title>Your guesses are here</Dialog.Title>
                    <Dialog.Actions>
                        <Button onPress={closeGuessesModal}>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>


        </View>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        borderColor: "gray",
        paddingBottom: 3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 3,
    },
    key: {
        padding: 12,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
    },
    keyPressed: {
        backgroundColor: "lightgray",
    },
});
export default InGameKeyboard;