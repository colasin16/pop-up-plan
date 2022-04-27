import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { loginUserScreen } from "../screens/use-cases/login-user";
import MyTabs from "./tab-navigator";
import { CreateUserScreen } from "../screens/use-cases/create-user";

export type MainNavigatorParamList = {
    tab: undefined;
    loginUser: undefined;
    registerUser: undefined;
    // 🔥 Your screens go here
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const mainStack = createNativeStackNavigator<MainNavigatorParamList>();

export const MainAppStack = () => {
    return (
        <mainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="loginUser"
        >
            <mainStack.Screen name="loginUser" component={loginUserScreen} />
            <mainStack.Screen name="registerUser" component={CreateUserScreen} />
            <mainStack.Screen name="tab" component={MyTabs} />

        </mainStack.Navigator>
    )
}