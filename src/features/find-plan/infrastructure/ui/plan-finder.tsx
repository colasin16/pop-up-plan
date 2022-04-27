import { observer } from "mobx-react-lite";
import React, { PropsWithChildren, useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { useStores } from "../../../../../app/models";
import { PlanSnapshot } from "../../../../../app/models/plan/plan";
import { color, spacing, typography } from "../../../../../app/theme";
import { Category } from "../../../../core/domain/plan";
import { containerDI } from "../../../../core/infrastructure/dependency-injection/container";
import { PlanFinder } from "../../application/plan-finder";
import { Section } from "./section";

interface PlanListProps extends PropsWithChildren<any> {
  navigation?: any;
}

const BOLD: TextStyle = { fontWeight: "bold" };
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
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

// const defaultPlanListProps: PlanListProps = {
//   areButtonsShown: true,
// };

// export const PlanList: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
// ({ navigation }) => {
const PlanList: React.FC<PlanListProps> = observer((props: PlanListProps) => {
  const { searchPlansStore } = useStores();

  useEffect(() => {
    async function getData() {
      const planFinder = containerDI.resolve(PlanFinder);
      const { data: plans } = await planFinder.findAll();
      searchPlansStore.savePlans(plans as PlanSnapshot[]);
    }

    getData();
  }, []);

  const findWalkPlans = async (): Promise<void> => {
    const planFinder = containerDI.resolve(PlanFinder);
    const { data: plans } = await planFinder.findByCategory(Category.WALK);
    searchPlansStore.savePlans(plans as PlanSnapshot[]);
  };

  const findRunPlans = async (): Promise<void> => {
    const planFinder = containerDI.resolve(PlanFinder);
    const { data: plans } = await planFinder.findByCategory(Category.RUN);
    searchPlansStore.savePlans(plans as PlanSnapshot[]);
  };

  // const findRunPlansByOwner = async (): Promise<void> => {
  //   const planFinder = containerDI.resolve(PlanFinder);
  //   const { data: plans } = await planFinder.findByOwner(props.owner);
  //   searchPlansStore.savePlans(plans as PlanSnapshot[]);
  // };

  // const FilterButtons = ({ areButtonsShown }) => {
  //   console.debug(areButtonsShown);
  //   // if (props.owner) {
  //   //   findRunPlansByOwner();
  //   //   return <></>;
  //   // }

  //   if (areButtonsShown) {
  //     return (
  //       <>
  //         <FormRow preset={"clear"}>
  //           <Button
  //             textStyle={{ color: palette.black, fontSize: 18 }}
  //             text="Walk Plans"
  //             onPress={findWalkPlans}
  //           />
  //         </FormRow>
  //         <FormRow preset={"clear"}>
  //           <Button
  //             textStyle={{ color: palette.black, fontSize: 18 }}
  //             text="Run Plans"
  //             onPress={findRunPlans}
  //           />
  //         </FormRow>
  //       </>
  //     );
  //   }

  //   return <></>;
  // };

  return (
    <>
      {/* TODO: revise this component */}
      {/* <FilterButtons areButtonsShown={true} /> */}
      <ScrollView>
        {searchPlansStore.plans.map(plan => {
          return (
            <Pressable key={plan.id} onPress={() =>
              props.navigation.navigate({
                name: "joinPlanRequest",
                params: { planId: plan.id },
              })}>

              <Section title={plan.title} key={plan.id} style={styles.planCard}>
                The plan is a <Text style={styles.highlight}>{plan.category}</Text> at{" "}
                <Text style={styles.highlight}>{plan.location}</Text> around{" "}
                <Text style={styles.highlight}>{new Date(plan.time).toLocaleDateString()}</Text>.
                {/* <Button
                  testID="next-screen-button-5"
                  style={CONTINUE}
                  textStyle={CONTINUE_TEXT}
                  text="MORE"
                  // ref: https://reactnavigation.org/docs/params/
                  onPress={() =>
                    props.navigation.navigate({
                      name: "joinPlanRequest",
                      params: { planId: plan.id },
                    })
                  }
                /> */}
              </Section>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
});

// PlanList.defaultProps = defaultPlanListProps;

export default PlanList;

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
  },
  planCard: {
    backgroundColor: color.primaryDarker,
    borderRadius: 6,
    padding: 5
  }
});
