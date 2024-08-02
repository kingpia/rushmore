import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import amplifyconfig from "../src/amplifyconfiguration.json";
const { aws_user_pools_web_client_id } = amplifyconfig;
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob"; // <- polyfill here
import { BASE_URL, COGNITO_AUTH_URL } from "../config"; // Import the constants

interface GraphQLError {
  message: string;
  locations: { line: number; column: number }[];
  path: string[];
  extensions: { classification: string };
}

interface JwtPayload {
  exp: number;
  sub: string;
  // add other fields as necessary
}

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

console.log("BASE URL:", BASE_URL);

const headers = {
  "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
  "Content-Type": "application/x-amz-json-1.1",
};

// Axios response interceptor
api.interceptors.response.use(
  (response) => {
    if (response.data.errors) {
      console.log(
        "====================There are errors in the Response===================="
      );
      response.data.errors.forEach((error: GraphQLError) => {
        console.error("GraphQL error:", error.message);
        console.error("Error locations:", error.locations);
        console.error("Error path:", error.path);
      });
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("Response error data:", error.response.data);
      console.error("Response error status:", error.response.status);
      console.error("Response error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request error data:", error.request);
      console.error("Request error status:", error.request.status);
      console.error(
        "Request error headers:",
        error.request.getAllResponseHeaders()
      );
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
    return Promise.reject(error);
  }
);

// Axios request interceptor
api.interceptors.request.use(
  async (config) => {
    let accessToken = await SecureStore.getItemAsync("accessToken");
    console.log(
      "===============================================================================================================Access Token:\n" +
        accessToken +
        "\n=========================================================================================================================="
    );
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const decoded: JwtPayload = jwtDecode<JwtPayload>(accessToken);
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
      const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);
      console.log("Saving uid in securestore");
      saveToken("uid", decodedAccessToken.sub || "");
    }

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
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (!refreshToken) {
      console.log("Refresh token is empty");
      throw new Error("Refresh token not found.");
    }

    console.log("Refresh token:" + refreshToken);
    console.log("Making call to Cognito to refresh access token...");

    const requestData = {
      AuthFlow: "REFRESH_TOKEN",
      ClientId: aws_user_pools_web_client_id,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    };

    const response = await axios.post(COGNITO_AUTH_URL, requestData, {
      headers,
    });

    console.log(
      "New Access Token:",
      response.data.AuthenticationResult.AccessToken
    );
    return response.data.AuthenticationResult.AccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

async function saveToken(key: string, value: string) {
  console.log("Saving Token key:" + key + ", token" + value);
  await SecureStore.setItemAsync(key, value);
}

export default api;
