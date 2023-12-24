import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Button, SegmentedButtons } from "react-native-paper";
import { RushmoreCard } from "../components/RushmoreCard";
import { RushmoreService } from "../service/RushmoreService";
import { ApiFetchEnums } from "../model/ApiFetchEnums";

export const YourRushmoreHomeScreen = () => {
  const [value, setValue] = React.useState("");
  const [rushmoreItems, setRushmoreItems] = useState<RushmoreCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Create an instance of RushmoreService with RushmoreCard type
      const rushmoreService = new RushmoreService<RushmoreCard>();

      try {
        // Fetch Rushmore items
        const youRushmoreCards = await rushmoreService.getRushmoreItems(
          "pia_id",
          ApiFetchEnums.RUSHMORE_LIST
        );

        // Set the fetched Rushmore items to the state
        setRushmoreItems(youRushmoreCards);
      } catch (error) {
        console.error("Error fetching Rushmore items:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []); // Empty dependency array to run the effect only once on mount

  //Call to get your list here via async when page loads from a source.

  return (
    <SafeAreaView>
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
            label: "Completed",
          },
        ]}
      />
      <FlatList
        data={rushmoreItems}
        keyExtractor={(item) => item.rushmore.toString()}
        renderItem={({ item }) => (
          <RushmoreCard
            // Render RushmoreCard component with item data
            id={item.id}
            rushmore={item.rushmore}
            timesCompleted={item.timesCompleted}
            favorite={item.favorite}
            best={item.best}
          />
        )}
      />
    </SafeAreaView>
  );
};
