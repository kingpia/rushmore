import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  FlatList,
} from "react-native";
import { Card, Text, ActivityIndicator } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { RouteProp } from "@react-navigation/native";
import { RushmoreService } from "../service/RushmoreService";
import { UserRushmore } from "../model/UserRushmore";
import UserRushmoreAppBar from "../components/UserRushmoreAppBar";
import { UserRushmoreItem } from "../model/UserRushmoreItem";
import UserRushmoreScreenBottom from "../components/UserRushmoreScreenBottom";
import { RushmoreItem } from "../model/RushmoreItem";
import { VisibleUserRushmoreItem } from "../components/VisibleUserRushmoreItem";
import UserRushmoreStatsColumn from "../components/UserRushmoreStatsColumn";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import { UserRushmoreGameSession } from "../model/UserRushmoreGameSession";

const { width } = Dimensions.get("window");

type UserRushmoreScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "UserRushmoreScreen">;
};
const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService

export const UserRushmoreScreen = ({
  route,
  navigation,
}: UserRushmoreScreenProps) => {
  const [userRushmore, setUserRushmore] = useState<UserRushmore | null>(null);
  const [userRushmoreGameSession, setUserRushmoreGameSession] =
    useState<UserRushmoreGameSession | null>(null);
  const [reverseOrderUserRushmoreItems, setReverseOrderUserRushmoreItems] =
    useState<UserRushmoreItem[]>([]);
  const [orderedUserRushmoreItems, setOrderedUserRushmoreItems] = useState<
    VisibleUserRushmoreItem[]
  >([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      console.log("UseRushmoreScreen Use Effect Focus Running...");

      const fetchUserRushmore = async () => {
        try {
          if (route.params.urId) {
            console.log("UseRushmoreScreen urId:" + route.params.urId);

            let userRushmoreDTO = await rushmoreService.getUserRushmore(
              route.params.urId
            );

            console.log(
              "Returned rushmore:" + JSON.stringify(userRushmoreDTO, null, 2)
            );

            const reverseOrder: UserRushmoreItem[] =
              userRushmoreDTO.userRushmore?.itemList
                ?.slice()
                .sort((a, b) => b.rank - a.rank) || [];

            const sortedItems: VisibleUserRushmoreItem[] =
              userRushmoreDTO.userRushmore?.itemList
                ?.slice()
                .sort((a, b) => a.rank - b.rank)
                .map((item) => ({
                  ...item,
                  visible:
                    !!userRushmoreDTO.userRushmoreGameSession?.completedDt,
                })) || [];

            // Insert placeholder card at index 0
            reverseOrder.unshift({
              rank: 0,
              item: "Swipe to start",
            } as UserRushmoreItem);

            if (userRushmoreDTO.userRushmoreGameSession) {
              console.log(
                "I A use rushmore game session, lets mark it and show the stats"
              );
              console.log(
                "Game Session:" +
                  JSON.stringify(userRushmoreGameSession, null, 2)
              );
              setUserRushmoreGameSession(
                userRushmoreDTO.userRushmoreGameSession
              );
            }

            setReverseOrderUserRushmoreItems(reverseOrder);
            setOrderedUserRushmoreItems(sortedItems);
            setUserRushmore(userRushmoreDTO.userRushmore);
            setUserRushmoreGameSession(userRushmoreDTO.userRushmoreGameSession);
            setLiked(userRushmoreDTO.liked || false);
            setLikeCount(userRushmoreDTO.userRushmore?.likeCount || 0);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user rushmore:", error);
          setLoading(false);
        }
      };
      fetchUserRushmore();
    }, [route.params.urId])
  );

  const userRushmoreComplete = async () => {
    console.log("User Rushmore is complete!");
    if (userRushmore) {
      try {
        let completedRushmore = await rushmoreService.userRushmoreViewComplete(
          userRushmore.urId
        );
        console.log(
          "User Rushmore completion recorded:",
          JSON.stringify(completedRushmore, null, 2)
        );
        if (completedRushmore.userRushmoreGameSession) {
          console.log("Should always get here:");
          setUserRushmoreGameSession(completedRushmore.userRushmoreGameSession);
        }
      } catch (error) {
        console.error("Error completing user rushmore view:", error);
      }
    }
  };

  const handleExitPress = async () => {
    console.log("Saving user rushmore:", userRushmore);

    if (userRushmore) {
      if (userRushmore.completedDt) {
        console.log("do nothing, we don't need to save here");
      } else {
        console.log("saving the user rushmore:" + JSON.stringify(userRushmore));
        await rushmoreService.editUserRushmore(userRushmore);
      }
    }
    navigation.goBack();
  };

  const handleSnapToItem = (index: number) => {
    const snappedItem = reverseOrderUserRushmoreItems[index];
    console.log("Snapping to item at index:", index, "Item:", snappedItem);

    setOrderedUserRushmoreItems((prevItems) =>
      prevItems.map((item) =>
        item.rank === snappedItem.rank ? { ...item, visible: true } : item
      )
    );

    if (
      snappedItem.rank === 1 ||
      index === reverseOrderUserRushmoreItems.length - 1
    ) {
      userRushmoreComplete();
    }
  };

  const renderRankedItems = ({ item }: { item: VisibleUserRushmoreItem }) => {
    return (
      <View style={styles.nonDraggableItem}>
        <View style={styles.itemContainer}>
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>{item.rank}</Text>
          </View>
          <View style={styles.itemContent}>
            {item.visible && <Text style={styles.itemText}>{item.item}</Text>}
          </View>
        </View>
      </View>
    );
  };

  const renderCarouselItem = ({
    item,
    index,
  }: {
    item: UserRushmoreItem;
    index: number;
  }) => {
    if (index === 0 && item.item === "Swipe to start") {
      return (
        <Card style={styles.placeholderCard}>
          <Card.Content>
            <Text style={styles.placeholderText}>{item.item}</Text>
          </Card.Content>
        </Card>
      );
    }
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.itemContainer}>
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>{item.rank}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemText}>{item.item}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const navigateToUserRushmoreLeaderboard = () => {
    console.log("navigateToUserRushmoreLeaderboard");
    if (userRushmore) {
      navigation.navigate("UserRushmoreLeaderboard", {
        userRushmore: userRushmore,
      });
    }
  };

  const handleLikeClick = async () => {
    console.log("handleLikeClick");
    if (userRushmore) {
      try {
        if (liked) {
          console.log("Call UnLike UserRushmore");
          const response = await rushmoreService.unLikeUserRushmore(
            userRushmore.urId
          );
          if (response) {
            console.log("Got response for unlike");
            setLikeCount((prevCount) => Math.max(prevCount - 1, 0)); // Ensure likeCount does not go below 0
            setLiked(false);
          }
          console.log("It missed response");
        } else {
          const response = await rushmoreService.likeUserRushmore(
            userRushmore.urId
          );
          if (response) {
            setLikeCount((prevCount) => prevCount + 1);
            setLiked(true);
          }
        }
      } catch (error) {
        console.error("Error liking/unliking user rushmore:", error);
      }
    }
  };

  const navigateToUserRushmoreVersionScreen = () => {
    console.log("navigateToUserRushmoreVersionScreen");

    if (userRushmore) {
      navigation.navigate("UserRushmoreVersionScreen", {
        userRushmore: userRushmore,
      });
    }
  };

  const navigateToUserRushmoreCompletedListScreen = () => {
    console.log("navigateToUserRushmoreCompltedListScreen");
    if (userRushmore) {
      navigation.navigate("UserRushmoreCompletedListScreen", {
        userRushmore: userRushmore,
      });
    }
  };

  const navigateToUserProfileScreen = (user: SocialUser | undefined) => {
    if (user) {
      navigation.navigate("UserProfileScreen", { user });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserRushmoreAppBar
        displayVersion={userRushmore?.displayVersion || ""}
        userRushmore={userRushmore ?? undefined}
        userRushmoreGameSession={userRushmoreGameSession ?? undefined}
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loadingIndicator}
        />
      ) : (
        <View style={styles.contentContainer}>
          {!userRushmoreGameSession?.completedDt && (
            <Carousel
              width={width}
              data={reverseOrderUserRushmoreItems}
              loop={false}
              renderItem={renderCarouselItem}
              mode="vertical-stack"
              modeConfig={{
                snapDirection: "left",
                stackInterval: 20,
              }}
              onSnapToItem={handleSnapToItem}
              overscrollEnabled={true}
              enabled={true}
              scrollAnimationDuration={50}
            />
          )}
          <FlatList
            data={orderedUserRushmoreItems}
            renderItem={renderRankedItems}
            keyExtractor={(item) => item.item}
            contentContainerStyle={styles.listContentContainer}
          />

          {userRushmoreGameSession && userRushmoreGameSession.completedDt && (
            <View style={styles.statsColumn}>
              <UserRushmoreStatsColumn
                likeCount={likeCount}
                totalCompleted={userRushmore!.completedCount}
                highScoreUser={undefined}
                firstToCompleteUser={userRushmore!.firstCompletedUser}
                displayVersion={userRushmore!.displayVersion || ""}
                handleLeaderboardClick={navigateToUserRushmoreLeaderboard}
                handleLikeClick={handleLikeClick}
                handleRushmoreVersionClick={navigateToUserRushmoreVersionScreen}
                handleCompletedClick={navigateToUserRushmoreCompletedListScreen}
                handleProfileClick={navigateToUserProfileScreen}
                liked={liked}
              />
            </View>
          )}
        </View>
      )}
      <UserRushmoreScreenBottom handleExitPress={handleExitPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  card: {
    margin: 7,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "#FFFFFF",
  },
  placeholderCard: {
    margin: 7,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "#f0f0f0", // different background color to differentiate
    alignItems: "center",
    justifyContent: "center",
    height: 200, // height to make it stand out
  },
  placeholderText: {
    fontSize: 18,
    color: "#00796B",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00796B",
  },
  itemContent: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#424242",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  nonDraggableItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "#FFFFFF",
  },

  deleteButton: {
    marginLeft: 10,
  },
  statsColumn: {
    position: "absolute",
    right: 20,
    alignItems: "center",
    bottom: 30,
  },
});

export default UserRushmoreScreen;
