import axios from "axios";
import * as SecureStore from "expo-secure-store";
import amplifyconfig from "../src/amplifyconfiguration.json";
const { aws_user_pools_web_client_id } = amplifyconfig;
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob"; // <- polyfill here
import { Auth } from "aws-amplify";

// Create Axios instance
const api = axios.create({
  baseURL: "http://192.168.0.11:8080",
  timeout: 10000,
});

const headers = {
  "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
  "Content-Type": "application/x-amz-json-1.1",
};

// Axios request interceptor
api.interceptors.request.use(
  async (config) => {
    console.log("in API Interceptor.");

    // Check if access token is expired or not present
    let accessToken = await SecureStore.getItemAsync("accessToken");
    console.log("Access Token:" + accessToken);
    //console.log("Access token:" + accessToken);
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    // Decode the token to extract the payload
    //let decoded = jwt_decode(accessToken);
    const decoded = jwtDecode(accessToken);

    const accessTokenExpiration: number = decoded.exp || 0;

    if (accessTokenExpiration * 1000 < new Date().getTime()) {
      console.log(
        "Access token expiration:" +
          accessTokenExpiration +
          " is less than new Date " +
          new Date().getTime()
      );
      accessToken = await refreshAccessToken();
      saveToken("accessToken", accessToken);
    }

    // Add access token to request headers
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to refresh access token
async function refreshAccessToken(): Promise<string> {
  console.log(
    "Refreshing access token, because the original token was expired"
  );
  try {
    // Retrieve refresh token from SecureStore
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (!refreshToken) {
      console.log("Refresh token is empty");
      // TODO Redirect to the LOGIN screen
      throw new Error("Refresh token not found.");
    }

    console.log("Making call to Cognito to refresh access token...");

    // Make a request to Cognito to refresh access token
    const requestData = {
      AuthFlow: "REFRESH_TOKEN",
      ClientId: aws_user_pools_web_client_id,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    };

    const response = await axios.post(
      "https://cognito-idp.us-east-1.amazonaws.com",
      requestData,
      {
        headers,
      }
    );

    console.log(
      "New Access Token:",
      response.data.AuthenticationResult.AccessToken
    );

    // Return the newly refreshed access token
    return response.data.AuthenticationResult.AccessToken;
  } catch (error) {
    // Handle token refresh failure
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

async function saveToken(key: string, value: string) {
  console.log("Saving Token key:" + key + ", token" + value);
  await SecureStore.setItemAsync(key, value);
}

export default api;
