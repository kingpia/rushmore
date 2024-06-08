import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, Animated, FlatList } from "react-native";
import { ActivityIndicator, SegmentedButtons, Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MyInProgressRushmoreCard } from "../components/MyInProgressRushmoreCard";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { RushmoreService } from "../service/RushmoreService";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import MyCompletedRushmoreCard from "./MyCompletedRushmoreCard";

type MyRushmoreListsComponentProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList & AppStackParamList>;
};

export const MyRushmoreListsComponent: React.FC<
  MyRushmoreListsComponentProps
> = ({ navigation }) => {
  const [value, setValue] = useState("inprogress");
  const [myInProgressRushmoreList, setMyInProgressRushmoreList] = useState<
    UserRushmoreDTO[]
  >([]);
  const [myCompletedRushmoreList, setMyCompletedRushmoreList] = useState<
    UserRushmoreDTO[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]); // Initialize with "All"

  const [isLoading, setLoading] = useState(true);

  const [fadeAnim] = useState(new Animated.Value(0));
  const rushmoreService = new RushmoreService();

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0); // Reset opacity to 0 when screen is focused
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    }, [])
  );

  const fetchData = async (selectedValue: string) => {
    console.log("Fetching data in MyRushmoreListsComponent");
    setLoading(true); // Set loading to true when fetching data

    try {
      if (selectedValue === "inprogress") {
        const myInProgressRushmoreData =
          await rushmoreService.getMyInProgressRushmoreList();
        console.log("Setting MyInProgressRushmoreList");
        setMyInProgressRushmoreList(myInProgressRushmoreData);

        const categoriesSet = new Set<string>();

        // Loop through UserRushmoreDTO and extract categories
        myInProgressRushmoreData.forEach((userRushmoreDTO) => {
          categoriesSet.add(userRushmoreDTO.userRushmore.rushmore.category);
        });

        const categoriesArray = Array.from(categoriesSet);
        categoriesArray.unshift("All");

        console.log("Categories Array:" + JSON.stringify(categoriesArray));

        setCategories(categoriesArray);
      } else if (selectedValue === "complete") {
        console.log("selected cat is complete");
        const myCompletedRushmoreData =
          await rushmoreService.getMyCompletedRushmoreList();
        console.log(
          "Back from fetching data, setting completed rushmore data:" +
            JSON.stringify(myCompletedRushmoreData)
        );
        setMyCompletedRushmoreList(myCompletedRushmoreData);

        const categoriesSet = new Set<string>();

        // Loop through UserRushmoreDTO and extract categories
        myCompletedRushmoreData.forEach((userRushmoreDTO) => {
          categoriesSet.add(userRushmoreDTO.userRushmore.rushmore.category);
        });

        const categoriesArray = Array.from(categoriesSet);
        categoriesArray.unshift("All");

        console.log("Categories Array:" + JSON.stringify(categoriesArray));

        setCategories(categoriesArray);
      }
      setLoading(false); // Set loading to false after fetching data
      countByCategory(selectedCategory);
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const countByCategory = (category: string) => {
    if (value === "inprogress") {
      return myInProgressRushmoreList.filter(
        (item) =>
          category === "All" || item.userRushmore.rushmore.category === category
      ).length;
    } else {
      return myCompletedRushmoreList.filter(
        (item) =>
          category === "All" || item.userRushmore.rushmore.category === category
      ).length;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(value);
    }, [value])
  );

  const navigateToMyCompletedRushmore = (userRushmore: UserRushmoreDTO) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore: userRushmore.userRushmore,
    });
  };

  const navigateToMyInProgressRushmore = (userRushmore: UserRushmoreDTO) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore: userRushmore.userRushmore,
    });
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const renderItemSeparator = () => <View style={styles.divider} />;

  const renderInProgressRushmoreList = () => {
    if (!myInProgressRushmoreList || myInProgressRushmoreList.length === 0) {
      return <Text style={styles.emptyMessage}>No in-progress Rushmores</Text>;
    }

    if (filteredYourInProgressRushmoreData.length === 0) {
      return (
        <Text style={styles.emptyMessage}>
          No in-progress Rushmores for {selectedCategory}
        </Text>
      );
    }

    return (
      <Animated.FlatList
        data={filteredYourInProgressRushmoreData}
        style={{ opacity: fadeAnim }}
        keyExtractor={(item) => item.userRushmore.urId.toString()}
        renderItem={({ item }) => (
          <MyInProgressRushmoreCard
            myInProgressRushmore={item}
            onPress={() => navigateToMyInProgressRushmore(item)}
          />
        )}
        ItemSeparatorComponent={renderItemSeparator}
      />
    );
  };

  const renderCompletedRushmoreList = () => {
    if (isLoading) {
      return null;
    }

    if (!myCompletedRushmoreList || myCompletedRushmoreList.length === 0) {
      return <Text style={styles.emptyMessage}>No completed Rushmores</Text>;
    }

    if (filteredYourInProgressRushmoreData.length === 0) {
      return (
        <Text style={styles.emptyMessage}>
          No completed Rushmores for {selectedCategory}
        </Text>
      );
    }

    return (
      <Animated.FlatList
        data={filteredCompletedRushmoreData}
        style={{ opacity: fadeAnim }}
        keyExtractor={(item) => item.userRushmore.urId.toString()}
        renderItem={({ item }) => (
          <MyCompletedRushmoreCard
            userRushmoreDTO={item}
            onPress={() => navigateToMyCompletedRushmore(item)}
          />
        )}
        ItemSeparatorComponent={renderItemSeparator}
      />
    );
  };

  const filteredYourInProgressRushmoreData =
    myInProgressRushmoreList?.filter(
      (item) =>
        selectedCategory === "All" ||
        item.userRushmore.rushmore.category === selectedCategory
    ) || [];

  const filteredCompletedRushmoreData =
    myCompletedRushmoreList?.filter(
      (item) =>
        selectedCategory === "All" ||
        item.userRushmore.rushmore.category === selectedCategory
    ) || [];

  return (
    <View style={styles.container}>
      <View>
        <RushmoreHorizontalView
          selectedCategory={selectedCategory}
          onPressCategory={handleCategoryPress}
          countByCategory={countByCategory}
          categories={categories}
        />
      </View>
      <View style={styles.segmentedButtonsContainer}>
        <SegmentedButtons
          style={styles.segmentedButtons}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "inprogress",
              label: "In-Progress",
            },
            {
              value: "complete",
              label: "Published",
            },
          ]}
        />
        {isLoading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            animating={true}
            size="large"
          />
        )}
        <View style={styles.listContainer}>
          {value === "inprogress"
            ? renderInProgressRushmoreList()
            : renderCompletedRushmoreList()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  container: {
    flex: 1,
  },
  loadingIndicator: {
    marginVertical: 10,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  segmentedButtonsContainer: {
    flex: 1,
  },
  segmentedButtons: {
    margin: 10,
  },
  listContainer: {
    flex: 1,
  },
});
