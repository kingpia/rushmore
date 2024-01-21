import React, { useEffect, useState } from "react";
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
  ActivityIndicator
} from "react-native-paper";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import CustomAppBar from "../components/header/CustomAppBar";
import InGameStatsColumn from "../components/InGameStatsColumn";
import { UserRushmoreGameSessionItem } from "../model/UserRushmoreGameSessionItem";
import InGameKeyboard from "../components/InGameKeyboard";
import { RushmoreService } from "../service/RushmoreService";
import { UserRushmoreGameSession } from "../model/UserRushmoreGameSession";
import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { UserRushmore } from "../model/UserRushmore";

const defaultImage = require("../assets/shylo.png");



type RushmoreGameScreenProps =
  StackContainerScreenProps<"RushmoreGameScreen">;


export const RushmoreGameScreen = ({ navigation, route }: RushmoreGameScreenProps) => {
  const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService
  const [loading, setLoading] = useState(true);
  const [userRushmoreGameSessionLoading, setUserRushmoreGameSessionLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [userRushmoreData, setUserRushmoreData] = useState<UserRushmore>();
  const [userRushmoreGameSession, setUserRushmoreGameSession] = useState<UserRushmoreGameSession>();
  const [userRushmoreGameSessionItemList, setUserRushmoreGameSessionItemList] = useState<UserRushmoreGameSessionItem[]>([]);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);
  const handleInputChange = (text: string) => setInputText(text);



  console.log("UrID on Rushmore Game Screen:" + JSON.stringify(route.params.urId));
  // Inside InProgressGameScreen component
  useEffect(() => {
    const fetchUserRushmore = async () => {
      try {
        // Accessing urId from the FollowingInProgressRushmore object
        const urId = route.params.urId;

        // Call the new method with the obtained urId
        const userRushmore: UserRushmore = await rushmoreService.getUserRushmore(urId);
        setUserRushmoreData(userRushmore);
        // Handle the fetched user rushmore as needed
        console.log('User Rushmore:' + JSON.stringify(userRushmore));
      } catch (error) {
        console.error('Error fetching user rushmore game session:', error);
      } finally {
        setLoading(false); // Set loading to false when the async call is finished
      }
    };

    fetchUserRushmore();
  }, [route.params.urId]); // Include followingInProgressRushmore as a dependency if used inside the useEffect



  // Fetch user rushmore game session when the component mounts
  useEffect(() => {
    const fetchUserRushmoreGameSession = async () => {
      console.log("fetchUserRushmoreData");
      try {
        // Use the UR_ID to see if this user has a Game Session for this UR_ID.
        const urId = route.params?.urId;

        // Call the new method with the obtained urId
        const userRushmoreGameSession: UserRushmoreGameSession | null = await rushmoreService.getUserRushmoreGameSession(
          urId,
          'user123'
        );

        if (userRushmoreGameSession === null) {
          console.log("No game session found for this user and rushmore");
          return;
        }
        else {
          const letterSelectionArray = userRushmoreGameSession.letterSelection.toLowerCase().split('');
          setPressedKeys(letterSelectionArray);
          setUserRushmoreGameSessionItemList(userRushmoreGameSession.userRushmoreGameSessionItemList); // Set the data state
          setUserRushmoreGameSession(userRushmoreGameSession);
        }
        console.log('User Rushmore Game Session:', userRushmoreGameSession);
      } catch (error) {
        console.error('Error fetching user rushmore game session:', error);
      } finally {
        setUserRushmoreGameSessionLoading(false); // Set loading to false when the async call is finished
      }
    };

    fetchUserRushmoreGameSession();
  }, [route.params.urId]); // Include urId as a dependency if used inside the useEffect

  const startGame = async () => {
    console.log("Starting game");
    setUserRushmoreGameSessionLoading(true);
    try {
      // Call the new method with the obtained urId
      const gameSession: UserRushmoreGameSession = await rushmoreService.startRushmoreGame(route.params.urId, 'piaUser');
      setUserRushmoreGameSessionItemList(gameSession.userRushmoreGameSessionItemList);

      setUserRushmoreGameSession(gameSession);
      //No letters are set so leave array empty
      console.log("Starting:" + JSON.stringify(gameSession));
    } catch (error) {
      console.error('Error starting game:', error);
    } finally {
      setUserRushmoreGameSessionLoading(false); // Set loading to false when the async call is finished
    }
  };


  const stats = {
    totalCompleted: Math.floor(Math.random() * 1000000) + 1,
    likes: Math.floor(Math.random() * 1000000) + 1,
    shares: Math.floor(Math.random() * 1000000) + 1,
  };

  console.log("Before handleKeyPress");


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
            styles.draggableItem,
            { backgroundColor: isActive ? "red" : "orange" },
          ]}
        >
          <Text style={styles.text}>{displayTitle}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const handleExitPress = () => {
    // Perform login logic here
    console.log("Exit Pressed");
    // Reset the navigation stack to start fresh with RushmoreTabContainer
    navigation.reset({
      index: 0,
      routes: [{ name: "RushmoreTabContainer" }],
    });

  };

  console.log("Going into bthe return loading is:" + userRushmoreGameSessionLoading);
  console.log("Going into bthe return userRushrmoreGameSEssionLoading is:" + userRushmoreGameSessionLoading);
  console.log("Going into bthe return loading is is:" + loading);


  return (
    <SafeAreaView>
      <CustomAppBar
        rushmoreTitle={userRushmoreData?.rushmore?.title?.toUpperCase() || ""}
        rushmoreType={userRushmoreData?.rushmoreType || ""}
        username={userRushmoreData?.user.userName || ""}
        avatarUri={defaultImage.uri}
        highScorer={userRushmoreData?.highScoreUser?.userName || ""}
        firstToComplete={userRushmoreData?.firstToCompleteUser?.userName || ""}
        highScore={userRushmoreData?.highScore || 0}
        firstToCompleteDt={new Date()}
      />




      <View>
        {loading || userRushmoreGameSessionLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size="large" />
          </View>
        ) : (
          <>

            <View style={{ flexDirection: "row-reverse" }}>
              <Text style={styles.scoreText}>Your Score - {userRushmoreGameSession?.score}</Text>
            </View>

            <DraggableFlatList
              data={userRushmoreGameSessionItemList}
              onDragEnd={({ data }) => setUserRushmoreGameSessionItemList(data)}
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
              <TouchableOpacity onPress={() => handleExitPress()}>
                <IconButton icon="exit-to-app" size={30} />
              </TouchableOpacity>

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {userRushmoreGameSessionItemList.length > 0 ? (
                  <TouchableOpacity onPress={showModal}>
                    <IconButton icon="star" size={50} iconColor="orange" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={startGame}>
                    <Text style={styles.startButton}>Start</Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity onPress={() => console.log("Navigate or exit")}>
                <IconButton icon="information" size={30} />
              </TouchableOpacity>

            </View>
          </>
        )}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  draggableItem: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 50,
    borderColor: "blue", // Add border color
    borderRadius: 5, // Add border radius for rounded corners (adjust as needed)
    margin: 2

  },
  text: {
    color: "green",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 2, // Adjust vertical margin based on your preference
    margin: 2,
  },
  scoreText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default RushmoreGameScreen;
