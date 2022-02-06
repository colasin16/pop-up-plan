import React, { FC, useState } from "react";
import { ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import {
  Button,
  Header,
  Text,
  Screen,
  AutoImage as Image,
  GradientBackground,
  TextField,
} from "../../components";
import { NavigatorParamList } from "../../navigators";
import { color, spacing } from "../../theme";
import { Timestamp } from "../../../src/core/types/timestamp";
import { CustomLocation } from "../../../src/core/types/location";
import { PlanCreator } from "../../../src/features/create-plan/application/plan-creator";
import { PlanCreatorHttpRepository } from "../../../src/features/create-plan/infrastructure/plan-creator-http-repository";
import { PlanCreationData } from "../../../src/features/create-plan/domain/plan-creation-data";
import { Category, Privacy } from "../../../src/core/shared/domain/plan";
import { savePlan } from "../../../src/features/create-plan/infrastructure/state/plan-creator-state";

export const logoIgnite = require("./logo-ignite.png");
export const heart = require("./heart.png");

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
};
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

const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
};

const user = { id: "1644013242380", name: "Jordi" };

export const CreatePlanScreen: FC<StackScreenProps<NavigatorParamList, "demo">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState<CustomLocation>({ address: "" });
    const [time, setTime] = useState<Timestamp>(0);
    const category = Category.RUN;
    const privacy = Privacy.PUBLIC;

    const submit = async (): Promise<void> => {
      const planCreator = new PlanCreator(new PlanCreatorHttpRepository());

      if (!!title && !!location && !!time) {
        const planData: PlanCreationData = {
          owner: user,
          title,
          location,
          time,
          category,
          privacy,
        };

        const plan = await planCreator.create(user, planData);
        savePlan(plan);
      }
    };

    return (
      <View testID="DemoScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerText="HC CREATE PLANS"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text style={TITLE} preset="header" text="HC What do you fill like doing today?" />
          <Text style={TAGLINE} text="HC Create a new plan" />
          <TextField
            inputStyle={{ borderRadius: 4, padding: 8, marginTop: 8 }}
            onChangeText={value => setTitle(value)}
            value={title}
            label="Title"
            placeholder="Plan title"
          />
          <TextField
            inputStyle={{ borderRadius: 4, padding: 8, marginTop: 8 }}
            onChangeText={value => setLocation({ address: value })}
            value={location.address}
            label="Location"
            placeholder="Plan location"
          />
          <TextField
            inputStyle={{ borderRadius: 4, padding: 8, marginTop: 8 }}
            onChangeText={value => setTime(new Date().valueOf())}
            value={time ? `${time}` : ""}
            label="Time"
            placeholder="Plan time"
          />

          <View>
            <Button style={DEMO} textStyle={DEMO_TEXT} text="HC Submit" onPress={submit} />
            <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} />
          </View>

          <Image source={logoIgnite} style={IGNITE} />
          <View style={LOVE_WRAPPER}>
            <Text style={LOVE} text="Made with" />
            <Image source={heart} style={HEART} />
            <Text style={LOVE} text="by Infinite Red" />
          </View>
        </Screen>
      </View>
    );
  },
);
