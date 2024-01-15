import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  IconButton,
  Portal,
  Dialog,
  Button,
  TextInput,
} from "react-native-paper";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import CustomAppBar from "../components/header/CustomAppBar";
import InGameStatsColumn from "../components/InGameStatsColumn";
import { UserRushmoreGameSessionItem } from "../model/UserRushmoreGameSessionItem";
import InGameKeyboard from "../components/InGameKeyboard";

const defaultImage = require("../assets/shylo.png");

// Sample data, get from API later
const userRushmoreGameSessionItemData: UserRushmoreGameSessionItem[] = [
  {
    urgsiId: 1,
    urgsId: 101,
    uriItemTitle: "Lord of The Rings - Return of the King",
    currentIndex: 2,
  },
  {
    urgsiId: 2,
    urgsId: 102,
    uriItemTitle: "The Matrix",
    currentIndex: 0,
  },
  {
    urgsiId: 3,
    urgsId: 103,
    uriItemTitle: "Fight Club",
    currentIndex: 1,
  },
];

export const InProgressGameScreen = () => {
  const [yourScore, setYourScore] = useState<number>(50000);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState(userRushmoreGameSessionItemData);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  const stats = {
    totalCompleted: Math.floor(Math.random() * 1000000) + 1,
    likes: Math.floor(Math.random() * 1000000) + 1,
    shares: Math.floor(Math.random() * 1000000) + 1,
  };

  console.log("Before handleKeyPress");

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);
  const handleInputChange = (text: string) => setInputText(text);

  const handleSolve = () => {
    console.log("Solve pressed with input:", inputText);
    hideModal();
  };

  const handleKeyPress = (value: string) => {
    console.log("Key pressed:", value);
    // Handle the key press as needed
  };


  const renderUserRushmoreGameSessionItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<UserRushmoreGameSessionItem>) => {
    console.log("renderUserRushmoreGameSessionItem" + JSON.stringify(item));

    const displayTitle = item.uriItemTitle
      .split("")
      .map((char, index) => (
        <View key={index}>
          <Text style={styles.text}>
            {/[a-zA-Z0-9]/.test(char)
              ? pressedKeys.includes(char.toLowerCase())
                ? char
                : "_"
              : char}
          </Text>
        </View>
      ));

    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "red" : "orange" },
          ]}
        >
          <Text style={styles.text}>{displayTitle}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView>
      <CustomAppBar
        username="kingpia"
        avatarUri={defaultImage.uri}
        highScorer={"Dan"}
        firstToComplete={"Matt"}
      />
      <View style={{ flexDirection: "row-reverse" }}>
        <Text>Your Score - {yourScore}</Text>
      </View>

      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.urgsiId.toString()}
        renderItem={renderUserRushmoreGameSessionItem}
      />

      <View style={{ position: "absolute", right: 10, top: 450 }}>
        <InGameStatsColumn {...stats} />
      </View>
      <InGameKeyboard
        onPress={handleKeyPress}
        pressedKeys={pressedKeys}
        setPressedKeys={setPressedKeys}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => console.log("Navigate or exit")}>
          <IconButton icon="exit-to-app" size={30} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={showModal}>
            <IconButton icon="star" size={50} iconColor="orange" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log("Navigate or exit")}>
          <IconButton icon="information" size={30} />
        </TouchableOpacity>
      </View>

      <Portal>
        <Dialog visible={isModalVisible} onDismiss={hideModal}>
          <Dialog.Title>Solve a rushmore item</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Your answer"
              value={inputText}
              onChangeText={handleInputChange}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Cancel</Button>
            <Button onPress={handleSolve}>Solve</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

// Updated styles
const styles = StyleSheet.create({
  rowItem: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 50,
    borderColor: "blue", // Add border color
    borderRadius: 5, // Add border radius for rounded corners (adjust as needed)
    margin: 2,
  },
  text: {
    color: "green",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 2, // Adjust vertical margin based on your preference
    margin: 2,
  },
});

export default InProgressGameScreen;
