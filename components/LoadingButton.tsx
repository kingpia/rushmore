// src/components/LoadingButton.tsx

import React from "react";
import { Button, ActivityIndicator, Text } from "react-native-paper";
import { View } from "react-native";
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
      style={[style]}
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

export default LoadingButton;
