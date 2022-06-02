import React from "react";
import { TABS } from "./enums";

export const CurrentTabContext = React.createContext({
  currentTab: TABS.OWNED_PLANS,
  setCurrentTab: (currentTab: TABS) => {}, // TODO: Check type annotation with Jordi
});
