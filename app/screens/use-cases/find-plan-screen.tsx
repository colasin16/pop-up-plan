import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import PlanList from "../../../src/features/find-plan/infrastructure/ui/plan-finder";
import { GradientBackground, Header, Screen, Text } from "../../components";
import { ExploreTabNavigatorParamList } from "../../navigators/explore-tab-navigator";
import { color, spacing } from "../../theme";


const FULL: ViewStyle = { flex: 1, paddingBottom: 20 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
};

const BOLD: TextStyle = { fontWeight: "bold" };

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
};

const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
};

const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
};

const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
};

export const FindPlanScreen: FC<StackScreenProps<ExploreTabNavigatorParamList, "findPlan">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack();

    return (
      <View testID="FindPlanScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerText="HC FIND PLANS"
            // leftIcon="back"
            rightIcon="bullet"
            // onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text
            style={TITLE}
            preset="header"
            text="Explore what others are planning for today!"
          />
          <Text style={TAGLINE} text="Look for a plan that fits you and join them!" />
          <PlanList navigation={navigation} />
        </Screen>
      </View>
    );
  },
);
