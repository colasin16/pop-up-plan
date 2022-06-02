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
import { CreateUserScreen } from "../screens/use-cases/create-user-screen";
import { loginUserScreen } from "../screens/use-cases/login-user-screen";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import ButtomTabs from "./bottom-tab-navigator";

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

export type AppNavigatorParamList = {
  tab: undefined;
  loginUser: undefined;
  createUser: undefined;
  // 🔥 Your screens go here
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const mainStack = createNativeStackNavigator<AppNavigatorParamList>();

export const AppStack = () => {
  return (
    <mainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="loginUser"
    >
      <mainStack.Screen name="loginUser" component={loginUserScreen} />
      <mainStack.Screen name="createUser" component={CreateUserScreen} />
      <mainStack.Screen name="tab" component={ButtomTabs} />

    </mainStack.Navigator>
  )
}


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
        <AppStack />
      </NavigationContainer>
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
const exitRoutes = ["loginUser"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
