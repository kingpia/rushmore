import React from "react";
import { SafeAreaView, FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const DATA = Array.from({ length: 50 }, (_, index) => ({
  id: index.toString(),
  title: `Item ${index + 1}`,
}));

const Item = ({ title }) => <Text style={styles.item}>{title}</Text>;

export const InboxHomeScreen = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <View style={styles.container}>
      <Text variant="displayLarge">Inbox Home</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
