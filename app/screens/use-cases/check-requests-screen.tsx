import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import AcceptOrRejectJoinPlanRequest from "../../../src/features/request-checker/infrastructure/ui/request-checker";
import { GradientBackground, Header, Screen, Text } from "../../components";
import { NavigatorParamList } from "../../navigators";
import { color, spacing } from "../../theme";


const FULL: ViewStyle = { flex: 1 };
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

export const checkRequestsScreen: FC<StackScreenProps<NavigatorParamList, "checkRequests">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack();

    return (
      <View testID="checkRequestsScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerText="HC PENDING PLANS THAT YOU NEED TO CHECK"
            leftIcon="back"
            rightIcon="bullet"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text
            style={TITLE}
            preset="header"
            text="HC See who wants to join your plan(s)!"
          />
          <Text style={TAGLINE} text="HC Look carefully! When you accept someone you cannot redo this operation." />
          <AcceptOrRejectJoinPlanRequest navigation={navigation} />
        </Screen>
      </View>
    );
  },
);
