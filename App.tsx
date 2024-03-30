import React from "react";
import { Providers } from "./providers/Providers";
import { AppStackContainer } from "./nav/containers/AppStackContainer";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  return (
    <Providers>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppStackContainer />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Providers>
  );
}
