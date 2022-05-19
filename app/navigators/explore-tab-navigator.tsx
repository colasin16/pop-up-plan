import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  FindPlanScreen,
  JoinPlanRequestScreen
} from "../screens";


export type ExploreTabNavigatorParamList = {
  findPlan: undefined;
  joinPlanRequest: undefined;
  // 🔥 Your screens go here
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<ExploreTabNavigatorParamList>();

export const ExploreTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="findPlan"
    >
      <Stack.Screen name="findPlan" component={FindPlanScreen} />
      <Stack.Screen name="joinPlanRequest" component={JoinPlanRequestScreen} />
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  );
};