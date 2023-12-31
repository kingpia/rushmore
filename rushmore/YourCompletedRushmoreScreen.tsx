import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/HomeStackParamList";

type YourCompletedRushmoreScreenProps =
  StackContainerScreenProps<"YourCompletedRushmoreScreen">;

export const YourCompletedRushmoreScreen = ({
  route,
}: YourCompletedRushmoreScreenProps) => {
  const rushmoreItem = route.params?.rushmoreItem;
  console.log("RushrmoItem:" + JSON.stringify(rushmoreItem));
  return (
    <SafeAreaView>
      <Text variant="displayLarge">Your Completed Rushmore Screen</Text>
    </SafeAreaView>
  );
};
