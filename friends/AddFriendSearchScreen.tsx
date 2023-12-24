import React from "react";
import { SafeAreaView, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";

export const AddFriendSearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);
  return (
    <SafeAreaView>
      <View style={{ alignSelf: "center" }}>
        <Text variant="displaySmall">Add Friends</Text>
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </SafeAreaView>
  );
};
