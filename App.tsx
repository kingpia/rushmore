import React, { useCallback, useEffect, useState } from "react";
import { Providers } from "./providers/Providers";
import { AppStackContainer } from "./nav/containers/AppStackContainer";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
// App.js

import { Amplify, Auth } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import { AppStackParamList } from "./nav/params/AppStackParamList";
Amplify.configure(amplifyconfig);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] =
    useState<keyof AppStackParamList>("AuthStackContainer"); // Default initial route of type keyof AppStackParamList

  useEffect(() => {
    console.log("inside useEffect");
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        console.log("Doing some work in prepare method");
        deleteItemFromSecureStore("accessToken"); // Delete item with key 'accessToken'
        deleteItemFromSecureStore("refreshToken"); // Delete item with key 'accessToken'

        const accessToken = await SecureStore.getItemAsync("accessToken");
        if (!accessToken) {
          // Handle case when access token is not found, leave the default initial route of going to auth stack
          console.log(
            "no access token, sendto login. Leaving the default initialRoute to AuthStackContainer"
          );
        } else {
          console.log("We have an access Token, lets check if it's expired");
          //If expired get the refresh token
          //If there is no refresh token, send to AuthStackContainer, leave things as default
          //If there is a refresh token, check if expired
          //If expired leave default and goto login
          //If not expired, refresh everything and send them to the RushmoreTabContainer
          setInitialRoute("RushmoreTabContainer"); // Change initial route if user is logged in
        }
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 5000));

        console.log("Timout finished up");
      } catch (e) {
        console.warn(e);
      } finally {
        console.log("Timeout done, app is ready");
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Function to delete item from SecureStore
  const deleteItemFromSecureStore = async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log(`Item with key '${key}' deleted from SecureStore`);
    } catch (error) {
      console.error(
        `Error deleting item with key '${key}' from SecureStore:`,
        error
      );
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Providers>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppStackContainer initialScreen={initialRoute} />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Providers>
  );
}
