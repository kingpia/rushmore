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
import { UserRushmoreInitialCreateDTO } from "../model/UserRushmoreInitialCreateDTO";

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
  const [userRushmoreList, setUserRushmoreList] = useState<UserRushmore[]>([]);
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

          console.log(
            "USER Rushmore List:" + JSON.stringify(response.userRushmoreList)
          );
          console.log("Rushmore List:" + JSON.stringify(response.rushmoreList));

          const { rushmoreList, userRushmoreList } = response;
          setRushmoreList(rushmoreList);
          setUserRushmoreList(userRushmoreList);

          const categoriesSet = new Set<string>();
          rushmoreList.forEach((rushmore) => {
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

  const filteredRushmoreData = rushmoreList
    .map((rushmore) => {
      const userRushmores = userRushmoreList.filter(
        (userRushmore) => userRushmore.rushmore.rid === rushmore.rid
      );

      const hasFavorite = userRushmores.some(
        (userRushmore) => userRushmore.rushmoreType === RushmoreType.Favorite
      );
      const hasBest = userRushmores.some(
        (userRushmore) => userRushmore.rushmoreType === RushmoreType.Best
      );

      return {
        ...rushmore,
        isDisabled: hasFavorite && hasBest,
      };
    })
    .filter(
      (item) => selectedCategory === "All" || item.category === selectedCategory
    );

  const navigateToEditUserRushmoreScreen = async (rushmore: Rushmore) => {
    const rushmoreService = new RushmoreService<UserRushmore>();

    const createUserRushmoreRequest: CreateUserRushmoreRequestDTO = {
      rid: rushmore.rid,
      visibility: RushmoreVisibilityEnums.PUBLIC,
      gameType: RushmoreGameTypeEnums.OPEN,
    };

    try {
      let userRushmoreInitialCreate: UserRushmoreInitialCreateDTO =
        await rushmoreService.createUserRushmore(createUserRushmoreRequest);

      console.log(
        "Returned created user rushmore:" +
          JSON.stringify(userRushmoreInitialCreate)
      );

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "UserRushmoreTypeScreen",
            params: {
              userRushmoreInitialCreate: userRushmoreInitialCreate,
            },
          },
        ],
      });
    } catch (error: any) {
      //TODO Display if already completed
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
          <View>
            <RushmoreCard
              rushmore={item}
              onPress={() => navigateToEditUserRushmoreScreen(item)}
              disabled={item.isDisabled}
              style={item.isDisabled ? styles.disabledCard : undefined}
            />
          </View>
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
  disabledCard: {
    opacity: 0.5,
    backgroundColor: "#e0e0e0", // Light gray background to indicate disabled state
  },
});

export default CreateRushmoreHomeScreen;
