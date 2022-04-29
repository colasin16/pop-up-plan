import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { JoinPlanRequest } from "../../../src/features/request-join-plan/infrastructure/ui/join-plan-requestor";
import { GradientBackground, Header, Screen, Text } from "../../components";
import { useStores } from "../../models";
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

const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
};

const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
};

const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
};

export const JoinPlanRequestScreen: FC<
  StackScreenProps<NavigatorParamList, "joinPlanRequest">
> = observer(({ route, navigation }) => {
  const goBack = () => navigation.goBack();
  const { searchPlansStore } = useStores();

  // @ts-ignore
  const [planId, setPlanId] = useState(undefined as Id);

  React.useEffect(() => {
    // ref: https://reactnavigation.org/docs/params/
    // @ts-ignore
    if (route && route.params && route.params?.planId) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      // @ts-ignore
      const planId = route.params?.planId;
      // const planToJoinRequest = searchPlansStore.getPlan(planId);
      // @ts-ignore
      setPlanId(planId);
    }
    // @ts-ignore
  }, [route && route.params && route.params?.planId]);

  return (
    <View testID="JoinPlanRequestScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerText="HC JOIN PLANS REQUEST"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Text style={TITLE} preset="header" text="HC Would you like enjoying this plan?" />
        <Text style={TAGLINE} text="Join the plan" />

        {/* <JoinPlanRequest onFinish={goBack} plan={plan} /> */}
        <JoinPlanRequest onFinish={goBack} planId={planId} />


        {/* <CreatePlan onFinish={goBack} /> */}

        {/* <Image source={logoIgnite} style={IGNITE} />
        <View style={LOVE_WRAPPER}>
          <Text style={LOVE} text="Made with" />
          <Image source={heart} style={HEART} />
          <Text style={LOVE} text="by Infinite Red" />
        </View> */}
      </Screen>
    </View>
  );
});
