import React from "react";
import { Providers } from "./providers/Providers";
import { AppStackContainer } from "./nav/containers/AppStackContainer";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  return (
    <Providers>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppStackContainer />
      </GestureHandlerRootView>
    </Providers>
  );
}
