import React from "react";
import { Modal, Text, TouchableOpacity, StyleSheet, View } from "react-native";

interface ErrorMessageProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  isVisible,
  onClose,
  message,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>{message}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
});
