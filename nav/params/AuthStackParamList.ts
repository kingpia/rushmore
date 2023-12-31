import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  AuthHomeScreen: undefined;
  AuthEmailSignUpScreen: undefined;
  AuthCreateUsernameScreen: undefined;
  AuthResetPasswordEmailScreen: undefined;
  AuthLogInScreen: undefined;
};

export type StackContainerScreenProps<S extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, S>;
