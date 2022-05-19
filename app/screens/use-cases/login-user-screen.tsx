import { useIsFocused } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { BackHandler, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native";
import { AuthenticateUser } from "../../../src/features/authenticate-user/infrastructure/ui/user-authenticator";
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

export const loginUserScreen: FC<StackScreenProps<AppNavigatorParamList, "loginUser">> = observer(
  ({ navigation }) => {
    // const goBack = () => navigation.goBack();
    const store = useStores();

    const isFocused = useIsFocused();

    useEffect(() => {
      if (!isFocused) {
        return
      }
      if (store.isAuthenticated()) {
        // TODO: Temprorary, fix this line later, when a user is in Explore tab and press back button
        // how can we handle app to exist withouth this line of code?
        BackHandler.exitApp();
      }

    }, [isFocused])

    const onFinish = () => {
      navigation.navigate("tab")
    }


    return (
      <View testID="loginScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          {
            store.isAuthenticated() ?
              // <Text style={TAGLINE_Error} text="You are already authenticated, please logout first" />
              <></> :
              <>
                <Header
                  headerTx={`loginScreen.Title` as const}
                  // leftIcon="back"
                  // onLeftPress={onFinish}
                  style={HEADER}
                  titleStyle={HEADER_TITLE}
                />
                <Text
                  style={TITLE}
                  preset="header"
                  tx={`loginScreen.Header` as const}
                />

                <Text style={TAGLINE} tx={`loginScreen.SubHeader` as const} />
                <AuthenticateUser onFinish={onFinish} />
                <Pressable>

                  <Text style={TAGLINE} tx={`loginScreen.RegisterHint` as const} onPress={() => {
                    store.setUser(undefined);
                    navigation.navigate("createUser");
                  }} />

                </Pressable>

              </>
          }

        </Screen>
      </View>
    );
  },
);
