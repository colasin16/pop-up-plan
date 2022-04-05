import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import {
  AmazingPlan,
  BoringPlan,
  FarAwayRunPlan,
  FarAwayWalkPlan,
} from "../../../../src/core/domain/mocks/plan";
import { containerDI } from "../../../../src/core/infrastructure/dependency-injection/container";
import { PlanFinder } from "../../../../src/features/find-plan/application/plan-finder";
import {
  AutoImage as Image,
  Button,
  GradientBackground,
  Header,
  Screen,
  Text,
} from "../../../components";
import { useStores } from "../../../models";
import { PlanSnapshot } from "../../../models/plan/plan";
import { NavigatorParamList } from "../../../navigators";
import { color, spacing, typography } from "../../../theme";
import { CurrentTabContext } from "./current-tab-context";
import { TABS } from "./enums";
import { TaskTab } from "./tab-component";

// TODO: get owned and attending plans using API
const OWNED_PLANS = [BoringPlan];
const ATTENDING_PLANS = [AmazingPlan, FarAwayWalkPlan, FarAwayRunPlan];

const FULL: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
};
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
};
const PROFILE_PICTURE_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  margin: 20,
};
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
};
const LIST_CONTAINER: ViewStyle = {
  // alignItems: "flex-start",
  // flexDirection: "row",
  flex: 1,
  padding: 10,
};
const IMAGE: ImageStyle = {
  borderRadius: 100,
  height: 100,
  width: 100,
};

const PLAN_IMAGE: ImageStyle = {
  borderRadius: 5,
  height: 85,
  width: 85,
};

const LIST_TEXT: TextStyle = {
  marginLeft: 10,
};
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
  margin: 15,
};

export const UserProfileScreen: FC<StackScreenProps<NavigatorParamList, "userProfile">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack();
    const { /*searchPlansStore,*/ userStore, userPlansStore } = useStores();
    const store = useStores();

    const [currentTab, setCurrentTab] = useState(TABS.OWNED_PLANS);

    const findPlansByOwner = async (): Promise<void> => {
      const planFinder = containerDI.resolve(PlanFinder);
      const { plans } = await planFinder.findByOwner({
        id: "1644055774364",
        name: { firstName: "Tom", lastName: "Smith" },
        email: "test@gmail.com",
        phoneNumber: "+12321312",
        password: "fakePassword",
        image: "",
      });

      console.debug(`plans: ${JSON.stringify(plans)}`);
      userPlansStore.savePlans(plans as PlanSnapshot[]);
    };

    useEffect(() => {
      // findPlansByOwner();
    }, []);

    const renderItem = ({ item }) => (
      <View style={LIST_CONTAINER}>
        <Image source={{ uri: `${item.image}` }} style={PLAN_IMAGE} />
        <Text>{item.title}</Text>
      </View>
    );

    const getData = (key: TABS) => {
      const data = {
        [TABS.OWNED_PLANS]: OWNED_PLANS,
        [TABS.ATTENDING_PLANS]: ATTENDING_PLANS,
      };
      return data[key];
    };
    const TEXT: TextStyle = {
      color: color.palette.white,
      fontFamily: typography.primary,
    };
    const BOLD: TextStyle = { fontWeight: "bold" };
    const HEADER: TextStyle = {
      paddingTop: spacing[3],
      paddingBottom: spacing[4] + spacing[1],
      paddingHorizontal: 0,
    };
    const CONTINUE: ViewStyle = {
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[4],
      marginVertical: spacing[4],
      backgroundColor: color.palette.deepPurple,
    };
    const CONTINUE_TEXT: TextStyle = {
      ...TEXT,
      ...BOLD,
      fontSize: 13,
      letterSpacing: 2,
    };
    return (
      <View testID="DemoListScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Button
            textStyle={{ fontSize: 16, color: color.palette.black }}
            style={{
              margin: 8,
              backgroundColor: color.palette.lighterGrey,
              borderWidth: 3,
            }}
            onPress={() => {
              store.setUser(undefined);
            }}
            key={"key"}
            text={"Logout"}
          />
          <Header
            headerText="PROFILE"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={PROFILE_PICTURE_CONTAINER}>
            <Image
              source={{
                uri: userStore
                  ? userStore.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07F-qRjmDQk_lG3ZU3PYshRLh6lDlRPhW8w&usqp=CAU"
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07F-qRjmDQk_lG3ZU3PYshRLh6lDlRPhW8w&usqp=CAU",
              }}
              style={IMAGE}
            />
            <Text style={LIST_TEXT}>{`${userStore ? userStore.name.firstName : "undefined"} ${
              userStore ? userStore.name.lastName : "undefined"
            }`}</Text>
          </View>
          <CurrentTabContext.Provider value={{ currentTab, setCurrentTab }}>
            <View style={{ backgroundColor: color.line, height: 10 }} />
            <View style={{ flexDirection: "row", alignItems: "center", margin: 8 }}>
              <TaskTab tabName={TABS.OWNED_PLANS} />
              <TaskTab tabName={TABS.ATTENDING_PLANS} />
            </View>
            <View style={{ backgroundColor: color.line, height: 1 }} />
            <FlatList
              data={getData(currentTab)}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={FLAT_LIST}
              numColumns={3}
            />
          </CurrentTabContext.Provider>
        </Screen>
      </View>
    );
  },
);
