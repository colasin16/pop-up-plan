import React, { useEffect, FC } from "react";
import { FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import {
  Header,
  Screen,
  Text,
  AutoImage as Image,
  GradientBackground,
  BulletItem,
} from "../../components";
import { color, spacing } from "../../theme";
import { useStores } from "../../models";
import { NavigatorParamList } from "../../navigators";
import { AmazingPlan, BoringPlan } from "../../../src/core/domain/mocks/plan";
import { containerDI } from "../../../src/core/infrastructure/dependency-injection/container";
import { PlanFinder } from "../../../src/features/find-plan/application/plan-finder";
import { PlanSnapshot } from "../../models/plan/plan";

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
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
};
const LIST_CONTAINER: ViewStyle = {
  alignItems: "flex-start",
  flexDirection: "row",
  padding: 10,
};
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
};
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
};
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
};

export const UserProfileScreen: FC<
  StackScreenProps<NavigatorParamList, "userProfileScreen">
> = observer(({ navigation }) => {
  const goBack = () => navigation.goBack();
  const { searchPlansStore, user: userStore, characterStore, userPlansStore } = useStores();
  const { characters } = characterStore;

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
    async function fetchData() {
      await characterStore.getCharacters();
    }

    fetchData();
    // findRunPlansByOwner();
  }, []);

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
        <FlatList
          ListHeaderComponent={
            characters.length > 0 ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: characters[0].image }} style={IMAGE} />
                <Text style={LIST_TEXT}>
                  {`${userStore.name.firstName} ${userStore.name.lastName}`}
                </Text>
              </View>
            ) : (
              <></>
            )
          }
          contentContainerStyle={FLAT_LIST}
          data={searchPlansStore.plans}
          keyExtractor={item => String(`${item.id}-${item.title}`)}
          renderItem={({ item }) => (
            <View style={LIST_CONTAINER}>
              <BulletItem text={`${item.title} (${item.category}) - ${item.location}`} />
            </View>
          )}
        />
      </Screen>
    </View>
  );
});
