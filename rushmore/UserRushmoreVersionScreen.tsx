import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  FlatList,
  View,
} from "react-native";
import { Text, Appbar, ActivityIndicator } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/AppStackParamList";
import { UserRushmore } from "../model/UserRushmore";
import { RushmoreService } from "../service/RushmoreService";
import MyCompletedRushmoreCard from "../components/MyCompletedRushmoreCard";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";

type UserRushmoreVersionScreenProps =
  StackContainerScreenProps<"UserRushmoreVersionScreen">;

const rushmoreService = new RushmoreService(); // Create an instance of RushmoreService

export const UserRushmoreVersionScreen = ({
  route,
  navigation,
}: UserRushmoreVersionScreenProps) => {
  const [versionedRushmores, setVersionedRushmores] = useState<
    UserRushmoreDTO[]
  >([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      console.log("UserRushmoreVersionScreen UseEffect Focus Running...");

      const fetchData = async () => {
        const userRushmore: UserRushmore | undefined =
          route.params.userRushmore;
        if (!userRushmore) {
          setLoading(false);
          return;
        }
        console.log("UserRushmore:" + JSON.stringify(userRushmore, null, 2));

        try {
          const versionList: UserRushmoreDTO[] =
            await rushmoreService.getUserRushmoreVersionList(userRushmore.urId);
          console.log(
            "Get user rushmore versions:" + JSON.stringify(versionList, null, 2)
          );
          setVersionedRushmores(versionList);
        } catch (error) {
          console.error("Error fetching user rushmore version list:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [route.params.userRushmore])
  );

  const navigateToUserRushmore = (item: UserRushmoreDTO) => {
    console.log(
      "Navigating to user rushmore:" +
        JSON.stringify(item.userRushmore, null, 2)
    );
    console.log("navigate to user rushmore");

    const params = {
      userRushmore: item.userRushmore,
      selectedItemUserRushmore: undefined,
    };

    // Navigate to EditUserRushmoreScreen with params
    navigation.navigate("EditUserRushmoreScreen", params);

    // Reset navigation and send the same params
    navigation.reset({
      index: 0,
      routes: [{ name: "EditUserRushmoreScreen", params }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Versions" />
      </Appbar.Header>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          animating={true}
          size="large"
        />
      ) : versionedRushmores && versionedRushmores.length === 0 ? (
        <Text style={styles.emptyMessage}>No versions for this rushmore</Text>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={versionedRushmores}
            keyExtractor={(item) => item.userRushmore.urId.toString()}
            renderItem={({ item }) => (
              <MyCompletedRushmoreCard
                userRushmoreDTO={item}
                onPress={() => navigateToUserRushmore(item)}
                styleLatest={true}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default UserRushmoreVersionScreen;
