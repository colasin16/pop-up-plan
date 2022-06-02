import { Text, TextStyle, View } from "react-native";
import { color } from "../../../theme";
import { CurrentTabContext } from "./current-tab-context";
import { TABS } from "./enums";
import React from "react";
const PLAN_TAB_TITLE: TextStyle = {
  width: 150,
  textAlign: "center",
  fontSize: 17,
  color: color.text,
};
const SELECTED_PLAN_TAB_TITLE: TextStyle = { color: color.selectedItemColor };

interface TaskTabProps {
  tabName: TABS;
}
/**
 * Internal Component to render a tab item
 * @param tabName is name of a tab which is going to be rendered
 * @returns jsx element
 */
export function TaskTab({ tabName }: TaskTabProps): JSX.Element {
  const getTabStyle = (tabName: TABS, currentTab: TABS) => {
    return currentTab === tabName
      ? { ...PLAN_TAB_TITLE, ...SELECTED_PLAN_TAB_TITLE }
      : PLAN_TAB_TITLE;
  };
  return (
    <CurrentTabContext.Consumer>
      {({ currentTab, setCurrentTab }) => (
        <View
          style={{ flex: 1 }}
          onTouchStart={() => {
            setCurrentTab(tabName);
          }}>
          <Text style={getTabStyle(tabName, currentTab)}>{tabName}</Text>
        </View>
      )}
    </CurrentTabContext.Consumer>
  );
}
