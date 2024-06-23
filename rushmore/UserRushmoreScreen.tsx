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
  const [reverseOrderUserRushmoreItems, setReverseOrderUserRushmoreItems] =
    useState<UserRushmoreItem[]>([]);
  const [orderedUserRushmoreItems, setOrderedUserRushmoreItems] = useState<
    VisibleUserRushmoreItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [userRushmoreCompleted, setUserRushmoreCompleted] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log("UseRushmoreScreen Use Effect Focus Running...");

      const fetchUserRushmore = async () => {
        try {
          if (route.params.urId) {
            console.log("UseRushmoreScreen urId:" + route.params.urId);

            let userRushmore = await rushmoreService.getUserRushmore(
              route.params.urId
            );
            console.log(
              "Returned rushmore:" + JSON.stringify(userRushmore, null, 2)
            );

            const reverseOrder: UserRushmoreItem[] =
              userRushmore?.itemList?.slice().sort((a, b) => b.rank - a.rank) ||
              [];

            const sortedItems: VisibleUserRushmoreItem[] =
              userRushmore?.itemList
                ?.slice()
                .sort((a, b) => a.rank - b.rank)
                .map((item) => ({ ...item, visible: false })) || [];

            // Insert placeholder card at index 0
            reverseOrder.unshift({
              rank: 0,
              item: "Swipe to start",
            } as UserRushmoreItem);

            setReverseOrderUserRushmoreItems(reverseOrder);
            setOrderedUserRushmoreItems(sortedItems);
            setUserRushmore(userRushmore);
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
    // Additional logic for completion can be added here
    if (userRushmore) {
      try {
        let completedRushmore = await rushmoreService.userRushmoreViewComplete(
          userRushmore.urId
        );
        console.log("User Rushmore completion recorded:", completedRushmore);
      } catch (error) {
        console.error("Error completing user rushmore view:", error);
      }
    }
    setUserRushmoreCompleted(true);
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

  const renderRankedItems = ({ item }: { item: VisibleUserRushmoreItem }) => {
    return (
      <View style={styles.nonDraggableItem}>
        <View style={styles.itemContainer}>
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>{item.rank}</Text>
          </View>
          <View style={styles.itemContent}>
            {item.visible ? (
              <Text style={styles.itemText}>{item.item}</Text>
            ) : null}
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
  const navigateToUserRushmoreLikeListScreen = () => {
    console.log("navigateToUserRushmoreLikeListScreen");
    if (userRushmore) {
      navigation.navigate("UserRushmoreLikeListScreen", {
        userRushmore: userRushmore,
      });
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
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loadingIndicator}
        />
      ) : (
        <View style={styles.contentContainer}>
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
          <FlatList
            data={orderedUserRushmoreItems}
            renderItem={renderRankedItems}
            keyExtractor={(item) => item.item}
            contentContainerStyle={styles.listContentContainer}
          />

          {userRushmore && (
            <View style={styles.statsColumn}>
              <UserRushmoreStatsColumn
                likeCount={userRushmore.likeCount}
                totalCompleted={userRushmore.completedCount}
                highScoreUser={undefined}
                firstToCompleteUser={userRushmore.firstCompletedUser}
                displayVersion={userRushmore.displayVersion || ""}
                handleNavigateToUserRushmoreLeaderboard={
                  navigateToUserRushmoreLeaderboard
                }
                handleNavigateToUserRushmoreLikeListScreen={
                  navigateToUserRushmoreLikeListScreen
                }
                handleNavigateToUserRushmoreVersionScreen={
                  navigateToUserRushmoreVersionScreen
                }
                handleNavigateToUserRushmoreCompletedListScreen={
                  navigateToUserRushmoreCompletedListScreen
                }
                navigateToUserProfileScreen={navigateToUserProfileScreen}
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
