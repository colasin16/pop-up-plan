import React, { FC } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { Header, Text, Screen, AutoImage as Image, GradientBackground } from "../../components";
import { NavigatorParamList } from "../../navigators";
import { color, spacing } from "../../theme";
import { CreatePlan } from "../../../src/features/create-plan/infrastructure/ui/plan-creator";


const FULL: ViewStyle = { flex: 1, paddingBottom: 10 };
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

const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
  width: 180,
  height: 100,
};

const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
};

const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
};

const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
};

export const CreatePlanScreen: FC<StackScreenProps<NavigatorParamList, "demo">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack();

    return (
      <View testID="CreatePlanScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerText="HC CREATE PLANS"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text style={TITLE} preset="header" text="HC What do you feel like doing today?" />
          <Text style={TAGLINE} text="HC Create a new plan" />

          <CreatePlan onFinish={goBack} />

        </Screen>
      </View>
    );
  },
);
