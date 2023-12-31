// YourCustomHeader.tsx

import React from "react";
import { View, Text } from "react-native";
import { YourCompletedRushmore } from "../../model/YourCompletedRushmore";

//NOT USED, BUT YOU COULD USE IT LATER TO CUSTOMIZE YOUR HEADERS TO HAVE SAY A "BACK instead of < and add other buttons if you want"
type YourCompletedRushmoreHeaderProps = {
  rushmoreItem: YourCompletedRushmore;
};

const YourCompltedRushmoreHeader: React.FC<
  YourCompletedRushmoreHeaderProps
> = ({ rushmoreItem }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text>{rushmoreItem.type}</Text>
      <Text style={{ marginHorizontal: 5 }}> </Text>
      <Text>{rushmoreItem.rushmoreTitle}</Text>
    </View>
  );
};

export default YourCompltedRushmoreHeader;
