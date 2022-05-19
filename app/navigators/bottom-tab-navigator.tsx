import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from "react";
import { checkRequestsScreen, CreatePlanScreen, UserProfileScreen } from "../screens";
import { ExploreTabStack } from "./explore-tab-navigator";



export type BottomTabNavigatorParamList = {
    explore: undefined;
    createPlan: undefined;
    checkRequests: undefined;
    profile: undefined;
    loginUser: undefined;
    // 🔥 Your screens go here
};

const Tab = createMaterialBottomTabNavigator<BottomTabNavigatorParamList>();

function ButtomTabs() {
    return (<>

        <Tab.Navigator>

            <Tab.Screen name="explore" component={ExploreTabStack} options={{
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
            <Tab.Screen name="createPlan" component={CreatePlanScreen} options={{
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
            <Tab.Screen name="checkRequests" component={checkRequestsScreen}
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
            <Tab.Screen name="profile" component={UserProfileScreen}
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

export default ButtomTabs