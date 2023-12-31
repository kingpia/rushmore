import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/HomeStackParamList";

type YourInProgressRushmoreScreenProps =
  StackContainerScreenProps<"YourInProgressRushmoreScreen">;

export const YourInProgressRushmoreScreen = ({
  route,
}: YourInProgressRushmoreScreenProps) => {
  console.log(
    "YourInProgressRushmoreScreen Data:" +
      JSON.stringify(route.params.rushmoreItem)
  );
  return (
    <SafeAreaView>
      <Text variant="displayLarge">YourInProgressRushmoreScreen</Text>
    </SafeAreaView>
  );
};
