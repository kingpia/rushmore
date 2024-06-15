import React, { useState } from "react";
import { View, StyleSheet, Animated, FlatList } from "react-native";
import { Divider } from "react-native-paper";
import { RushmoreHorizontalView } from "../components/RushmoreHorizontalView";
import { RushmoreCard } from "../components/RushmoreCard";
import { RushmoreService } from "../service/RushmoreService";
import { CreateRushmoreStackParamList } from "../nav/params/CreateRushmoreStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { CreateUserRushmoreDetailResponseDTO } from "../model/CreateUserRushmoreDetailResponseDTO";
import { Rushmore } from "../model/Rushmore";
import { AppStackParamList } from "../nav/params/AppStackParamList";
import {
  RushmoreGameTypeEnums,
  RushmoreType,
  RushmoreVisibilityEnums,
  UserRushmore,
} from "../model/UserRushmore";
import { CreateUserRushmoreRequestDTO } from "../model/CreateUserRushmoreRequestDTO";
import { UserRushmoreDTO } from "../model/UserRushmoreDTO";

type CreateRushmoreHomeScreenProps = {
  navigation: NativeStackNavigationProp<
    CreateRushmoreStackParamList & AppStackParamList
  >;
};

export const CreateRushmoreHomeScreen: React.FC<
  CreateRushmoreHomeScreenProps
> = ({ navigation }: CreateRushmoreHomeScreenProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [rushmoreList, setRushmoreList] = useState<Rushmore[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const rushmoreService =
          new RushmoreService<CreateUserRushmoreDetailResponseDTO>();
        try {
          const response = await rushmoreService.getRushmores();
          setRushmoreList(response.rushmoreList);

          const categoriesSet = new Set<string>();
          response.rushmoreList.forEach((rushmore) => {
            categoriesSet.add(rushmore.category);
          });

          const categoriesArray = Array.from(categoriesSet);
          categoriesArray.unshift("All");
          setCategories(categoriesArray);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

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

  const countByCategory = (category: string): number => {
    return rushmoreList.filter((item) =>
      category === "All" ? true : item.category === category
    ).length;
  };

  const filteredRushmoreData = rushmoreList.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const navigateToEditUserRushmoreScreen = async (rushmore: Rushmore) => {
    const rushmoreService = new RushmoreService<UserRushmore>();

    const createUserRushmoreRequest: CreateUserRushmoreRequestDTO = {
      rid: rushmore.rid,
      visibility: RushmoreVisibilityEnums.PUBLIC,
      gameType: RushmoreGameTypeEnums.OPEN,
      rushmoreType: RushmoreType.Favorite,
    };

    try {
      let useRushmoreResponse: UserRushmoreDTO =
        await rushmoreService.createUserRushmore(createUserRushmoreRequest);

      console.log(
        "Returned created user rushmore:" + JSON.stringify(useRushmoreResponse)
      );
      console.log(
        "userRushmore created. JSON:" +
          JSON.stringify(useRushmoreResponse.userRushmore)
      );

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "EditUserRushmoreScreen",
            params: {
              userRushmore: useRushmoreResponse.userRushmore,
              selectedItemUserRushmore: undefined,
            },
          },
        ],
      });
    } catch (error: any) {
      console.error("Error Creating Rushmore. DISPLAY MODAL", error);
    }
  };

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
      <Animated.FlatList
        data={filteredRushmoreData}
        keyExtractor={(item) => item.rid.toString()}
        style={{ opacity: fadeAnim }}
        renderItem={({ item, index }) => (
          <>
            <View style={styles.cardContainer}>
              <RushmoreCard
                rushmore={item}
                onPress={() => navigateToEditUserRushmoreScreen(item)}
              />
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  cardContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default CreateRushmoreHomeScreen;
