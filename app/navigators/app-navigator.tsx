/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import {
  checkRequestsScreen,
  CreatePlanScreen,
  CreateUserScreen,
  FindPlanScreen,
  JoinPlanRequestScreen,
  UserProfileScreen
} from "../screens";
import { MainAppStack } from "./main-navigator";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  createUser: undefined;
  welcome: undefined;
  createPlan: undefined;
  joinPlanRequest: undefined;
  checkRequests: undefined;
  findPlan: undefined;
  userProfile: undefined;
  loginUser: undefined;
  demo: undefined;
  demoList: undefined;
  // 🔥 Your screens go here
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="findPlan"
    >
      {/* <Stack.Screen name="welcome" component={WelcomeScreen} /> */}
      {/* <Stack.Screen name="loginUser" component={loginUserScreen} /> */}
      <Stack.Screen name="findPlan" component={FindPlanScreen} />
      <Stack.Screen name="createPlan" component={CreatePlanScreen} />
      <Stack.Screen name="createUser" component={CreateUserScreen} />
      <Stack.Screen name="checkRequests" component={checkRequestsScreen} />
      <Stack.Screen name="joinPlanRequest" component={JoinPlanRequestScreen} />
      <Stack.Screen name="userProfile" component={UserProfileScreen} />
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  );
};

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();
  useBackButtonHandler(canExit);
  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        {...props}>
        <MainAppStack />
        {/* <MyTabs /> */}

        {/* <AppStack /> */}
      </NavigationContainer>
      {/* <NavigationContainer>
        <MyTabs />
      </NavigationContainer> */}
    </>

  );
};

AppNavigator.displayName = "AppNavigator";

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
