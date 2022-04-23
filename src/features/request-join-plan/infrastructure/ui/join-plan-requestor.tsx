import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { Button, Text } from "../../../../../app/components";
import { useStores } from "../../../../../app/models";
import { color, spacing } from "../../../../../app/theme";
import { Plan } from "../../../../core/domain/plan";
import { Id } from "../../../../core/domain/types/id";
import { containerDI } from "../../../../core/infrastructure/dependency-injection/container";
import { PlanCreator } from "../../../create-plan/application/plan-creator";
import { JoinPlanRequester } from "../../application/join-plan-requester";

const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
};
const BOLD: TextStyle = { fontWeight: "bold" };

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

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
};

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

interface Props {
  onFinish(): void;
  plan: Plan;
}

export const JoinPlanRequest: FC<Props> = observer(({ onFinish, plan }: Props) => {
  // const { searchPlansStore } = useStores();
  const { userStore } = useStores();
  const joinPlanRequester = containerDI.resolve(JoinPlanRequester);

  const submit = async (): Promise<void> => {
    console.log("submit");

    try {
      // TODO: if PlanCreatorRepository returns plan obj instead of planId
      // The three following lines will be converted to this:
      // const { plan } = await planCreator.create(user, planData);
      await joinPlanRequester.join(plan.id, userStore.id);

      onFinish();
    } catch (error) {
      console.log("🚀 ~ file: plan-creator.tsx ~ line 77 ~ submit ~ error", error);
    }
  };

  return (
    <View>
      <Text style={TAGLINE} text={`Time is: ${plan.time}`} />
      <Text style={TAGLINE} text={`Plan ID is: ${plan.id}`} />
      <Text style={TAGLINE} text={`Category is: ${plan.category}`} />
      <Text style={TAGLINE} text={`Location is: ${plan.location}`} />

      <View>
        <Button style={DEMO} textStyle={DEMO_TEXT} text="HC Join Request" onPress={submit} />
        {/* <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} /> */}
      </View>
    </View>
  );
});
