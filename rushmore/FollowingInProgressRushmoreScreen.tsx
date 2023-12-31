import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { StackContainerScreenProps } from "../nav/params/HomeStackParamList";

type FollowingInProgressRushmoreScreenProps =
  StackContainerScreenProps<"FollowingInProgressRushmoreScreen">;

export const FollowingInProgressRushmoreScreen = ({
  route,
}: FollowingInProgressRushmoreScreenProps) => {
  console.log(
    "YourInProgressRushmoreScreen Data:" +
      JSON.stringify(route.params.rushmoreItem)
  );
  return (
    <SafeAreaView>
      <Text variant="displayLarge">FollowingInProgressRushmoreScreen</Text>
    </SafeAreaView>
  );
};
