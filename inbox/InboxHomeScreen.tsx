import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

const sampleData = [
  {
    id: "1",
    rushmoreType: "Type 1",
    completedDt: "Wed Jun 16 14:30:00 GMT 2023",
    ownerUser: { userName: "Owner1" },
    highScoreUser: { userName: "User1" },
    highScore: 100,
    firstCompletedUser: { userName: "FirstUser1" },
    completedCount: 10,
    firstCompletedDt: "Tue Jun 15 14:30:00 GMT 2023",
    bookmarkCount: 5,
    likeCount: 20,
    version: "1.0",
    rushmore: {
      title: "Rushmore 1",
      imageUrl: "https://via.placeholder.com/150",
    },
    userRushmoreGameSession: { score: 50 },
  },
  {
    id: "2",
    rushmoreType: "Type 2",
    completedDt: "Thu Jun 17 14:30:00 GMT 2023",
    ownerUser: { userName: "Owner2" },
    highScoreUser: { userName: "User2" },
    highScore: 200,
    firstCompletedUser: { userName: "FirstUser2" },
    completedCount: 15,
    firstCompletedDt: "Wed Jun 16 14:30:00 GMT 2023",
    bookmarkCount: 8,
    likeCount: 30,
    version: "1.1",
    rushmore: {
      title: "Rushmore 2",
      imageUrl: "https://via.placeholder.com/150",
    },
    userRushmoreGameSession: { score: 75 },
  },
];

export const InboxHomeScreen = () => {
  const handlePress = (item: any) => {
    console.log(`Item clicked: ${item.title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayLarge">Inbox Home</Text>
      <Carousel
        width={width / 1}
        data={sampleData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <Avatar.Image
                      size={40}
                      source={{ uri: item.rushmore.imageUrl }}
                    />
                    <View style={styles.headerText}>
                      <Text style={styles.rushmoreType}>
                        {item.rushmoreType}
                      </Text>
                      <Text style={styles.title}>{item.rushmore.title}</Text>
                    </View>
                  </View>
                  <View style={styles.headerRight}>
                    <Text style={styles.version}>Version: {item.version}</Text>
                    <Text style={styles.date}>{item.completedDt}</Text>
                  </View>
                </View>
                <View style={styles.statsRow}>
                  <View style={styles.statsItem}>
                    <MaterialCommunityIcons
                      name="heart"
                      size={17}
                      color="#e91e63"
                    />
                    <Text style={styles.statsText}>{item.likeCount}</Text>
                  </View>
                  <View style={styles.statsItem}>
                    <MaterialCommunityIcons
                      name="bookmark"
                      size={17}
                      color="#ffc107"
                    />
                    <Text style={styles.statsText}>{item.bookmarkCount}</Text>
                  </View>
                  <View style={styles.statsItem}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={17}
                      color="#4caf50"
                    />
                    <Text style={styles.statsText}>{item.completedCount}</Text>
                  </View>
                </View>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <MaterialCommunityIcons
                      name="crown"
                      size={17}
                      color="#ff9800"
                    />
                    <Text style={styles.infoLabel}>High Score:</Text>
                    <Text style={styles.infoText}>{item.highScore}</Text>
                    <Text style={styles.infoText}>
                      @
                      {item.highScoreUser ? item.highScoreUser.userName : "N/A"}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <MaterialCommunityIcons
                      name="medal"
                      size={17}
                      color="#ff5722"
                    />
                    <Text style={styles.infoLabel}>First:</Text>
                    <Text style={styles.infoText}>
                      {item.firstCompletedDt ? item.firstCompletedDt : "N/A"}
                    </Text>
                    <Text style={styles.infoText}>
                      @
                      {item.firstCompletedUser
                        ? item.firstCompletedUser.userName
                        : "N/A"}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: "left", // or 'right'
          stackInterval: 20,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    margin: 7,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 10,
  },
  rushmoreType: {
    fontSize: 14,
    color: "#888",
  },
  version: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsText: {
    fontSize: 14,
    marginLeft: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
  },
  headerRight: {
    alignItems: "flex-end",
  },
});

export default InboxHomeScreen;
