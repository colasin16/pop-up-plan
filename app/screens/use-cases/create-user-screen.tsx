import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { CreateUser } from "../../../src/features/create-user/infrastructure/ui/user-creator";
import { GradientBackground, Header, Screen, Text } from "../../components";
import { useStores } from "../../models";
import { AppNavigatorParamList } from "../../navigators";
import { color, spacing } from "../../theme";
import { palette } from "../../theme/palette";


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

export const CreateUserScreen: FC<StackScreenProps<AppNavigatorParamList, "createUser">> = observer(
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
          <Text style={TITLE} preset="header" text="Ready? Go!" />

          {store.isAuthenticated() ? (
            <Text style={TAGLINE_Error} text="You are already authenticated, please logout first" />
          ) : (
            <>
              <Text style={TAGLINE} text="Fill your information in the following fields" />
              <CreateUser onFinish={goBack} />
            </>
          )}

        </Screen>
      </View>
    );
  },
);
