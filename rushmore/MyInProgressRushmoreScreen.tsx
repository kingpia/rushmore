import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/HomeStackParamList";

type MyInProgressRushmoreScreenProps =
  StackContainerScreenProps<"MyInProgressRushmoreScreen">;

export const MyInProgressRushmoreScreen = ({
  route,
}: MyInProgressRushmoreScreenProps) => {
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
