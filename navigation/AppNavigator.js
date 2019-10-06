import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthLoadingScreen from "../screens/AuthLoading";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const SignInStack = createStackNavigator({
  SignIn: SignInScreen
});

const SignUpStack = createStackNavigator({
  SignUp: SignUpScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Main: MainTabNavigator,
      SignIn: SignInStack,
      SignUp: SignUpStack
    },
    { initialRouteName: "AuthLoading" }
  )
);
