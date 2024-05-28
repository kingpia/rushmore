import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import amplifyconfig from "../src/amplifyconfiguration.json";
const { aws_user_pools_web_client_id } = amplifyconfig;
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob"; // <- polyfill here

export class CognitoService {
  cognitoURL = "https://cognito-idp.us-east-1.amazonaws.com";

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
    console.log(
      "chaning password. Current:" + currentPassword + ", new:" + newPassword
    );
    // Retrieve access token from SecureStore
    let accessToken = await SecureStore.getItemAsync("accessToken");

    // Check if access token is valid or needs to be refreshed
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    // Prepare request data
    const requestData = {
      AccessToken: accessToken,
      PreviousPassword: currentPassword,
      ProposedPassword: newPassword,
    };
    const changePasswordHeaders = {
      "X-Amz-Target": "AWSCognitoIdentityProviderService.ChangePassword",
      "Content-Type": "application/x-amz-json-1.1",
    };

    // Make the request to change the password
    const response = await axios.post(this.cognitoURL, requestData, {
      headers: changePasswordHeaders,
    });
    console.log("password change response:" + JSON.stringify(response));
  }

  async changeEmailSendCode(newEmail: string): Promise<any> {
    console.log("changeEmailSendCode");

    // Retrieve access token from SecureStore
    let accessToken = await SecureStore.getItemAsync("accessToken");

    // Check if access token is valid or needs to be refreshed
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    // Prepare request data
    const requestData = {
      AccessToken: accessToken,
      UserAttributes: [
        {
          Name: "email",
          Value: newEmail,
        },
      ],
    };

    // Define the headers for this API call
    const headers = {
      "X-Amz-Target": "AWSCognitoIdentityProviderService.UpdateUserAttributes",
      "Content-Type": "application/x-amz-json-1.1",
    };

    try {
      // Make the request to update the email
      const response = await axios.post(this.cognitoURL, requestData, {
        headers,
      });
      console.log(
        "change email send code response:" + JSON.stringify(response)
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        console.log("ERROR in Axios:" + JSON.stringify(error.response.data));
        const errorMessage =
          error.response.data.message ||
          error.response.data.errorMessage ||
          "An error occurred";

        console.log(
          "errorMessage:" + JSON.stringify(error.response.data.message)
        );
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async changeEmailVerifyCode(verificationCode: string): Promise<any> {
    console.log("changeEmailVerifyCode");

    let accessToken = await SecureStore.getItemAsync("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const requestData = {
      AccessToken: accessToken,
      AttributeName: "email",
      Code: verificationCode,
    };

    const headers = {
      "X-Amz-Target": "AWSCognitoIdentityProviderService.VerifyUserAttribute",
      "Content-Type": "application/x-amz-json-1.1",
    };

    try {
      const response = await axios.post(this.cognitoURL, requestData, {
        headers,
      });

      /* This is a hack, but we fetch userInfo from cognito right after returning from this method
       * there are instances where cognito isn't updated yet when we make the call.
       */
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(
        "change email verify code response:" + JSON.stringify(response)
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        console.log("ERROR in Axios:" + JSON.stringify(error.response.data));
        const errorMessage =
          error.response.data.message ||
          error.response.data.errorMessage ||
          "An error occurred";

        console.log(
          "errorMessage:" + JSON.stringify(error.response.data.message)
        );
        throw new Error(errorMessage);
      }
      throw error;
    }
  }
}
