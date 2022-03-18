import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import {
  AmazingPlan,
  BoringPlan,
  FarAwayRunPlan,
  FarAwayWalkPlan,
} from "../../../src/core/domain/mocks/plan";
import { containerDI } from "../../../src/core/infrastructure/dependency-injection/container";
import { PlanFinder } from "../../../src/features/find-plan/application/plan-finder";
import { AutoImage as Image, GradientBackground, Header, Screen, Text } from "../../components";
import { useStores } from "../../models";
import { PlanSnapshot } from "../../models/plan/plan";
import { NavigatorParamList } from "../../navigators";
import { color, spacing } from "../../theme";

const DATA = [BoringPlan, AmazingPlan, FarAwayWalkPlan, FarAwayRunPlan];

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

export const UserProfileScreen: FC<
  StackScreenProps<NavigatorParamList, "userProfileScreen">
> = observer(({ navigation }) => {
  const goBack = () => navigation.goBack();
  const { searchPlansStore, user: userStore, userPlansStore } = useStores();

  // mocked_plans
  // TODO: replace with real ones
  // const plans = [BoringPlan, AmazingPlan];

  const findRunPlansByOwner = async (): Promise<void> => {
    const planFinder = containerDI.resolve(PlanFinder);
    const { plans } = await planFinder.findByOwner({
      id: "1644055774364",
      name: { firstName: "Tom", lastName: "Smith" },
    });

    console.debug(`plans: ${JSON.stringify(plans)}`);
    searchPlansStore.savePlans(plans as PlanSnapshot[]);
  };

  useEffect(() => {
    // TODO: Ask Jordi wheter I can remove this
    // async function fetchData() {
    //   await characterStore.getCharacters();
    // }
    // fetchData();
    // findRunPlansByOwner();
  }, []);

  // const renderItem = ({ item }) => <Item title={item.title} />;

  const renderItem = ({ item }) => (
    <View style={LIST_CONTAINER}>
      <Image source={{ uri: `${item.image}` }} style={PLAN_IMAGE} />
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View testID="DemoListScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="HC PROFILE"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={PROFILE_PICTURE_CONTAINER}>
          <Image source={{ uri: userStore ? userStore.image : "" }} style={IMAGE} />
          <Text style={LIST_TEXT}>{`${userStore ? userStore.name.firstName : "undefined"} ${
            userStore ? userStore.name.lastName : "undefined"
          }`}</Text>
        </View>
        <View style={{ backgroundColor: "white", height: 10 }} />
        <View style={{ flexDirection: "row", alignItems: "center", margin: 8 }}>
          <View style={{ flex: 1, height: 1 }} />
          <View>
            <Text style={{ width: 150, textAlign: "center" }}>Owned Plans</Text>
          </View>
          <View style={{ flex: 1, height: 1 }} />
          <View style={{ flex: 1, height: 1 }} />
          <View>
            <Text style={{ width: 150, textAlign: "center" }}>Attending Plans</Text>
          </View>
          <View style={{ flex: 1, height: 1 }} />
        </View>
        <View style={{ backgroundColor: "white", height: 2 }} />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={FLAT_LIST}
          numColumns={3}
        />
      </Screen>
    </View>
  );
});
