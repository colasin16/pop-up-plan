// import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from "react";
import { checkRequestsScreen } from '../screens/use-cases/check-requests-screen';
import { CreatePlanScreen } from "../screens/use-cases/create-plan-screen";
import { UserProfileScreen } from '../screens/use-cases/UserProfileScreen';
import { AppStack } from "./app-navigator";


const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (<>

        <Tab.Navigator>

            <Tab.Screen name="Explore" component={AppStack} options={{
                tabBarLabel: "Explore",
                // TODO: add icon later
                tabBarIcon: (tabInfo) => (
                    <Ionicons
                        name="ios-search"
                        size={tabInfo.focused ? 26 : 20}
                        color={tabInfo.color}
                    />
                ),
            }} />
            <Tab.Screen name="New Plan" component={CreatePlanScreen} options={{
                tabBarLabel: "New Plan",
                // TODO: add icon later
                tabBarIcon: (tabInfo) => (
                    <Ionicons
                        name="ios-add"
                        size={tabInfo.focused ? 26 : 20}
                        color={tabInfo.color}
                    />
                ),
            }} />
            <Tab.Screen name="Requests" component={checkRequestsScreen}
                options={{
                    tabBarLabel: "Requests",
                    // TODO: add icon later
                    tabBarIcon: (tabInfo) => (
                        <Ionicons
                            name="ios-notifications-sharp"
                            size={tabInfo.focused ? 26 : 20}
                            color={tabInfo.color}
                        />
                    ),
                }} />
            <Tab.Screen name="Profile" component={UserProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    // TODO: add icon later
                    tabBarIcon: (tabInfo) => (
                        <Ionicons
                            name="ios-person"
                            size={tabInfo.focused ? 26 : 20}
                            color={tabInfo.color}
                        />
                    ),
                }} />
        </Tab.Navigator>
    </>

    );
}

export default MyTabs