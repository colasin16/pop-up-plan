import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import {
  AmazingPlan,
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

// TODO: attending plans using API
const ATTENDING_PLANS = [AmazingPlan, FarAwayWalkPlan, FarAwayRunPlan];
const DEFAULT_PLAN_IMAGE =
  "https://i.picsum.photos/id/19/200/200.jpg?hmac=U8dBrPCcPP89QG1EanVOKG3qBsZwAvtCLUrfeXdE0FI";
const DEFAULT_USER_PROFILE_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07F-qRjmDQk_lG3ZU3PYshRLh6lDlRPhW8w&usqp=CAU";

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

    const [ownedPlansState, setOwnedPlanState] = useState([])
    const [attendingPlansState, setAttendingPlansState] = useState([])

    const [currentTab, setCurrentTab] = useState(TABS.OWNED_PLANS);

    const findPlansByOwner = async (): Promise<void> => {
      const planFinder = containerDI.resolve(PlanFinder);
      const { data } = await planFinder.findByOwner(userStore);

      userPlansStore.savePlans(data as PlanSnapshot[]);
      setOwnedPlanState(data)
    };

    const findPlansByAttendee = async (): Promise<void> => {
      const planFinder = containerDI.resolve(PlanFinder);
      const { data } = await planFinder.findByAttendee(userStore);
      setAttendingPlansState(data)
    };

    useEffect(() => {
      findPlansByOwner();
      findPlansByAttendee();
    }, []);

    const renderPlanItem = ({ item }) => (
      <View style={LIST_CONTAINER}>
        <Image source={{ uri: `${item.image ?? DEFAULT_PLAN_IMAGE}` }} style={PLAN_IMAGE} />
        <Text>{item.title}</Text>
      </View>
    );

    const getData = (key: TABS) => {
      const OwnedPlans = ownedPlansState;
      const attendingPlans = attendingPlansState;
      const data = {
        [TABS.OWNED_PLANS]: OwnedPlans,
        [TABS.ATTENDING_PLANS]: attendingPlans,
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
                  ? userStore.image || DEFAULT_USER_PROFILE_IMAGE
                  : DEFAULT_USER_PROFILE_IMAGE,
              }}
              style={IMAGE}
            />
            <Text style={LIST_TEXT}>{`${userStore ? userStore.name.firstName : "undefined"} ${userStore ? userStore.name.lastName : "undefined"
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
              renderItem={renderPlanItem}
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
