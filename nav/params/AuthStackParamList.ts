import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CognitoUser } from "amazon-cognito-identity-js"; // Import CognitoUser from the appropriate package

export type AuthStackParamList = {
  AuthHomeScreen: undefined;
  AuthEmailSignUpScreen: undefined;
  AuthCreateUsernameScreen: undefined;
  AuthResetPasswordEmailScreen: undefined;
  AuthLogInScreen: undefined;
  AuthResetPasswordCodeScreen: {
    email: string;
  };
};

export type StackContainerScreenProps<S extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, S>;
