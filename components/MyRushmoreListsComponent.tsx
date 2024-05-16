import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { FlatList, View, StyleSheet, Animated } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MyInProgressRushmoreCard } from "../components/MyInProgressRushmoreCard";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { RushmoreService } from "../service/RushmoreService";
import { HomeStackParamList } from "../nav/params/HomeStackParamList";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";
import MyCompletedRushmoreCard from "./MyCompletedRushmoreCard";
import { SafeAreaView } from "react-native-safe-area-context";

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
        console.log("Settingg MyInProgressRushmoreList");
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

        console.log("CategoriesL" + JSON.stringify(categories));
        console.log(
          "MyInProgressRushmoreData:" + JSON.stringify(myInProgressRushmoreData)
        );
      } else if (selectedValue === "complete") {
        console.log("selected cat is complete");
        const myCompletedRushmoreData =
          await rushmoreService.getMyCompletedRushmoreList();
        console.log(
          "Back from fetching data, setting completed rushmore data:" +
            JSON.stringify(myCompletedRushmoreData)
        );
        setMyCompletedRushmoreList(myCompletedRushmoreData);
        console.log(
          "Done setting completed rushmore list with size:" +
            myCompletedRushmoreData.length
        );

        const categoriesSet = new Set<string>();

        // Loop through UserRushmoreDTO and extract categories
        myCompletedRushmoreData.forEach((userRushmoreDTO) => {
          console.log(
            "Got a user rushmore item:" +
              JSON.stringify(userRushmoreDTO.userRushmore.rushmore.category)
          );
          categoriesSet.add(userRushmoreDTO.userRushmore.rushmore.category);
        });
        console.log(
          "Done doing for each on the categories for completed rushmores  "
        );

        const categoriesArray = Array.from(categoriesSet);
        categoriesArray.unshift("All");

        console.log("Categories Array:" + JSON.stringify(categoriesArray));

        setCategories(categoriesArray);

        console.log("CategoriesL" + JSON.stringify(categories));

        console.log(
          "setMyCompletedRushmoreList:" +
            JSON.stringify(myCompletedRushmoreData)
        );
      }
      setLoading(false); // Set loading to false after fetching data
      // Calculate category counts after setting the state
      // Update category counts
      countByCategory(selectedCategory);
    } catch (error) {
      console.error("Error fetching Rushmore items:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const countByCategory = (category: string) => {
    console.log("CountByCategory");
    if (value === "inprogress") {
      return myInProgressRushmoreList.filter(
        (item) =>
          category === "All" || item.userRushmore.rushmore.category === category
      ).length;
    } else {
      console.log("returning myCompletedRushmoreList.filter");
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
      />
    );
  };

  const renderCompletedRushmoreList = () => {
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
      <View>
        <SegmentedButtons
          style={{ margin: 10 }}
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
        <View style={{ backgroundColor: "yellow" }}>
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
    backgroundColor: "blue",
  },
});
