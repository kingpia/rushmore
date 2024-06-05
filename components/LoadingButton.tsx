// src/components/LoadingButton.tsx

import React from "react";
import { Button, ActivityIndicator, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles"; // Adjust the import path accordingly

type LoadingButtonProps = {
  onPress: () => void;
  isLoading: boolean;
  disabled?: boolean;
  loadingText: string;
  buttonText: string;
  style?: object;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  onPress,
  isLoading,
  disabled,
  loadingText,
  buttonText,
  style,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[styles.button, style]}
      contentStyle={{ flexDirection: "row-reverse" }}
      labelStyle={{ marginLeft: 5 }}
    >
      {isLoading ? (
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color="#ffffff"
            style={globalStyles.activityIndicator}
          />
          <Text style={globalStyles.loadingText}>{loadingText}</Text>
        </View>
      ) : (
        buttonText
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
});

export default LoadingButton;
