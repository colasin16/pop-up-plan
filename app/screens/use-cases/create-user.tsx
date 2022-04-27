import React, { FC } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { Header, Text, Screen, AutoImage as Image, GradientBackground } from "../../components";
import { NavigatorParamList } from "../../navigators";
import { color, spacing } from "../../theme";
import { CreateUser } from "../../../src/features/create-user/infrastructure/ui/user-creator";
import { palette } from "../../theme/palette";
import { useStores } from "../../models";

export const logoIgnite = require("../demo/logo-ignite.png");
export const heart = require("../demo/heart.png");

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

const TAGLINE_Error: TextStyle = {
  color: palette.orangeDarker,
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

export const CreateUserScreen: FC<StackScreenProps<NavigatorParamList, "createUser">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack();
    const store = useStores();

    return (
      <View testID="CreateUserScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerText="REGISTRATION"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text style={TITLE} preset="header" text="HC What do you feel like doing today?" />

          {store.isAuthenticated() ? (
            <Text style={TAGLINE_Error} text="You are already authenticated, please logout first" />
          ) : (
            <>
              <Text style={TAGLINE} text="HC Create a new plan" />
              <CreateUser onFinish={goBack} />
            </>
          )}

        </Screen>
      </View>
    );
  },
);
