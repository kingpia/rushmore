import React, { useCallback, useEffect, useState } from "react";
import { Providers } from "./providers/Providers";
import { AppStackContainer } from "./nav/containers/AppStackContainer";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob"; // <- polyfill here
import axios, { AxiosError } from "axios";
const { aws_user_pools_web_client_id } = amplifyconfig;
import { cognitoAuthUrl } from "./config"; // Import the constant

// App.js

import { Amplify, Auth } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import { AppStackParamList } from "./nav/params/AppStackParamList";
import { UserFocusProvider } from "./service/UserFocusContext";
Amplify.configure(amplifyconfig);

const headers = {
  "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
  "Content-Type": "application/x-amz-json-1.1",
};

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
        //deleteItemFromSecureStore("accessToken"); // Delete item with key 'accessToken'
        //deleteItemFromSecureStore("refreshToken"); // Delete item with key 'accessToken'
        //deleteItemFromSecureStore("uid"); // Delete item with key 'accessToken'

        const accessToken = await SecureStore.getItemAsync("accessToken");
        if (!accessToken) {
          // Handle case when access token is not found, leave the default initial route of going to auth stack
          console.log(
            "no access token, sendto login. Leaving the default initialRoute to AuthStackContainer"
          );
        } else {
          console.log("We have an access Token, lets check if it's expired");

          const decoded = jwtDecode(accessToken);
          const accessTokenExpiration: number = decoded.exp || 0;
          if (accessTokenExpiration * 1000 > new Date().getTime()) {
            console.log(
              "Access token expiration:" +
                accessTokenExpiration +
                " is Greater than new Date " +
                new Date().getTime()
            );
            console.log("Access token is NOT Expired");
            setInitialRoute("RushmoreTabContainer"); // Change initial route if user is logged in
          } else {
            console.log("The ACCESS TOKEN IS EXPIRTED. Do some work here.");
            let newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
              console.log("RefreshAccessToken Returned a new token");
              setInitialRoute("RushmoreTabContainer"); // Change initial route if user is logged in
            } else {
              console.log("Refresh Access Token did NOT return a new token");

              //Change this to goto the LogInScreen later.
              setInitialRoute("RushmoreTabContainer"); // Change initial route if user is logged in
            }
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
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

  // Function to refresh access token
  async function refreshAccessToken(): Promise<string> {
    console.log("APP TSX: RefreshAccessToken()");
    try {
      // Retrieve refresh token from SecureStore
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (!refreshToken) {
        console.log("Refresh token is empty.");
        //This will NOT return a new token, a null response will return to login screen.
        throw new Error("Refresh token not found.");
      } else {
        console.log("Refresh token:" + refreshToken);

        console.log("Making call to Cognito to refresh access token...");

        // Make a request to Cognito to refresh access token
        const requestData = {
          AuthFlow: "REFRESH_TOKEN",
          ClientId: aws_user_pools_web_client_id,
          AuthParameters: {
            REFRESH_TOKEN: refreshToken,
          },
        };

        const response = await axios.post(cognitoAuthUrl, requestData, {
          headers,
        });

        console.log(
          "New Access Token:",
          response.data.AuthenticationResult.AccessToken
        );
        return response.data.AuthenticationResult.AccessToken;
      }

      // Return the newly refreshed access token
    } catch (error) {
      //TODO If this happens, do we log them out?  I think we should, but why is this happening?
      // Handle token refresh failure
      console.error("Error refreshing access token:", error);
      throw error;
    }
  }

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
          <UserFocusProvider>
            <AppStackContainer initialScreen={initialRoute} />
          </UserFocusProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </Providers>
  );
}
