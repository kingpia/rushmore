import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/HomeStackParamList";

type FollowingInProgressRushmoreScreenProps =
  StackContainerScreenProps<"FollowingSolvedRushmoreScreen">;

export const FollowingSolvedRushmoreScreen = ({
  route,
}: FollowingInProgressRushmoreScreenProps) => {
  console.log(
    "YourInProgressRushmoreScreen Data:" +
      JSON.stringify(route.params.rushmoreItem)
  );
  return (
    <SafeAreaView>
      <Text variant="displayLarge">Following Solve Rushmore Screen</Text>
    </SafeAreaView>
  );
};
