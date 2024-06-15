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
  const [dataLoaded, setDataLoaded] = useState(false); // Track data loading completion
  const [isLoading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const rushmoreService = new RushmoreService();

  useFocusEffect(
    useCallback(() => {
      console.log("Use Animation use Effect");
      fetchData(value);
    }, [value])
  );

  const fetchData = async (selectedValue: string) => {
    console.log(
      "Fetching data in MyRushmoreListsComponent with value:" + selectedValue
    );
    setLoading(true); // Set loading to true when fetching data

    // Clear previous data
    setMyInProgressRushmoreList([]);
    setMyCompletedRushmoreList([]);

    try {
      if (selectedValue === "inprogress") {
        console.log("Value is in Progress");
        const myInProgressRushmoreData =
          await rushmoreService.getMyInProgressRushmoreList();
        setMyInProgressRushmoreList(myInProgressRushmoreData);
        updateCategories(myInProgressRushmoreData);
      } else if (selectedValue === "complete") {
        console.log("Value is Complete");
        const myCompletedRushmoreData =
          await rushmoreService.getMyCompletedRushmoreList();
        setMyCompletedRushmoreList(myCompletedRushmoreData);
        updateCategories(myCompletedRushmoreData);
      }
      setLoading(false); // Set loading to false after fetching data
      setDataLoaded(true); // Set dataLoaded to true after data is fetched

      countByCategory(selectedCategory);
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const updateCategories = (data: UserRushmoreDTO[]) => {
    const categoriesSet = new Set<string>();
    data.forEach((userRushmoreDTO) => {
      categoriesSet.add(userRushmoreDTO.userRushmore.rushmore.category);
    });
    const categoriesArray = Array.from(categoriesSet);
    categoriesArray.unshift("All");
    setCategories(categoriesArray);
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

  const navigateToMyCompletedRushmore = (userRushmore: UserRushmoreDTO) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore: userRushmore.userRushmore,
      selectedItemUserRushmore: undefined,
    });
  };

  const navigateToMyInProgressRushmore = (userRushmore: UserRushmoreDTO) => {
    navigation.navigate("EditUserRushmoreScreen", {
      userRushmore: userRushmore.userRushmore,
      selectedItemUserRushmore: undefined,
    });
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

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
      <Animated.View>
        <FlatList
          data={filteredYourInProgressRushmoreData}
          keyExtractor={(item) => item.userRushmore.urId.toString()}
          renderItem={({ item }) => (
            <MyInProgressRushmoreCard
              myInProgressRushmore={item}
              onPress={() => navigateToMyInProgressRushmore(item)}
            />
          )}
        />
      </Animated.View>
    );
  };

  const renderCompletedRushmoreList = () => {
    if (isLoading) {
      return null;
    }

    if (!myCompletedRushmoreList || myCompletedRushmoreList.length === 0) {
      return <Text style={styles.emptyMessage}>No completed Rushmores</Text>;
    }

    if (filteredCompletedRushmoreData.length === 0) {
      return (
        <Text style={styles.emptyMessage}>
          No completed Rushmores for {selectedCategory}
        </Text>
      );
    }

    return (
      <Animated.View>
        <FlatList
          data={filteredCompletedRushmoreData}
          keyExtractor={(item) => item.userRushmore.urId.toString()}
          renderItem={({ item }) => (
            <MyCompletedRushmoreCard
              userRushmoreDTO={item}
              onPress={() => navigateToMyCompletedRushmore(item)}
            />
          )}
        />
      </Animated.View>
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
    margin: 10,
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
    borderRadius: 10,
  },
  listContainer: {
    flex: 1,
  },
});
